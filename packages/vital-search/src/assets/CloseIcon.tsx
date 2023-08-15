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

const Close = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    fill="none"
    {...props}
  >
    <path d="m6 6 14 14M20 6 6 20" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>

);

const CloseIcon = stylable(Close);

export default CloseIcon;
