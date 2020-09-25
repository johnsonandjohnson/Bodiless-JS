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
  getUI,
  ifEditable,
} from '@bodiless/core';
import type {
  AsBodiless,
  BodilessOptions,
} from '@bodiless/core';
import { addProps } from '@bodiless/fclasses';

import { flowRight } from 'lodash';

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
  renderForm: ({ ui: formUi, formState }) => {
    const {
      ComponentFormTitle,
      ComponentFormLabel,
      ComponentFormText,
      ComponentFormWarning
    } = getUI(formUi);
    const { errors } = formState;
    return (
      <>
        <ComponentFormTitle>iFrame</ComponentFormTitle>
        <ComponentFormLabel htmlFor="iframe-src">Src</ComponentFormLabel>
        <ComponentFormText
          field="src"
          id="iframe-src"
          validateOnChange
          validateOnBlur
        />
        {errors && errors.src && (
          <ComponentFormWarning>{errors.src}</ComponentFormWarning>
        )}
        <ComponentFormLabel htmlFor="iframe-height">Height</ComponentFormLabel>
        <ComponentFormText field="height" id="iframe-height" />
      </>
    );
  },
  global: false,
  local: true,
  Wrapper: 'div',
};

const withoutPointerEvents = addProps({
  style: {
    pointerEvents: 'none',
  },
});

const asBodilessIframe: AsBodiless<Props, Data> = (
  nodeKeys?,
  defaultData?,
  useOverrides?,
) =>
  flowRight(
    ifEditable(withoutPointerEvents),
    asBodilessComponent(options)(
      nodeKeys,
      defaultData,
      useOverrides
    ),
  );

export default asBodilessIframe;
