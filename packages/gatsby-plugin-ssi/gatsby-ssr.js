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

/**
 * Implement Gatsby's SSR APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 *
 */
const React = require('react');
const getSSIEntities = require('./read-ssi-entities');

/*
 * Called after every page Gatsby server renders while building HTML
 * implementing this hook in order to add SSI items to head
 */
exports.onPreRenderHTML = (
  { getHeadComponents, replaceHeadComponents },
  pluginOptions,
) => {
  const ssiEntities = getSSIEntities(pluginOptions.ssiConfPath);
  const SSIComponents = Object.keys(ssiEntities).reduce((accumulator, ssiEntityKey) => {
    if (ssiEntities[ssiEntityKey].pragma) {
      const SSIComponent = React.createElement(`ssi-element-${ssiEntityKey}`, { key: ssiEntityKey });
      accumulator.push(SSIComponent);
    }
    return accumulator;
  }, []);
  if (SSIComponents.length > 0) {
    const headComponents = [
      ...SSIComponents,
      ...getHeadComponents(),
    ];
    replaceHeadComponents(headComponents);
  }
};
