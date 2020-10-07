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
import { withHeadElement } from '../Meta/Meta';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateDataLayer = (dataLayer: any, dataLayerName: string) => {
  let result = `window.${dataLayerName} = window.${dataLayerName} || [];`;

  if (dataLayer !== undefined) {
    result += `window.${dataLayerName} = (${JSON.stringify(dataLayer)});`;
  }

  return stripIndent`${result}`;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const setDataLayerItem = (
  path: string,
  dataLayerName: string,
  content: any,
) => {
  const result = `_.set(window.${dataLayerName},'${path}', ${JSON.stringify(
    content,
  )});`;
  return stripIndent`${result}`;
};

type BaseProps = PropsWithChildren<HelmetProps>;
type Data = {
  content: string;
};
export type DataLayer = {
  dataLayerName: string;
  dataLayerData?: any;
};

type Props = BaseProps & Data & DataLayer;

type BasicOptions = {
  name: string;
};

type Options = {
  label: string;
  path: string;
  useFormElement?: () => CT<FieldProps<any, any>>;
  placeholder?: string;
} & BasicOptions;

const withDataLayer$ = (options: Options) => (HelmetComponent: CT<Props>) => (
  props: Props,
) => {
  // @ts-ignore
  const {
    dataLayerName, children, content, ...rest
  } = props;
  const { path } = options;
  console.log('props', props);
  console.log('options', options);
  return (
    <HelmetComponent content={content} dataLayerName={dataLayerName} {...rest}>
      {children}
      <script>{setDataLayerItem(path, dataLayerName, content)}</script>
    </HelmetComponent>
  );
};

const withDataLayer = withHeadElement(withDataLayer$);

/**
 * HOC that adds Default Datalayer to a Component
 */
export const withDefaultDataLayer = ({
  dataLayerName,
  dataLayerData,
}: DataLayer) => (HelmetComponent: CT<BaseProps>) => (props: any) => (
  <HelmetComponent dataLayerName={dataLayerName} {...props}>
    <script>{generateDataLayer(dataLayerData, dataLayerName)}</script>
  </HelmetComponent>
);
export default withDataLayer;
