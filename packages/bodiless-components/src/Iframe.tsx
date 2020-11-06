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

import React, { HTMLProps, useCallback } from 'react';
import {
  asBodilessComponent,
  ifEditable,
  useMenuOptionUI,
} from '@bodiless/core';
import type {
  BodilessOptions,
  AsBodiless,
} from '@bodiless/core';
import { addProps } from '@bodiless/fclasses';

import { flowRight } from 'lodash';
import withFormSnippet from './withFormSnippet';
import withFormHeader from './withFormHeader';

// Type of the data used by this component.
export type Data = {
  src: string;
  height: string;
};

export type Props = HTMLProps<HTMLIFrameElement>;

// Options used to create an edit button.
const options: BodilessOptions<Props, Data> = {
  icon: 'settings',
  groupLabel: 'IFrame',
  label: 'Settings',
  name: 'iframe-settings',
  global: false,
  local: true,
  Wrapper: 'div',
  useCompoundForm: () => true,
  renderForm: () => true,
};

const useIframeBodilessOptions = () => options;

const withoutPointerEvents = addProps({
  style: {
    pointerEvents: 'none',
  },
});

const isNonNegativeNumber = (value: string) => /^\d+$/.test(value);

const withHeightSnippet = withFormSnippet({
  nodeKeys: 'height',
  defaultData: { height: '' },
  snippetOptions: {
    renderForm: ({ formState }) => {
      const { errors } = formState;
      const {
        ComponentFormLabel,
        ComponentFormText,
        ComponentFormWarning,
      } = useMenuOptionUI();
      const validate = useCallback(
        (value: string) => (value && !isNonNegativeNumber(value)
          ? 'Height must be a non-negative number.'
          : undefined),
        [],
      );
      return (
        <React.Fragment key="height">
          <ComponentFormLabel htmlFor="height">Height (in pixels)</ComponentFormLabel>
          <ComponentFormText
            field="height"
            validate={validate}
            validateOnChange
            validateOnBlur
          />
          {errors && errors.height && (
            <ComponentFormWarning>{errors.height}</ComponentFormWarning>
          )}
        </React.Fragment>
      );
    },
  },
});

const withSrcSnippet = withFormSnippet({
  nodeKeys: 'src',
  defaultData: { src: '' },
  snippetOptions: {
    renderForm: () => {
      const { ComponentFormLabel, ComponentFormText } = useMenuOptionUI();
      return (
        <React.Fragment key="src">
          <ComponentFormLabel htmlFor="src">URL</ComponentFormLabel>
          <ComponentFormText field="src" />
        </React.Fragment>
      );
    },
  },
});

const withIframeFormHeader = withFormHeader({
  title: 'Iframe Configuration',
});

const asBaseBodilessIframe: AsBodiless<Props, Data> = (
  nodeKeys?,
  defaultData?,
  useOverrides?,
) => flowRight(
  ifEditable(withoutPointerEvents),
  asBodilessComponent(useIframeBodilessOptions())(nodeKeys, defaultData, useOverrides),
);

const asBodilessIframe: AsBodiless<Props, Data> = (
  nodeKeys?,
  defaultData?,
  useOverrides?,
) => flowRight(
  asBaseBodilessIframe(nodeKeys, defaultData, useOverrides),
  withIframeFormHeader,
  withSrcSnippet,
  withHeightSnippet,
);

export default asBodilessIframe;
export {
  asBaseBodilessIframe,
  withoutPointerEvents,
  useIframeBodilessOptions,
  withIframeFormHeader,
  withHeightSnippet as withIframeFormHeightSnippet,
  withSrcSnippet as withIframeFormSrcSnippet,
};
