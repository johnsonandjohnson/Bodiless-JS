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
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <mask style={{ maskType: 'alpha' }} id="mask0_5803_806" maskUnits="userSpaceOnUse" x="4" y="0" width="16" height="24">
      <path d="M19 15.8856L11.9954 22.8811L5 15.8765" stroke="#0C0C36" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.041 22.4536L12.041 1.04883" stroke="#0C0C36" strokeWidth="2" strokeLinecap="round" />
    </mask>
    <g mask="url(#mask0_5803_806)" style={{ maskType: 'alpha' }}>
      <rect x="24" width="24" height="24" transform="rotate(90 24 0)" fill="currentColor" />
    </g>
  </svg>
);

const DownIcon = stylable(Down);

export default DownIcon;
