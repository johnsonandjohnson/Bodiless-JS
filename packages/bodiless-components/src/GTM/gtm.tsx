/**
 * Copyright © 2019 Johnson & Johnson
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
import { oneLine, stripIndent } from 'common-tags';
import {useNode} from "@bodiless/core";

type GtmData = {
  id: string;
  includeInDevelopment: boolean;
  gtmAuth: string;
  gtmPreview: string; // YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME,
  defaultDataLayer: object;
  dataLayerName: string; //  YOUR_DATA_LAYER_NAME
};
type GtmEventData = {
  content: string;
};

const generateGTMHeaderSnippet = (
  id: string,
  environmentParamStr: string,
  dataLayerName: string,
) => stripIndent`
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl+'${environmentParamStr}';f.parentNode.insertBefore(j,f);
  })(window,document,'script','${dataLayerName}', '${id}');`;

const generateDefaultDataLayer = (dataLayer: any, dataLayerName: string) => {
  let result = `window.${dataLayerName} = window.${dataLayerName} || [];`;

  // @todo determine what is this orignially used for and if we need it?
  // if (dataLayer.type === `function`) {
  //   result += `window.${dataLayerName}.push((${dataLayer.value})());`;
  // } else {
  //   if (dataLayer.type !== `object` || dataLayer.value.constructor !== Object) {
  //     console.error(
  //       `Oops the plugin option "defaultDataLayer" should be a plain object. "${dataLayer}" is not valid.`,
  //     );
  //   }
  if (dataLayer.value !== undefined) {
    result += `window.${dataLayerName}.push(${JSON.stringify(dataLayer.value)});`;
  }

  return stripIndent`${result}`;
};
const GTMHead = (data: GtmData) => {
  const {
    id,
    includeInDevelopment,
    gtmAuth,
    gtmPreview,
    dataLayerName,
    defaultDataLayer,
  } = data;
  console.log(data);
  console.log(includeInDevelopment);
  if (process.env.NODE_ENV === `production` || includeInDevelopment) {
    const environmentParamStr =
      gtmAuth && gtmPreview
        ? oneLine`
      &gtm_auth=${gtmAuth}&gtm_preview=${gtmPreview}&gtm_cookies_win=x
    `
        : ``;

    let defaultDataLayerCode = ``;
    if (defaultDataLayer) {
      defaultDataLayerCode = generateDefaultDataLayer(
        defaultDataLayer,
        dataLayerName,
      );
    }
    console.log('generateing gtm head');
    return `${defaultDataLayerCode}${generateGTMHeaderSnippet(
      id,
      environmentParamStr,
      dataLayerName,
    )}`;
  }
};

const withGTM = (data: GtmData) => (HelmetComponent: CT) => (props: any) => {
  console.log('in with GTM');
  const { children, ...rest } = props;
  const head = GTMHead(data);
  console.log(head);
  return (
    <HelmetComponent
      script={[
        {
          type: 'text/javascript',
          innerHTML: `${head}`,
        },
      ]}
      {...rest}
    >
      {children}
    </HelmetComponent>
  );
};

const withEvent = (
  nodeKey: string,
  nodeCollection: string,

) => (HelmetComponent: CT) => (props: any) => {
  const { children, ...rest } = props;
  const { node } = useNode(nodeCollection);
  const { data } = node.child<GtmEventData>(nodeKey);
  console.log('datalayer stuff', node);
    return (
      <HelmetComponent {...rest}>
        {children}
        <script>{generateDefaultDataLayer(data, 'dataLayer')}</script>
      </HelmetComponent>
    );
};
// const withDataLayer = (
//   nodeKey: string,
//   nodeCollection?: string | undefined,
// ) => (HelmetComponent: CT) => (props: any) => {
//   const { children, ...rest } = props;
//   const { node } = useNode(nodeCollection);
//   const { data } = node.child<MetaTitleData>(nodeKey);
//   console.log('datalayer stuff');
//   console.log(data);
//   if (!isEmpty(data)) {
//     return (
//       <HelmetComponent {...rest}>
//         {children}
//         <script>{JSON.stringify(data.content) || ''}</script>
//       </HelmetComponent>
//     );
//   }
//   return <HelmetComponent {...rest} />;
// };

export { withGTM, withEvent };
