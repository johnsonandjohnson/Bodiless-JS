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

import type { YouTubePlayerSettings } from '@bodiless/youtube';

/**
 * Gets site URL from env variables on current running project.
 */
const getOrigin = () => process.env.SITE_URL || '';

// @TODO: Remove origin attribute in case it is blocking YouTube analytics tracking.
const defaultPlayerSettings: YouTubePlayerSettings = {
  cc_load_policy: 1,
  controls: 1,
  loop: 0,
  enablejsapi: 1,
  modestbranding: 1,
  rel: 0,
  origin: getOrigin(),
};

export {
  defaultPlayerSettings,
};
