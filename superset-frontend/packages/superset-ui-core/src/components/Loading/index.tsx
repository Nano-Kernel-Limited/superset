/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// import { styled } from '@superset-ui/core';
// import cls from 'classnames';
// import { Loading as Loader } from '../assets';
import type { LoadingProps } from './types';

// const LoaderImg = styled.img`
//   z-index: 99;
//   width: 50px;
//   height: unset;
//   position: relative;
//   margin: 10px;
//   &.inline {
//     margin: 0px;
//     width: 30px;
//   }
//   &.inline-centered {
//     margin: 0 auto;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//   }
//   &.floating {
//     padding: 0;
//     margin: 0;
//     position: absolute;
//     left: 50%;
//     top: 50%;
//     transform: translate(-50%, -50%);
//   }
// `;

import { styled } from '@superset-ui/core';

const LoaderSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #0035804f;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  @keyframes spin {
    to {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

export function Loading({
  position = 'floating',
  image,
  className,
}: LoadingProps) {
  return <LoaderSpinner />;
}

export type { LoadingProps };
