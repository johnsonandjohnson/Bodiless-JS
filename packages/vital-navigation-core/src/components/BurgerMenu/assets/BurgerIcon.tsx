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

const Burger = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18.86"
    height="14"
    {...props}
  >
    <g fill="none" stroke="#212121" strokeLinecap="round" strokeWidth="2">
      <path data-name="Line 254" d="M1 1h16.86" />
      <path data-name="Line 255" d="M1 6.84h16.86" />
      <path data-name="Line 256" d="M1 13h16.86" />
    </g>
  </svg>
);

const BurgerIcon = stylable(Burger);

export default BurgerIcon;
