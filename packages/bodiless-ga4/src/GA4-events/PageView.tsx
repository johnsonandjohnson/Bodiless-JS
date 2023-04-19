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

import React, { ComponentType } from 'react';
import { useNode } from '@bodiless/data';
import { withShowDesignKeys } from '@bodiless/fclasses';
import Helmet from 'react-helmet';
import withDataLayerItem, { withDefaultDataLayer } from '../gtm';
// import { useLanguageContext } from '@canvasx/i18n';
import { withGlobalGA4Form } from '../util';

// Define the global dataLayer default data.
export const defaultDataLayer = {
  dataLayerName: 'dataLayer',
  dataLayerData: {
    pageView: {
      event: 'page_view',
      page_data: {
        brand: '',
        country: '',
        language: '',
        page_location: '',
        page_referrer: '',
        page_title: '',
        region: '',
      },
    },
  },
  dataLayerType: 'page_data',
};

// eslint-disable-next-line max-len
const withSiteMetaData: Function = (nodeKey: string) => (HelmetComponent: ComponentType) => (props: any) => {
  const { dataLayerData } = props;
  const { node } = useNode();
  const peerNode = node.peer<any>(['Site', 'meta', nodeKey]);
  const { content } = peerNode.data;
  if (content) {
    dataLayerData.pageView.page_data[nodeKey] = content;
  }
  return <HelmetComponent {...dataLayerData} {...props} />;
};

// eslint-disable-next-line max-len
const withGenericLanguageData: Function = () => (HelmetComponent: ComponentType) => (props: any) => {
  // TODO use Language Contexto Switch
  // const lang = useLanguageContext().getCurrentLanguage().name;
  const lang = 'en';
  const { dataLayerData } = props;
  dataLayerData.pageView.page_data.language = lang;
  return <HelmetComponent {...dataLayerData} {...props} />;
};

// Add a page type editable field which value will be injected in the default
// dataLayer defined above at a given path.
const withDataLayerPageType = withDataLayerItem({
  name: 'pagetype',
  label: 'Page Type',
  path: 'pageView.page_data.page_type',
});

const withDataLayerPageTitle: Function = () => (HelmetComponent: ComponentType) => (props: any) => {
  const { node } = useNode();
  const pageTitleNode = node.peer<any>(['Page', 'meta', 'page-title']);
  const { content }: { content: string } = pageTitleNode.data;
  const { dataLayerData } = props;
  dataLayerData.pageView.page_data.page_title = content;
  return <HelmetComponent {...dataLayerData} {...props} />;
};

// eslint-disable-next-line max-len
const withDataLayerPageLocRef: Function = () => (HelmetComponent: ComponentType) => (props: any) => {
  const { dataLayerData } = props;
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  dataLayerData.pageView.page_data.page_location = window.location.href;
  dataLayerData.pageView.page_data.page_referrer = document.referrer;
  return <HelmetComponent {...dataLayerData} {...props} />;
};

export const DefaultPageGA4DataLayerHelmet = withGlobalGA4Form(
  withDefaultDataLayer(defaultDataLayer),
  withDataLayerPageType('page-type', 'information'),
  withSiteMetaData('brand'),
  withSiteMetaData('country'),
  withSiteMetaData('region'),
  withDataLayerPageTitle(),
  withGenericLanguageData(),
  withDataLayerPageLocRef(),
)(Helmet);

export const WithGA4DesignKeys = withShowDesignKeys(true, 'layer-region');
