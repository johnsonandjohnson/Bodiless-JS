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

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="7.508"
    height="16.181"
    viewBox="0 0 7.508 16.181"
    {...props}
  >
    <path
      id="FACEBOOK_ICON"
      data-name="FACEBOOK ICON"
      d="M967.342,353.507h-2.256v8.081H961.72v-8.081h-1.59v-2.848h1.59V348.81a4,4,0,0,1,.259-1.461A2.837,2.837,0,0,1,963,346a3.551,3.551,0,0,1,2.108-.592l2.5.018V348.2h-1.812a.717.717,0,0,0-.462.148.778.778,0,0,0-.24.629v1.683h2.552Z"
      transform="translate(-960.13 -345.407)"
      fill="#fff"
    />
  </svg>
);

const FacebookIcon = stylable(Facebook);

export {
  FacebookIcon,
};
