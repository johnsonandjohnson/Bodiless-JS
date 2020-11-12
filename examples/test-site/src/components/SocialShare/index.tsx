/**
 * Copyright © 2020 Johnson & Johnson
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
import React, { FunctionComponent as FC } from 'react';
import Helmet from 'react-helmet';
import { flow, flowRight } from 'lodash';
import {
  SocialShare as SocialShareClean,
  withMeta,
  asBodilessHelmet,
  withMetaForm,
} from '@bodiless/components';
import type { SocialShareProvider } from '@bodiless/components';
import {
  useMenuOptionUI,
} from '@bodiless/core';
import {
  addClasses,
  Div,
  Img,
  Label,
  Span,
} from '@bodiless/fclasses';
import asSimpleSocialShare from './token';
import imgFacebook from './images/facebook.png';
import imgTwitter from './images/twitter.png';
// import imgEmail from './images/email.png';

const StyledIcon = flow(
  addClasses('material-icons cursor-pointer align-middle text-gray-600'),
)(Span);

const Icon = (icon: string, label?: string): JSX.Element => (
  <Label>
    <StyledIcon>{icon}</StyledIcon>
    {label}
  </Label>
);

type ProviderProps = {
  name: string;
  icon: JSX.Element;
  onclick: Function;
};

/**
 * Window open this.props.
 *
 * Ref:
 *   https://developer.mozilla.org/en-US/docs/Web/API/Window/open
 */
type WindowOpenerProps = {
  name: string;
  url: string;
  toolbar?: boolean;
  scrollbars?: boolean;
  resizable?: boolean;
  top?: number;
  left?: number;
  width?: number;
  height?: number;
};

const Logo = flow(
  addClasses('bg-blue-500 w-full'),
)(Img);
const LogoWrapper = flow(
  addClasses('w-8'),
)(Div);

/**
 * @todo: move to package component
 */
const Provider: FC<any> = (props: ProviderProps) => {
  const { name, icon, onclick } = props;
  return (
    <LogoWrapper data-label={name} data-icon={icon} onClick={onclick}>
      <Logo src={icon} alt={name} />
    </LogoWrapper>
  );
};

/**
 * Popup window opener
 */
const popupOpen = (props: WindowOpenerProps) => {
  const {
    url, name, toolbar, resizable, top, left, width, height,
  } = props;
  const features = `toolbar=${toolbar ? 'yes' : 'no'},\
    resizable=${resizable ? 'yes' : 'no'},\
    top=${top || '500'},\
    left=${left || '500'},\
    width=${width || '400'},\
    height=${height || '400'}`;
  window.open(url, name, features);
};

const currentUrl = 'https://www.listerine.com/gum-disease-healthy-gums/what-is-gingivitis?icid=subnav';
// const currentUrl = encodeURIComponent(window.location.href);

/**
 * FaceBook social share
 */
const facebookSrc = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}&amp;src=sdkpreparse`;
const facebookShare = () => popupOpen({
  url: facebookSrc,
  name: 'share',
});

const facebook: SocialShareProvider = {
  id: 'facebook',
  script: {
    id: 'facebook',
    src: 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v8.0',
    async: true,
    defer: true,
  },
  element: <Provider
    name="FaceBook"
    icon={imgFacebook}
    onclick={facebookShare}
  />,
};

const twitterSrc = `https://twitter.com/intent/tweet?url=${currentUrl}`;
const twitterShare = () => popupOpen({
  url: twitterSrc,
  name: 'share',
});

const twitter: SocialShareProvider = {
  id: 'twitter',
  // script: {
  //   id: 'twitter',
  //   src: '',
  // },
  element: <Provider
    name="Twitter"
    icon={imgTwitter}
    onclick={twitterShare}
  />,
};
// const email: SocialShareProvider = {
//   id: 'email',
//   script: {
//     id: 'email',
//     src: '',
//   },
//   element: <Provider name="Email" icon={imgEmail} />,
// };

const providers: SocialShareProvider[] = [
  facebook,
  twitter,
  // email,
];

export const SimpleSocialShare = flow(asSimpleSocialShare)(SocialShareClean);
export default () => (
  <SimpleSocialShare providers={providers} buttonContent={Icon('share', 'Share')} />
);

/**
 * Social Share helmet
 */
const socialShareFormHeader = {
  title: 'Social Share Management',
  description: 'Enter the page level Open Graph data used for Social Share.',
};

const useMenuOptions = () => [
  {
    name: 'share',
    icon: 'share',
    label: 'Share',
  },
];

const withSocialShareTitle = withMeta({
  name: 'og:title',
  label: 'Title',
  attribute: 'property',
});

const withSocialShareImage = withMeta({
  name: 'og:image',
  label: 'Image',
  attribute: 'property',
});

const withSocialShareDescription = withMeta({
  name: 'og:description',
  useFormElement: () => useMenuOptionUI().ComponentFormTextArea,
  label: 'Description',
  attribute: 'property',
});
const withSocialShareUrl = withMeta({
  name: 'og:url',
  label: 'Url',
  attribute: 'property',
});

const SocialShareHelmet = flowRight(
  withMetaForm(useMenuOptions, socialShareFormHeader),
  asBodilessHelmet('meta'),
  withSocialShareTitle('og-title', ''),
  withSocialShareImage('og-image', ''),
  withSocialShareUrl('og-url', ''),
  withSocialShareDescription('og-description', ''),
)(Helmet);

export { SocialShareHelmet };
