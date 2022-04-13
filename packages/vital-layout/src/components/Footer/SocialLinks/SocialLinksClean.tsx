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

import React, { FC } from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { designable, Div } from '@bodiless/fclasses';
import { FacebookIcon } from './assets/FacebookIcon';
import { InstagramIcon } from './assets/InstagramIcon';
import { YouTubeIcon } from './assets/YouTubeIcon';
import { SocialLinksComponents, SocialLinksProps } from './types';

const socialLinksComponents: SocialLinksComponents = {
  Wrapper: Div,
  InnerWrapper: Div,
  IconFacebook: FacebookIcon,
  IconInstagram: InstagramIcon,
  IconYouTube: YouTubeIcon,
};

// @TODO: When implementing social links, convert them to a list of linkable icons.
const SocialLinksCleanBase: FC<SocialLinksProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.InnerWrapper>
      <C.IconFacebook />
      <C.IconYouTube />
      <C.IconInstagram />
    </C.InnerWrapper>
  </C.Wrapper>
);

const SocialLinksClean = designable(socialLinksComponents, 'SocialLinks')(SocialLinksCleanBase);

const asSocialLinksToken = asVitalTokenSpec<SocialLinksComponents>();

export {
  SocialLinksClean,
  asSocialLinksToken,
};
