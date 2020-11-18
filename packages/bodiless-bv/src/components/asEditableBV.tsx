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

import React from 'react';
import {
  EditButtonOptions,
  getUI,
  withData,
  withEditButton,
  withContextActivator,
  withLocalContextMenu,
  ifEditable,
} from '@bodiless/core';
import { flowRight } from 'lodash';
import { DataType as BVNodeDataType, withBVDataHandlers } from './asBodilessBV';

// Options used to create an edit button.
export const editButtonOptions: EditButtonOptions<any, BVNodeDataType> = {
  icon: 'settings',
  label: 'Settings',
  groupLabel: 'Reviews',
  name: 'Edit',
  renderForm: ({ ui: formUi }) => {
    const {
      ComponentFormTitle,
      ComponentFormLabel,
      ComponentFormText,
    } = getUI(formUi);
    return (
      <>
        <ComponentFormTitle>Bazaarvoice</ComponentFormTitle>
        <ComponentFormLabel htmlFor="bv-product-id">BV Product External ID</ComponentFormLabel>
        <ComponentFormText field="productId" id="bv-product-id" />
      </>
    );
  },
  global: false,
  local: true,
};

export const asEditableBV = flowRight(
  withBVDataHandlers,
  ifEditable(
    withEditButton(editButtonOptions),
    withContextActivator('onClick'),
    withLocalContextMenu,
  ),
  withData,
);
