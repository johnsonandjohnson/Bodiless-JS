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

const YouTube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22.137"
    height="15.912"
    viewBox="0 0 22.137 15.912"
    {...props}
  >
    <path
      id="YOUTUBE_ICON"
      data-name="YOUTUBE ICON"
      d="M11.068,15.912c-.069,0-6.942-.006-8.649-.475a2.811,2.811,0,0,1-1.957-2.01A30.544,30.544,0,0,1,0,7.956,30.543,30.543,0,0,1,.462,2.485,2.81,2.81,0,0,1,2.42.476C4.126.005,11,0,11.068,0s6.942.005,8.649.476a2.81,2.81,0,0,1,1.957,2.009,30.544,30.544,0,0,1,.462,5.471,30.544,30.544,0,0,1-.462,5.471,2.811,2.811,0,0,1-1.957,2.01C18.011,15.906,11.138,15.912,11.068,15.912ZM8.993,4.843h0v6.918L14.528,8.3,8.993,4.843Z"
      fill="#fff"
    />
  </svg>
);

const YouTubeIcon = stylable(YouTube);

export {
  YouTubeIcon,
};
