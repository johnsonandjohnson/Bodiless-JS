/* eslint-disable no-shadow */
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
import { flowRight, isEmpty } from 'lodash';
import {
  asBodilessComponent,
  useMenuOptionUI,
} from '@bodiless/core';
import type {
  BodilessOptions,
  AsBodiless,
} from '@bodiless/core';
import { flowIf, withoutProps } from '@bodiless/fclasses';

// Type of the data used by this component.
export type Data = {
  id: string;
};

export type Props = HTMLProps<HTMLElement>;

// Options used to create an edit button.
const useAnchorOptions: () => BodilessOptions<Props, Data> = () => {
  const renderForm = ({ formState } : any) => {
    const isValidHtmlId = (id : string) => (/^[^\s]+$/.test(id));
    const { errors } = formState;
    const validate = useCallback(
      (value: string) => (value && !isValidHtmlId(value)
        ? 'must be a valid id.'
        : undefined),
      [],
    );
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
          placeholder="Descriptive ID"
        />
        {error.id && (
        <ComponentFormWarning>{error.id}</ComponentFormWarning>
        )}
      </>
    );
  };
  const options = {
    icon: 'local_offer',
    groupLabel: 'Anchor',
    label: 'Anchor',
    name: 'anchor-settings',
    global: false,
    local: true,
    renderForm,
  };
  return options;
};

const asBodilessAnchor: AsBodiless<Props, Data> = (
  nodeKeys?,
  defaultData?,
  useOverrides?,
) => flowRight(
  asBodilessComponent(useAnchorOptions())(nodeKeys, defaultData, useOverrides),
);

export default asBodilessAnchor;
