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

const Search = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.51 17.52A8.53 8.53 0 1 0 5.44 5.45a8.53 8.53 0 0 0 12.07 12.07ZM18.05 18.2l5.5 5.25" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h26v26H0z" />
      </clipPath>
    </defs>
  </svg>
);

const SearchIcon = stylable(Search);

export default SearchIcon;
