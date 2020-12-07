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

import { flowRight } from 'lodash';
import Helmet from 'react-helmet';
import {
  withMeta,
  withTitle,
  withMetaStatic,
  withMetaHtml,
  asBodilessHelmet,
  withMetaForm,
} from '@bodiless/components';
import {
  useMenuOptionUI,
} from '@bodiless/core';

const withMetaPageTitle = withTitle({
  name: 'title',
  label: 'Title',
  placeholder: 'Rec 30-65 char',
});

const withMetaPageDescription = withMeta({
  name: 'description',
  useFormElement: () => useMenuOptionUI().ComponentFormTextArea,
  label: 'Description',
  placeholder: 'Rec < 160 char',
});

const withMetaPageType = withMeta({
  name: 'pagetype',
  label: 'Page Type',
});

const withMetaBrand = withMetaStatic({
  name: 'bl-brand',
});

const withMetaCountry = withMetaStatic({
  name: 'bl-country',
});

const useMenuOptions = () => [
  {
    name: 'seo',
    icon: 'category',
    label: 'SEO',
  },
];

const seoFormHeader = {
  title: 'SEO Data Management',
  description: `Enter the page level data used for SEO. 
  This is metadata needed for SEO that will go in the page header.`,
};

const SeoHelmet = flowRight(
  withMetaForm(useMenuOptions, seoFormHeader),
  asBodilessHelmet('meta'),
  withMetaPageTitle('page-title', ''),
  withMetaPageDescription('description', ''),
  withMetaPageType('page-type'),
  withMetaBrand({ nodeKey: 'brand', nodeCollection: 'site' }),
  withMetaCountry({ nodeKey: 'country', nodeCollection: 'site' }),
  withMetaHtml('en', '', ''),
)(Helmet);

export default SeoHelmet;
