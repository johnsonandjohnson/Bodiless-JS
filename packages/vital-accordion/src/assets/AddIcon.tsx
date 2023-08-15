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

const Add = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="1" y="7" width="14" height="2" rx="1" fill="#009" />
    <rect x="9" y="1" width="14" height="2" rx="1" transform="rotate(90 9 1)" fill="#009" />
  </svg>
);

const AddIcon = stylable(Add);

export default AddIcon;
