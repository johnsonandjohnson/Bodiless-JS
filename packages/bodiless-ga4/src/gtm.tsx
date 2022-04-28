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

import React, { ComponentType as CT, PropsWithChildren } from 'react';
import { stripIndent } from 'common-tags';
import { HelmetProps } from 'react-helmet';
import set from 'lodash/set';
import { WithNodeKeyProps } from '@bodiless/core';
import { withHeadElement, HeadBaseOptions as BaseOptions } from '@bodiless/components';

type BaseProps = PropsWithChildren<HelmetProps>;
type Data = {
  content: string;
};
export type DataLayer = {
  dataLayerName: string;
  dataLayerData?: any;
};

type Props = BaseProps & Data & DataLayer;

type ItemProps = BaseProps & DataLayer;

type Options = BaseOptions & {
  path: string
};

/**
 * Generates the dataLayer script.
 *
 * @param {any} dataLayer - The dataLayer Object.
 * @param {string} dataLayerName - The dataLayer name.
 *
 * Return {string} - Datalayer script.
 */
 const generateDataLayer = (dataLayer: any, dataLayerName: string) => {
  let result = `window.${dataLayerName} = window.${dataLayerName} || [];`;
  if (dataLayer !== undefined) {
    const dataObject = dataLayer[Object.keys(dataLayer)[0]];
    result += `window.${dataLayerName}.push({ ${dataObject.event}: null });`;
    Object.values(dataLayer).forEach((entry: any) => {
      result += `window.${dataLayerName}.push(${JSON.stringify(entry)});`;
    });
  }

  return stripIndent`${result}`;
};

/**
 * HOC that adds Data Layer to Helmet Component
 *
 * @return A composed token.
 */
const withDataLayerItem$ = (options: Options) => (HelmetComponent: CT<ItemProps>) => (
  props: Props,
) => {
  const {
    dataLayerName, dataLayerData, children, content, ...rest
  } = props;
  const { path } = options;
  const value = content !== undefined ? content : '';
  if (path) {
    set(dataLayerData, path, value);
  }
  return (
    <HelmetComponent
      dataLayerName={dataLayerName}
      dataLayerData={dataLayerData}
      {...rest}
    />
  );
};

/**
 * HOC that adds Default Datalayer to a Component
 *
 * @param dataLayer DataLayer
 *
 * @return A composed token.
 */
const withDefaultDataLayer : Function = (dataLayer: DataLayer) => (
  HelmetComponent: CT<BaseProps>,
) => (props: Props) => {
  const { dataLayerData: defaultData, ...rest } = props;
  if (defaultData !== undefined) {
    set(dataLayer, 'dataLayerData', {
      ...defaultData,
      ...dataLayer.dataLayerData,
    });
  }
  return <HelmetComponent {...dataLayer} {...rest} />;
};

/**
 * HOC that renders the dataLayer script.
 *
 * @param HelmetComponent
 *
 * @param clientside - Boolean value whether to render on clientside only.
 * @param attributes - Object that cans attributes you can add to script tag.
 *
 * @return A composed token.
 */
const withDataLayerScript = (
  HelmetComponent: CT<BaseProps>, clientside?: boolean, attributes?: object
) => (
  props: Props,
) => {
  const {
    dataLayerData, dataLayerName, children, ...rest
  } = props;

  // Only render on clientside
  if (clientside) {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return null;
    }
  }

  return (
    <HelmetComponent {...rest}>
      {children}
      <script {...(attributes)}>{generateDataLayer(dataLayerData, dataLayerName)}</script>
    </HelmetComponent>
  );
};

/**
 * HOC that retrieves the data from nodekey and populates the data layer in helmt.
 *
 * @return A composed token.
 */
const withDataLayerItem: (
  options: Options,
) => (
  nodeKey?: WithNodeKeyProps,
  defaultContent?: string,
) => (...args: any[]) => any = withHeadElement(withDataLayerItem$);

export default withDataLayerItem;
export { withDataLayerScript, withDefaultDataLayer };
