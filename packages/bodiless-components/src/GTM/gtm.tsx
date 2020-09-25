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
  withEditButton,
  withNode,
  withNodeDataHandlers,
  withNodeKey,
} from '@bodiless/core';
import * as _ from 'lodash';
import { flowRight } from 'lodash';
import Helmet from 'react-helmet';
import { ComponentFormFieldWrapper } from '@bodiless/ui';
import { DataLayer, EditableFields, EditableField } from './types';

const generateDataLayer = (dataLayer: any, dataLayerName: string) => {
  let result = `window.${dataLayerName} = window.${dataLayerName} || [];`;

  if (dataLayer !== undefined) {
    result += `window.${dataLayerName}.push(${JSON.stringify(dataLayer)});`;
  }
  return stripIndent`${result}`;
};

const tagManagerEnabled = (process.env.GOOGLE_TAGMANAGER_ENABLED || '1') === '1';

const createEditButtonOptions = (fields: EditableFields) : EditButtonOptions<any, any> => ({
  icon: 'local_offer',
  label: 'GTM',
  name: 'gtm',
  peer: true,
  isHidden: false,
  renderForm: ({ ui: formUi }) => {
    const {
      ComponentFormTitle,
      ComponentFormLabel,
      ComponentFormText,
    } = getUI(formUi);
    return (
      <>
        <ComponentFormTitle>GTM</ComponentFormTitle>
        {fields.map((field: EditableField) => (
          <ComponentFormFieldWrapper>
            <ComponentFormLabel htmlFor={field.fieldName}>{field.fieldTitle}</ComponentFormLabel>
            <ComponentFormText field={field.fieldName} id={field.id} />
          </ComponentFormFieldWrapper>
        ))}
      </>
    );
  },
  global: true,
});
// Options used to create an edit button.
export const editButtonOptions: EditButtonOptions<any, any> = {
  icon: 'local_offer',
  label: 'GTM',
  name: 'gtm',
  peer: true,
  isHidden: false,
  renderForm: ({ ui: formUi }) => {
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
        <ComponentFormLabel htmlFor="productName">Product Name</ComponentFormLabel>
        <ComponentFormText field="productName" id="product-name" />
        <ComponentFormLabel htmlFor="variant">Product Variant</ComponentFormLabel>
        <ComponentFormText field="variant" id="product-variant" />
      </>
    );
  },
  global: true,
};

const asEditableGTM = (fields: EditableFields) => flowRight(
  ifEditable(
    withEditButton(createEditButtonOptions(fields)),
  ),
);

const withDataLayer = (defaultDataLayer: DataLayer) => (
  HelmetComponent: CT,
) => (props: any) => {
  // eslint-disable-next-line no-mixed-operators
  if (process.env.NODE_ENV === 'production' && tagManagerEnabled || 1) {
    const { componentData, childeren, rest } = props;
    const { editableFields, name } = defaultDataLayer;
    const dataLayer = defaultDataLayer.events;
    // @todo: behavior if no path?
    editableFields?.map(({ path, fieldName }) => {
      _.set(dataLayer, path, componentData[fieldName]);
    });
    return (
      <HelmetComponent {...rest}>
        {childeren}
        <script>{generateDataLayer(dataLayer, name)}</script>
      </HelmetComponent>
    );
  }
  return <></>;
};

export const asBodilessGTMHelmet = (defaultDataLayer: DataLayer) => (
  nodeKey: string,
  defaultContent: any,
) => {
  const { editableFields } = defaultDataLayer;
  return flowRight(
    withNodeKey(nodeKey),
    withNode,
    withNodeDataHandlers(defaultContent),
    asEditableGTM(editableFields),
    withDataLayer(defaultDataLayer),
  )(Helmet);
};

export default asBodilessGTMHelmet;
