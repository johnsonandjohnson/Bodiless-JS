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

import {
  as,
  Div,
  startWith,
  withProps,
} from '@bodiless/fclasses';
import { asRewardsToken } from '../RewardsClean';
import type { RewardsToken } from '../RewardsClean';

/*
 * @TODO
 * all the styling/tokens for vitalRewards is a placeholder for looks only
 * and could be cleaned up and follow correct patterns when this component
 * is actually built.
 */

const RewardsFormElement = as(
  'bg-vital-primary-page-bg text-vital-primary-header-copy',
  '2xl:border 2xl:border-vital-secondary-footer-text 2xl:bg-vital-secondary-footer-bg 2xl:text-vital-primary-footer-copy',
);
const RewardColorCopy = 'text-vital-primary-header-copy 2xl:text-vital-primary-footer-copy';

const Default = asRewardsToken({
  Components: {
    Wrapper: startWith(Div),
  },
  Layout: {
    Wrapper: 'w-full max-w-3xl mx-auto',
    FormWrapper: 'md:flex md:justify-between 2xl:block',
    FormTextFirstName: 'w-full 2xl:w-44 2xl:block',
    FormTextEmail: 'w-full 2xl:w-44 2xl:block',
    FormButton: 'w-full xl:block 2xl:w-full ',
  },
  Spacing: {
    Brand: 'mb-8 md:mb-4 lg:mb-2',
    Title: 'mb-2',
    FormWrapper: 'py-6 md:py-4',
    FormTextFirstName: 'mb-6 p-3 md:mb-0 md:p-3 xl:py-2 2xl:mb-5 2xl:mt-1',
    FormTextEmail: 'mb-6 p-3 md:mx-6 md:mb-0 md:p-3 xl:py-2 2xl:mx-0 2xl:mb-5 2xl:mt-1',
    FormButton: 'p-3 md:p-2',
  },
  // @TODO: Rewards colors needs to be organized/setup and updated.
  Theme: {
    Brand: as(
      'text-xl lg:text-m-2xl font-medium',
      RewardColorCopy,
    ),
    Title: as(
      'text-m-xl md:text-base lg:text-sm font-bold',
      RewardColorCopy,
    ),
    Body: as(
      'text-sm md:text-base lg:text-xs',
      RewardColorCopy,
    ),
    FormTextFirstName: RewardsFormElement,
    FormTextEmail: RewardsFormElement,
    FormButton: as(
      'bg-vital-primary-header-copy 2xl:bg-vital-primary-card-bg ',
      'text-vital-primary-footer-copy 2xl:text-vital-secondary-footer-bg',
      'text-sm font-bold rounded lg:rounded-none',
    ),
    Footnote: 'text-xs 2xl:text-vital-primary-footer-copy',
  },
  // @TODO: Placeholders must be replaced with editable fields.
  Content: {
    Brand: withProps({
      children: 'Brand',
    }),
    Title: withProps({
      children: 'Email Signup & Rewards',
    }),
    Body: withProps({
      children: 'Want to receive tips, personalized content and exclusive offers? Sign up for the Rewards program today! TERMS & CONDITIONS',
    }),
    FormTextFirstName: withProps({
      placeholder: 'First name',
    }),
    FormTextEmail: withProps({
      placeholder: 'Email',
    }),
    FormButton: withProps({
      children: 'SUBMIT',
    }),
    Footnote: withProps({
      children: 'The information you submit will be governed by our site’s PRIVACY POLICY',
    }),
  },
});

/**
 * Tokens for the vital Rewards PLACEHOLDER
 *
 * @category Token Collection
 * @see [[RewardsClean]]
 */
export interface VitalRewards {
  /**
   * Defines the default Rewards placeholder
   */
  Default: RewardsToken,
}

/**
 * Tokens for Vital Copyright Row
 *
 * @category Token Collection
 * @see [[VitalRewards]]
 * @see [[RewardsClean]]
 */
const vitalRewards: VitalRewards = {
  Default,
};

export default vitalRewards;
