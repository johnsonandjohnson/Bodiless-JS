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

const Base = asRewardsToken({
  Components: {
    Wrapper: startWith(Div),
  },
  Layout: {
    Wrapper: 'w-full',
    FormWrapper: 'md:flex md:justify-between lg:block',
    FormTextFirstName: 'w-full lg:w-44 lg:block',
    FormTextEmail: 'w-full lg:w-44 lg:block',
    FormButton: 'w-full lg:w-48 lg:block',
  },
  Spacing: {
    Brand: 'mb-8 md:mb-4 lg:mb-2',
    Title: 'mb-2',
    FormWrapper: 'py-6 md:py-4',
    FormTextFirstName: 'mb-6 p-3 md:mb-0 md:p-3 md:py-2 lg:mb-5 lg:py-1',
    FormTextEmail: 'mb-6 p-3 md:mx-6 md:mb-0 md:p-3 md:py-2 lg:mx-0 lg:mb-5 lg:py-1',
    FormButton: 'p-3 md:p-2',
  },
  // @TODO: Rewards colors needs to be organized/setup and updated.
  Theme: {
    Brand: as(
      'text-vital-primary-header-copy text-xl font-medium',
      'md:text-vital-primary-footer-copy md:text-m-2xl',
    ),
    Title: as(
      'text-vital-primary-header-copy text-m-xl font-bold',
      'md:text-vital-primary-footer-copy md:text-base',
      'lg:text-sm',
    ),
    Body: as(
      'text-vital-primary-header-copy text-sm',
      'md:text-vital-primary-footer-copy md:text-base',
      'lg:text-xs',
    ),
    FormTextFirstName: as(
      'bg-vital-primary-page-bg text-vital-primary-header-copy text-sm font-bold rounded',
      'md:border md:border-vital-secondary-footer-text md:bg-vital-secondary-footer-bg md:text-vital-primary-footer-copy md:rounded-none',
      'lg:text-sm',
    ),
    FormTextEmail: as(
      'bg-vital-primary-page-bg text-vital-primary-header-copy text-sm font-bold rounded',
      'md:border md:border-vital-secondary-footer-text md:bg-vital-secondary-footer-bg md:text-vital-primary-footer-copy md:rounded-none',
      'lg:text-sm',
    ),
    FormButton: as(
      'bg-vital-primary-header-copy text-vital-primary-footer-copy text-sm font-bold rounded',
      'md:bg-vital-primary-card-bg md:text-vital-secondary-footer-bg md:rounded-none',
    ),
    Footnote: 'text-xs md:text-vital-primary-footer-copy',
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
      children: 'Want to receive tips, personalized content and exclusive offers from Johnson & Johnson? Sign up for the Care Club Rewards program today! TERMS & CONDITIONS',
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

const Default = asRewardsToken({
  ...Base,
});

export default {
  Base,
  Default,
};
