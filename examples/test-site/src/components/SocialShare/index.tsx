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

import React from 'react';
import { flowRight } from 'lodash';
import Helmet from 'react-helmet';
import {
  withMeta,
  asBodilessHelmet,
  withMetaForm,
  // withMetaStatic,
} from '@bodiless/components';
import {
  useMenuOptionUI,
  useEditContext,
} from '@bodiless/core';

const socialShareFormHeader = {
  title: 'Social Share',
  description: '',
};

const useMenuOptions = () => {
  const context = useEditContext();

  return ([
    {
      name: 'socialshare',
      isHidden: () => !context.isEdit,
      icon: 'share',
      label: 'Social Share',
    },
  ]);
};

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

// const withSocialShareUrl = withMetaStatic({
//   name: 'og:url',
//   attribute: 'property',
// });

export const SocialShareHelmet = flowRight(
  withMetaForm(useMenuOptions, socialShareFormHeader),
  asBodilessHelmet('socialshare'),
  withSocialShareTitle('og:title', ''),
  withSocialShareImage('og:image', ''),
  withSocialShareDescription('og:description', ''),
  // withSocialShareUrl('og:url', ''),
)(Helmet);

const SocialShare = () => <p>Social Share</p>;
export default SocialShare;
