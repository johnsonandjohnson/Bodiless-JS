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
} from '@bodiless/components';
import type { MetaFormProps } from '@bodiless/components';
import {
  useMenuOptionUI,
  useEditContext,
} from '@bodiless/core';

const socialShareFormHeader = {
  title: 'Social Share',
  description: '',
};

const useGetMenuOptions = () => {
  const context = useEditContext();

  return () => ([
    {
      name: 'socialshare',
      isHidden: () => !context.isEdit,
      icon: 'share',
      label: 'Social Share',
    },
  ]);
};

const withMetaPageDescription = withMeta({
  name: 'description',
  useFormElement: () => useMenuOptionUI().ComponentFormTextArea,
  label: 'Description',
  placeholder: 'Rec < 160 char',
});

const socialShareFormProps: MetaFormProps = {
  name: 'SocialShare',
  id: 'socialshare',
};

export const SocialShareHelmet = flowRight(
  withMetaForm(useGetMenuOptions, socialShareFormHeader, socialShareFormProps),
  asBodilessHelmet('socialshare'),
  withMetaPageDescription('description', ''),
)(Helmet);

const SocialShare = () => <p>Social Share</p>;
export default SocialShare;
