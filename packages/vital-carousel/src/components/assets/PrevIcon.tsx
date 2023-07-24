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

const Prev = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <mask id="mask0_3721_63618" maskUnits="userSpaceOnUse" x="0" y="4" width="24" height="16">
      <path d="M8.04428 19L1.04878 11.9954L8.05339 5" stroke="#0C0C36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1.47635 12.0409L22.8811 12.0409" stroke="#0C0C36" strokeWidth="2" strokeLinecap="round" />
    </mask>
    <g mask="url(#mask0_3721_63618)">
      <rect x="23.9299" y="24" width="24" height="24" transform="rotate(-180 23.9299 24)" fill="#282828" />
    </g>
  </svg>
);

const PrevIcon = stylable(Prev);

export default PrevIcon;
