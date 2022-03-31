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
    width="26.83"
    height="26.83"
    {...props}
  >
    <g data-name="Group 208" transform="translate(1.41 1.41)">
      <circle data-name="Ellipse 21" cx="8.48" cy="8.48" r="8.48" transform="rotate(-45 14.49 6)" fill="none" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </g>
    <path data-name="Line 271" fill="none" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19.94 20.08 5.47 5.22" />
  </svg>
);

const SearchIcon = stylable(Search);

export default SearchIcon;
