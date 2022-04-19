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
    width="14.85"
    height="14.849"
    viewBox="0 0 14.85 14.849"
    {...props}
  >
    <g id="X" transform="translate(-703.586 -415.716)">
      <line id="Line_272" data-name="Line 272" x2="17" transform="translate(705.001 417.13) rotate(45)" fill="none" stroke="#212121" strokeLinecap="round" strokeWidth="2" />
      <line id="Line_273" data-name="Line 273" x2="17" transform="translate(717.021 417.13) rotate(135)" fill="none" stroke="#212121" strokeLinecap="round" strokeWidth="2" />
    </g>
  </svg>
);

const CloseIcon = stylable(Close);

export default CloseIcon;
