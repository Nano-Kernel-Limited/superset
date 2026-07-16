from superset.security import SupersetSecurityManager
from flask import request
from flask_login import login_user, current_user
import logging

logger = logging.getLogger(__name__)

class CustomHeaderSecurityManager(SupersetSecurityManager):
    def __init__(self, appbuilder):
        super(CustomHeaderSecurityManager, self).__init__(appbuilder)


    def header_auth_hook(self):
        # Already logged in
        if current_user.is_authenticated:
            return

        # Read headers injected by Caddy
        username = request.headers.get('X-Forwarded-User')
        if not username:
            return # Let Superset handle it natively (e.g., Guest Token embedding)
            
        roles_str = request.headers.get('X-Forwarded-Roles', '')
        roles = [r.strip() for r in roles_str.split(',')] if roles_str else []

        user = self.find_user(username=username)
        if not user:
            # Create user JIT
            user = self.add_user(
                username=username,
                first_name=username,
                last_name='',
                email=f"{username}@example.com",
                role=self.find_role('Public')
            )
            
        if user:
            self.sync_user_roles(user, roles)
            login_user(user)

    def sync_user_roles(self, user, external_roles):
        # Map your Django app roles to Superset roles
        role_mapping = {
            "Dashboard_Editor": ["Alpha", "sql_lab"],
            "System_Admin": ["Admin"],
            "Viewer": ["Gamma"]
        }
        
        superset_roles = []
        for role in external_roles:
            if role in role_mapping:
                for mapped_role in role_mapping[role]:
                    fab_role = self.find_role(mapped_role)
                    if fab_role:
                        superset_roles.append(fab_role)
        
        # If any mapped roles were found, apply them. Otherwise leave current roles intact.
        if superset_roles:
            user.roles = list(set(superset_roles))
            self.session.commit()
