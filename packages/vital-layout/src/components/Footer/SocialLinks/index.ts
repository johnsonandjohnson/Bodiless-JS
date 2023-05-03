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

// @TODO: As Social Links are implemented, move them outside Footer component into
// a more appropriate place.
// Also requires component structure reorganization for new static pattern.
import type { VitalSocialLinks } from './tokens/vitalSocialLinks';

export { SocialLinksClean, asSocialLinksToken } from './SocialLinksClean';
export { default as vitalSocialLinks } from './tokens';
export type { SocialLinksComponents, SocialLinksProps } from './types';

export type { VitalSocialLinks };
