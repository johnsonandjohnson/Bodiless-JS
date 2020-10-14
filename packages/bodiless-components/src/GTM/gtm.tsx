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

import React, { ComponentType as CT, PropsWithChildren } from 'react';
import { stripIndent } from 'common-tags';
import { FieldProps } from 'informed';
import { HelmetProps } from 'react-helmet';
import * as _ from 'lodash';
import { withHeadElement } from '../Meta/Meta';

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

type BasicOptions = {
  name: string;
};

type Options = {
  label: string;
  path?: string;
  useFormElement?: () => CT<FieldProps<any, any>>;
  placeholder?: string;
} & BasicOptions;

/**
 * Generate the dataLayer script.
 *
 * @param {any} dataLayer - The dataLayer Object.
 * @param {string} dataLayerName - The dataLayer name.
 *
 * Return {string} - Datalayer script.
 */
const generateDataLayer = (dataLayer: any, dataLayerName: string) => {
  let result = `window.${dataLayerName} = window.${dataLayerName} || [];`;
  if (dataLayer !== undefined) {
    Object.values(dataLayer).forEach((entry: any) => {
      result += `window.${dataLayerName}.push(${JSON.stringify(entry)});`;
    });
  }

  return stripIndent`${result}`;
};

const withDataLayerItem$ = (options: Options) => (HelmetComponent: CT<ItemProps>) => (
  props: Props,
) => {
  const {
    dataLayerName, dataLayerData, children, content, ...rest
  } = props;
  const { path } = options;
  if (path) {
    _.set(dataLayerData, path, content);
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
 */
const withDefaultDataLayer = (dataLayer: DataLayer) => (
  HelmetComponent: CT<BaseProps>,
) => (props: Props) => {
  const { dataLayerData: defaultData, ...rest } = props;
  if (defaultData !== undefined) {
    _.set(dataLayer, 'dataLayerData', { ...defaultData, ...dataLayer.dataLayerData });
  }
  return (<HelmetComponent {...dataLayer} {...rest} />);
};

/**
 * An HOC that renders the dataLayer scrip.
 *
 * @param HelmetComponent
 */
const withDataLayerScript = (HelmetComponent: CT<BaseProps>) => (
  props: Props,
) => {
  const {
    dataLayerData, dataLayerName, children, ...rest
  } = props;
  return (
    <HelmetComponent {...rest}>
      {children}
      <script>{generateDataLayer(dataLayerData, dataLayerName)}</script>
    </HelmetComponent>
  );
};

const withDataLayerItem = withHeadElement(withDataLayerItem$);

export default withDataLayerItem;
export { withDataLayerScript, withDefaultDataLayer };
