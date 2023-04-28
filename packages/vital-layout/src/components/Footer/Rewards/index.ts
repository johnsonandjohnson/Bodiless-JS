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

// @TODO: As Rewards is implemented, move it outside Footer component into
// a more appropriate place.
import vitalRewardsBaseOrig from './tokens/vitalRewards';
import type { VitalRewards } from './tokens/vitalRewards';

/**
 * Use this version of the vital rewards tokens when extending or shadowing.
 * @category Token Collection
 * @see [[vitalRewards]]
 */
const vitalRewardsBase = vitalRewardsBaseOrig;

export { RewardsClean, asRewardsToken } from './RewardsClean';
export { default as vitalRewards } from './tokens';
export type { RewardsComponents, RewardsProps } from './types';

export { vitalRewardsBase };
export type { VitalRewards };
