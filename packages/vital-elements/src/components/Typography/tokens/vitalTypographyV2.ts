/**
 * Copyright © 2023 Johnson & Johnson
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
import { asTokenGroup } from '../../../util';
import { TypographyMeta } from '../meta';

/**
 * @todo: Move the token group to vitalTypography.ts as soon as all the V1 tokens are deprecated.
 */

export default asTokenGroup(TypographyMeta)({
  HeadlineXXLarge: 'text-34.8px lg:text-39.8px leading-5 font-normal font-2',
  HeadlineXLarge: 'text-29px lg:text-33.2px leading-5 font-normal font-2',
  HeadlineLarge: 'text-24.2px lg:text-27.6px leading-5 font-normal font-2',
  HeadlineMedium: 'text-20.2px lg:text-23px leading-5 font-normal font-2',
  HeadlineSmall: 'text-15.2px lg:text-19.2px leading-5 font-normal font-2',
  BodyLargeRegular: 'text-15.2px lg:text-19.2px leading-6 font-normal font-2',
  BodyLargeUnderlined: 'text-15.2px lg:text-19.2px leading-6 font-normal underline font-2',
  BodyLargeBold: 'text-15.2px lg:text-19.2px leading-6 font-bold font-2',
  BodyLargeBoldUnderlined: 'text-15.2px lg:text-19.2px leading-6 font-bold underline font-2',
  BodyRegular: 'text-14px lg:text-16px leading-6 font-normal font-2',
  BodyUnderlined: 'text-14px lg:text-16px leading-6 font-normal underline font-2',
  BodyBold: 'text-14px lg:text-16px leading-6 font-bold font-2',
  BodyBoldUnderlined: 'text-14px lg:text-16px leading-6 font-bold underline font-2',
  EyebrowRegular: 'text-11.7px lg:text-13.3px leading-6 font-normal font-2 uppercase',
  EyebrowBold: 'text-11.7px lg:text-13.3px leading-6 font-bold font-2 uppercase',
  BodySmallRegular: 'text-11.7px lg:text-13.3px leading-6 font-normal font-2',
  BodySmallUnderlined: 'text-11.7px lg:text-13.3px leading-6 font-normal font-2',
  BodySmallBold: 'text-11.7px lg:text-13.3px leading-6 font-bold font-2',
  BodySmallBoldUnderlined: 'text-11.7px lg:text-13.3px leading-6 font-bold font-2',

  // BodyInlineLink: 'text-base leading-6 font-bold font-2 underline',
  // BodyLargeInlineLink: 'text-lg leading-6 font-bold font-2 underline',
  // EyebrowV2: 'text-sm leading-6 font-bold font-2 uppercase',
  // LinkV2: 'text-base leading-6 font-bold font-2 uppercase',
  // CrumbsReviewsRegular: 'text-sm leading-6 font-normal font-2',
});
