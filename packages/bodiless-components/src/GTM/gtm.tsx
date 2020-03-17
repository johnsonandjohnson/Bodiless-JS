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

// Summary : gatsby-config.js to starter 2. read options and conditioally include datalyer.

import React, { ComponentType as CT } from 'react';
import { stripIndent } from 'common-tags';
import { useNode } from '@bodiless/core';

type GtmEventData = {
  content: string;
};

const generateDataLayer = (dataLayer: any, dataLayerName: string) => {
  let result = `window.${dataLayerName} = window.${dataLayerName} || [];`;

  if (dataLayer.value !== undefined) {
    result += `window.${dataLayerName}.push(${JSON.stringify(
      dataLayer.value,
    )});`;
  }

  return stripIndent`${result}`;
};
//const GTMContext = React.createContext([] as GtmEventData[]);
const withEvent = (
  dataLayerName: string,
  nodeKey: string,
  nodeCollection: string,
) => (HelmetComponent: CT) => (props: any) => {
  const includeInDevelopment = false; // @todo
  if (process.env.NODE_ENV === `production` || includeInDevelopment) {
    const { children, ...rest } = props;
    const { node } = useNode(nodeCollection);
    const { data } = node.child<GtmEventData>(nodeKey);

    // @todo add env var to globalDataLayer
    return (
      <HelmetComponent {...rest}>
        {children}
        <script>{generateDataLayer(data, dataLayerName)}</script>
      </HelmetComponent>
    );
  }
};

export { withEvent };
