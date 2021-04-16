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
import {
  asBodilessComponent,
  useMenuOptionUI,
  useNode,
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

// eslint-disable-next-line no-useless-escape
const isValidHtmlId = (id : string) => (/^[A-Za-z#]+[\ \w\-\:\.]*$/.test(id));

/**
 * Helper that transformes string into valid HTML id
 *  - Removes restricted characters
 *  - Trims Trailing and leading spaces
 *  - Replaces all spaces with '-'
 *  - Transforms string to lowercase
 */
const transformHash = (value: string) => (value
  ? value.replace(/[^a-zA-Z-_:. ]/g, '')
    .trim()
    .replace(/ +/g, '-').toLowerCase()
  : '');

const submitValueHandler = ({ id, ...rest }: Data) => ({
  id: transformHash(id),
  ...rest,
});

const anchorOptions: BodilessOptions<Props, Data> = {
  icon: 'local_offer',
  groupLabel: 'Anchor',
  label: 'Add',
  name: 'anchor-settings',
  global: false,
  local: true,
  renderForm: ({ formState, scope }) => {
    const errors = scope ? formState.errors[scope] : formState.errors;
    const values: any = scope ? formState.values[scope] : formState.values;
    const validate = useCallback(
      (value: string) => (value && !isValidHtmlId(value)
        ? 'Must be a valid HTML id.'
        : undefined),
      [],
    );
    const {
      ComponentFormLabel, ComponentFormText, ComponentFormWarning, ComponentFormDescription,
    } = useMenuOptionUI();

    const hasValues = values && values.id;
    const hasErrors = errors && errors.id;

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
        {hasValues && !hasErrors && (
          <ComponentFormDescription>
            Descriptive ID: #
            {transformHash(values.id)}
          </ComponentFormDescription>
        )}
        {hasErrors && (
          <ComponentFormWarning>{errors.id}</ComponentFormWarning>
        )}
      </>
    );
  },
};

/**
 * HOC that can be applied to a component to add IDs to be used for anchor links.
 *
 * @param nodeKeys
 * @param defaultData
 * @param useOverrides
 * @returns Component - bodiless componenet.
 */
const asBodilessAnchor: AsBodiless<Props, Data> = (
  nodeKeys?,
  defaultData?,
  useOverrides?,
) => withSidecarNodes(
  asBodilessComponent(anchorOptions)(nodeKeys, defaultData,
    (props) => {
      const overrides = typeof (useOverrides) === 'function' ? useOverrides(props) : useOverrides;
      const { id } = useNode<Data>().node.data;
      return { label: !id ? 'Add' : 'Edit', submitValueHandler, ...overrides };
    }),
);

export default asBodilessAnchor;
