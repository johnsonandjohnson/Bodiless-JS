/**
 * Copyright © 2021 Johnson & Johnson
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
import { flow, isEmpty } from 'lodash';
import {
  asBodilessComponent,
  useMenuOptionUI,
  withSidecarNodes,
} from '@bodiless/core';
import type {
  BodilessOptions,
  AsBodiless,
} from '@bodiless/core';

// Type of the data used by this component.
export type Data = {
  id: string;
};

export type Props = HTMLProps<HTMLElement>;

// Options used to create an edit button.
const anchorOptions: BodilessOptions<Props, Data> = {
  icon: 'local_offer',
  groupLabel: 'Anchor',
  label: 'Add',
  name: 'anchor-settings',
  global: false,
  local: true,
  renderForm: ({ formState } : any) => {
    // eslint-disable-next-line no-useless-escape
    const isValidHtmlId = (id : string) => (/^[A-Za-z]+[\w\-\:\.]*$/.test(id));
    const { errors } = formState;
    const validate = useCallback(
      (value: string) => (value && !isValidHtmlId(value)
        ? 'Must be a valid HTML id.'
        : undefined),
      [],
    );
      // @TODO: fix error object is not keyed by field name.
    const error = !isEmpty(errors) ? errors[Object.keys(errors)[0]] : false;
    const { ComponentFormLabel, ComponentFormText, ComponentFormWarning } = useMenuOptionUI();
    return (
      <>
        <ComponentFormLabel htmlFor="id">ID</ComponentFormLabel>
        <ComponentFormText
          field="id"
          validate={validate}
          validateOnChange
          validateOnBlur
          placeholder="Descriptive IDx"
        />
        {error.id && (
          <ComponentFormWarning>{error.id}</ComponentFormWarning>
        )}
      </>
    );
  },
};

const asBodilessAnchor: AsBodiless<Props, Data> = (
  nodeKeys?,
  defaultData?,
  useOverrides?,
) => withSidecarNodes(flow(
  asBodilessComponent(anchorOptions)(nodeKeys, defaultData, useOverrides),
));

export default asBodilessAnchor;
