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
import { stripIndent } from 'common-tags';
import { useNode } from '@bodiless/core';
import * as _ from "lodash"

type GtmEventData = {
  content: string;
};

type GtmDefaultPageData = {
  event: string;
  page?: string;
};

const generateDataLayer = (dataLayer: any, dataLayerName: string) => {
  let result = `window.${dataLayerName} = window.${dataLayerName} || [];`;

  if (dataLayer !== undefined) {
    result += `window.${dataLayerName}.push(${JSON.stringify(dataLayer)});`;
  }

  return stripIndent`${result}`;
};
const withEvent = (
  dataLayerName: string,
  defaultPageData: GtmDefaultPageData,
  nodeKey: string,
  nodeCollection: string,
) => (HelmetComponent: CT) => (props: any) => {
  if (process.env.NODE_ENV === `production`) {
    const { children, ...rest } = props;
    console.log(nodeCollection, 'nodeCollection');
    const { node } = useNode(nodeCollection);
    const { data } = node.child<GtmEventData>(nodeKey);
    const merged = _.merge({},defaultPageData, data);
    return (
      <HelmetComponent {...rest}>
        {children}
        <script>{generateDataLayer(merged, dataLayerName)}</script>
      </HelmetComponent>
    );
  }
};

export { withEvent };
