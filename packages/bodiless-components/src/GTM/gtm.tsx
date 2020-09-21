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

import React, { ComponentType as CT } from 'react';
import { stripIndent } from 'common-tags';
import {
  EditButtonOptions,
  getUI,
  ifEditable,
  useNode,
  withEditButton,
  withNode,
  withNodeDataHandlers,
  withNodeKey,
} from '@bodiless/core';
import * as _ from 'lodash';
import { flowRight } from 'lodash';
import Helmet from 'react-helmet';

type GTMNodeDataType = {
  pageType: string,
  sku: string,
  upc: string,
  name: string,
  variant: string
};

type GtmDefaultPageData = {
  event: string;
  page: object;
};

const generateDataLayer = (dataLayer: any, dataLayerName: string) => {
  let result = `window.${dataLayerName} = window.${dataLayerName} || [];`;

  if (dataLayer !== undefined) {
    result += `window.${dataLayerName}.push(${JSON.stringify(dataLayer)});`;
  }
  return stripIndent`${result}`;
};

const tagManagerEnabled = (process.env.GOOGLE_TAGMANAGER_ENABLED || '1') === '1';
const withEvent = (
  dataLayerName: string,
  defaultPageData: GtmDefaultPageData,
  nodeKey: string,
  nodeCollection: string,
) => (HelmetComponent: CT) => (props: any) => {
  if (process.env.NODE_ENV === 'production' && tagManagerEnabled || 1) {
    const { children, ...rest } = props;
    const { node } = useNode(nodeCollection);
    const { data } = node.child<GtmEventData>(nodeKey);
    const merged = _.merge({}, defaultPageData, data);
    return (
      <HelmetComponent {...rest}>
        {children}
        <script>{generateDataLayer(merged, dataLayerName)}</script>
      </HelmetComponent>
    );
  }
  return <></>;
};

// Options used to create an edit button.
export const editButtonOptions: EditButtonOptions<any, GTMNodeDataType> = {
  icon: 'local_offer',
  label: 'GTM',
  name: 'gtm',
  peer: true,
  isHidden: false,
  renderForm: ({ ui: formUi }) => {
    console.log('in renderform');
    const {
      ComponentFormTitle,
      ComponentFormLabel,
      ComponentFormText,
    } = getUI(formUi);
    return (
      <>
        <ComponentFormTitle>GTM</ComponentFormTitle>
        <ComponentFormLabel htmlFor="pageType">Page Type</ComponentFormLabel>
        <ComponentFormText field="pageType" id="page-type" />
        <ComponentFormLabel htmlFor="pageType">Product SKU</ComponentFormLabel>
        <ComponentFormText field="sku" id="product-sku" />
        <ComponentFormLabel htmlFor="upc">Product UPC</ComponentFormLabel>
        <ComponentFormText field="upc" id="product-upc" />
        <ComponentFormLabel htmlFor="name">Product Name</ComponentFormLabel>
        <ComponentFormText field="name" id="product-name" />
        <ComponentFormLabel htmlFor="variant">Product Variant</ComponentFormLabel>
        <ComponentFormText field="variant" id="product-variant" />
      </>
    );
  },
  global: true,
};
const asEditableGTM = flowRight(
  ifEditable(
    withEditButton(editButtonOptions),
  ),
);

const withDataLayer = (defaultDataLayer : any) => (HelmetComponent: CT) => (props : any) => {
  const { componentData } = props;
  const {
    pageType, sku, upc, name, variant,
  } = componentData;
  const { events } = defaultDataLayer;
  events.map((event) => {
    console.log(event)
  });

  const merged = { ...defaultDataLayer, ...componentData };
  console.log(merged);
  return (
    <HelmetComponent><script /></HelmetComponent>
  );
};

export const asBodilessGTMHelmet = (defaultDataLayer: any) => (
  nodeKey: string,
  defaultContent: string,
) => flowRight(
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers(defaultContent),
  asEditableGTM,
  withDataLayer(defaultDataLayer),
)(Helmet);

export default withEvent;
