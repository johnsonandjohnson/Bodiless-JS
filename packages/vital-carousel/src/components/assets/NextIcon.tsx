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

const Next = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <mask id="mask0_3721_63619" maskUnits="userSpaceOnUse" x="0" y="4" width="24" height="16">
      <path d="M15.8856 5L22.8811 12.0046L15.8765 19" stroke="#0C0C36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22.4535 11.9591H1.04875" stroke="#0C0C36" strokeWidth="2" strokeLinecap="round" />
    </mask>
    <g mask="url(#mask0_3721_63619)">
      <rect width="24" height="24" fill="#282828" />
    </g>
  </svg>
);

const NextIcon = stylable(Next);

export default NextIcon;
