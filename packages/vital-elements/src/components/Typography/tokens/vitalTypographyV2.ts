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

export default asTokenGroup(TypographyMeta)({
  H1V2: 'text-4xl leading-5 font-normal font-2',
  H2V2: 'text-3xl leading-5 font-normal font-2',
  H3V2: 'text-2xl leading-5 font-normal font-2',
  H4V2: 'text-xl leading-5 font-normal font-2',
  H5V2: 'text-lg leading-5 font-normal font-2',
  // BodyRegular: 'text-base leading-6 font-normal font-2',
  // BodyBold: 'text-base leading-6 font-bold font-2',
  BodyInlineLink: 'text-base leading-6 font-bold font-2 underline',
  // BodyLargeRegular: 'text-lg leading-6 font-normal font-2',
  // BodyLargeBold: 'text-lg leading-6 font-bold font-2',
  BodyLargeInlineLink: 'text-lg leading-6 font-bold font-2 underline',
  EyebrowV2: 'text-sm leading-6 font-bold font-2 uppercase',
  LinkV2: 'text-base leading-6 font-bold font-2 uppercase',
  CrumbsReviewsRegular: 'text-sm leading-6 font-normal font-2',

  /**
 * Vital 2.0 Typography coming from Figma Tokens. Tokens above will be deprecated.
 * @todo: Move the token group to vitalTypography.ts as soon as all the V1 tokens are deprecated.
 */

  HeadlineXXLarge: 'text-34.84px lg:text-39.81px leading-5 font-normal font-2',
  HeadlineXLarge: 'text-29.03px lg:text-33.18px leading-5 font-normal font-2',
  HeadlineLarge: 'text-24.19px lg:text-27.65px leading-5 font-normal font-2',
  HeadlineMedium: 'text-20.16px lg:text-23.04px leading-5 font-normal font-2',
  HeadlineSmall: 'text-15.2px lg:text-19.2px leading-5 font-normal font-2',
  BodyLargeRegular: 'text-15.2px lg:text-19.2px leading-6 font-normal font-2',
  BodyLargeUnderlined: 'text-15.2px lg:text-19.2px leading-6 font-normal underline font-2',
  BodyLargeBold: 'text-15.2px lg:text-19.2px leading-6 font-bold font-2',
  BodyLargeBoldUnderlined: 'text-15.2px lg:text-19.2px leading-6 font-bold underline font-2',
  BodyRegular: 'text-14px lg:text-16px leading-6 font-normal font-2',
  BodyUnderlined: 'text-14px lg:text-16px leading-6 font-normal underline font-2',
  BodyBold: 'text-14px lg:text-16px leading-6 font-bold font-2',
  BodyBoldUnderlined: 'text-14px lg:text-16px leading-6 font-bold underline font-2',
  EyebrowRegular: 'text-11.67px lg:text-13.33px leading-6 font-normal font-2 underline uppercase',
  EyebrowBold: 'text-11.67px lg:text-13.33px leading-6 font-bold font-2 underline uppercase',
  BodySmallRegular: 'text-11.67px lg:text-13.33px leading-6 font-normal font-2',
  BodySmallUnderlined: 'text-11.67px lg:text-13.33px leading-6 font-normal underline font-2',
  BodySmallBold: 'text-11.67px lg:text-13.33px leading-6 font-bold font-2',
  BodySmallBoldUnderlined: 'text-11.67px lg:text-13.33px leading-6 font-bold underline font-2',
});
