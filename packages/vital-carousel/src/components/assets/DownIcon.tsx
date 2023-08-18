/**
 * Copyright © 2022 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { stylable } from '@bodiless/fclasses';

const Down = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
    {...props}
  >
    <mask id="mask0_10315_18015" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="14" height="8">
      <path d="M13 1L7 7L1 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </mask>
    <g mask="url(#mask0_10315_18015)" style={{ maskType: 'alpha' }}>
      <rect x="25" y="-14" width="36" height="36" transform="rotate(90 25 -14)" fill="currentColor" />
    </g>
  </svg>
);

const DownIcon = stylable(Down);

export default DownIcon;
