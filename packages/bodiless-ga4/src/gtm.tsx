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

import React, { ComponentType as CT, PropsWithChildren, FC } from 'react';
import { stripIndent } from 'common-tags';
import { Helmet, HelmetProps } from 'react-helmet';
import set from 'lodash/set';
import { WithNodeKeyProps } from '@bodiless/data';
import { withHeadElement, HeadBaseOptions as BaseOptions } from '@bodiless/components';

type BaseProps = PropsWithChildren<HelmetProps>;
type Data = {
  content: string;
};
export type DataLayer = {
  dataLayerName: string;
  dataLayerData?: any;
  dataLayerType: string;
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
 * @param {string} dataLayerName - The dataLayer type.
 *
 * Return {string} - Datalayer script.
 */
const generateDataLayer = (dataLayer: any, dataLayerName: string, dataLayerType: string) => {
  let result = `window.${dataLayerName} = window.${dataLayerName} || [];`;
  if (dataLayer !== undefined) {
    result += `window.${dataLayerName}.push({ ${dataLayerType}: null });`;
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
    dataLayerData, dataLayerName, dataLayerType, children, ...rest
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
      <script {...(attributes)}>
        {
          generateDataLayer(dataLayerData, dataLayerName, dataLayerType)
        }
      </script>
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

const GTMScript: FC = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  const id = process.env.BODILESS_GTM_ID || null;
  const dataLayerName = process.env.BODILESS_GTM_DATA_LAYER || null;
  if (!id && !dataLayerName) return null;

  return (
    <Helmet>
      <script key="google-tagmanager-script">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','${dataLayerName}', '${id}');`}
      </script>
    </Helmet>
  );
};

const GTMNoScript: FC = () => {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  const id = process.env.BODILESS_GTM_ID || null;
  if (!id) return null;

  return (
    <noscript
      key="google-tagmanager-noscript"
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}" \
  height="0" width="0" style="display: none; visibility: hidden" aria-hidden="true"></iframe>`
      }}
    />
  );
};

export default withDataLayerItem;
export {
  withDataLayerScript,
  withDefaultDataLayer,
  GTMScript,
  GTMNoScript,
};
