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

import React, { FC } from 'react';
import { useNode } from '@bodiless/core';
import { Token } from '@bodiless/fclasses';
import { log } from '../fsLogHandler';
import GatsbyImagePresets from './GatsbyImagePresets';

type Props = {
  preset: GatsbyImagePresets
};

const withGatsbyImageLogger = (preset?: GatsbyImagePresets): Token => Component => {
  const WithGatsbyImageLogger: FC<any> = props => {
    const { node } = useNode<any>();
    const { preset: presetFromProps } = props as Props;
    const { canonicalPreset } = node.data;
    const expectedPreset = preset || canonicalPreset || undefined;
    if (expectedPreset !== presetFromProps && presetFromProps !== undefined) {
      log(`
        Data mismatch found for node with path ${node.path.join('$')}.
        Image preset passed as a prop ${presetFromProps}.
        Image preset passed to hoc as a param ${preset}.
      `);
    }
    return <Component {...props} />;
  };
  return WithGatsbyImageLogger;
};

export default withGatsbyImageLogger;
