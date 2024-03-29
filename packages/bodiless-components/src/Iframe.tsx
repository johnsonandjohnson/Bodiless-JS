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

import flowRight from 'lodash/flowRight';
import withFormSnippet from './withFormSnippet';
import withFormHeader from './withFormHeader';

// Type of the data used by this component.
export type IframeData = {
  src: string;
  height: string;
};

export type IframeProps = HTMLProps<HTMLIFrameElement>;

// Options used to create an edit button.
const options: BodilessOptions<IframeProps, IframeData> = {
  icon: 'settings',
  groupLabel: 'IFrame',
  label: 'Settings',
  name: 'iframe-settings',
  global: false,
  local: true,
  Wrapper: 'div',
  renderForm: () => true,
};

const useIframeBodilessOptions = () => options;

const withoutPointerEvents = addProps({
  style: {
    pointerEvents: 'none',
  },
});

const isNonNegativeNumber = (value: string) => /^\d+$/.test(value);

type HeightSnippetErrors = {
  height?: string
};

const withHeightSnippet = withFormSnippet({
  nodeKeys: 'height',
  defaultData: { height: '' },
  snippetOptions: {
    renderForm: ({ formState, scope }) => {
      const errors = (
        scope ? formState.errors[scope] : formState.errors
      ) as HeightSnippetErrors;
      const {
        ComponentFormLabel,
        ComponentFormText,
        ComponentFormWarning,
      } = useMenuOptionUI();
      const validate = useCallback(
        (value: unknown) => (value && !isNonNegativeNumber(value.toString())
          ? 'Height must be a non-negative number.'
          : undefined),
        [],
      );
      return (
        <React.Fragment key="height">
          <ComponentFormLabel htmlFor="height">Height (in pixels)</ComponentFormLabel>
          <ComponentFormText
            name="height"
            validate={validate}
            validateOn="change-blur"
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
          <ComponentFormText name="src" />
        </React.Fragment>
      );
    },
  },
});

const withIframeFormHeader = withFormHeader({
  title: 'Iframe Configuration',
});

const asBaseBodilessIframe: AsBodiless<IframeProps, IframeData> = (
  nodeKeys?,
  defaultData?,
  useOverrides?,
) => flowRight(
  ifEditable(withoutPointerEvents),
  asBodilessComponent(useIframeBodilessOptions())(nodeKeys, defaultData, useOverrides),
);

const asBodilessIframe: AsBodiless<IframeProps, IframeData> = (
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
