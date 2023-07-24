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

const Up = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <mask style={{ maskType: 'alpha' }} id="mask0_5803_792" maskUnits="userSpaceOnUse" x="4" y="0" width="16" height="24">
      <path d="M5 8.04436L12.0046 1.04886L19 8.05347" stroke="#0C0C36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11.959 1.47632L11.959 22.8811" stroke="#0C0C36" strokeWidth="2" strokeLinecap="round" />
    </mask>
    <g mask="url(#mask0_5803_792)" style={{ maskType: 'alpha' }}>
      <rect y="23.9299" width="24" height="24" transform="rotate(-90 0 23.9299)" fill="currentColor" />
    </g>
  </svg>
);

const UpIcon = stylable(Up);

export default UpIcon;
