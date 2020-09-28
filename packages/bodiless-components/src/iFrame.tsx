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

import React, { HTMLProps } from 'react';

import {
  asBodilessComponent,
  ifEditable,
} from '@bodiless/core';
import {
  useMenuOptionUI,
  withNodeDataHandlers,
  withNodeKey,
  withNode,
  withoutProps,
  withData,
  withSidecarNodes,
} from '@bodiless/core';
import type {
  AsBodiless,
  BodilessOptions,
} from '@bodiless/core';
import { addProps } from '@bodiless/fclasses';

import { flowRight } from 'lodash';
import withEditFormSnippet from './withEditFormSnippet';

// Type of the data used by this component.
export type Data = {
  src: string;
  height: string;
};

export type Props = HTMLProps<HTMLIFrameElement>;

// Options used to create an edit button.
const options: BodilessOptions<Props, Data> = {
  icon: 'settings',
  label: 'Settings',
  name: 'Edit',
  global: false,
  local: true,
  Wrapper: 'div',
  useCompoundForm: () => true,
};

const withoutPointerEvents = addProps({
  style: {
    pointerEvents: 'none',
  },
});

const withHeightSnippet = withEditFormSnippet(
  'height',
  { height: '' },
  {
    renderForm: () => {
      const { ComponentFormLabel, ComponentFormText } = useMenuOptionUI();
      return (
        <>
          <ComponentFormLabel htmlFor="height">Height</ComponentFormLabel>
          <ComponentFormText field="height" />
        </>
      );
    }
  }
);

const withSrcSnippet = withEditFormSnippet(
  'src',
  { src: '' },
  {
    renderForm: () => {
      const { ComponentFormLabel, ComponentFormText } = useMenuOptionUI();
      return (
        <>
          <ComponentFormLabel htmlFor="src">Src</ComponentFormLabel>
          <ComponentFormText field="src" />
        </>
      );
    }
  }
);

const asBaseBodilessIframe: AsBodiless<Props, Data> = (
  nodeKeys?,
  defaultData?,
  useOverrides?,
) =>
  flowRight(
    ifEditable(withoutPointerEvents),
    asBodilessComponent(options)(nodeKeys, defaultData, useOverrides),
  );

const asBodilessIframe: AsBodiless<Props, Data> = (
  nodeKeys?,
  defaultData?,
  useOverrides?,
) =>
  flowRight(
    asBaseBodilessIframe(nodeKeys, defaultData, useOverrides),
    withHeightSnippet,
    withSrcSnippet,
  );


export default asBodilessIframe;
export {
  asBaseBodilessIframe,
  withHeightSnippet,
  withSrcSnippet,
};
