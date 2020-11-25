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

import React from 'react';
import { contextMenuForm } from '@bodiless/core';
import { ComponentSelectorProps, ComponentSelectorUI, ComponentWithMeta } from './types';
import ComponentSelector from '.';
import { EditFlowContainerProps } from '../FlowContainer/types';
/**
 * Returns a component selector wrapped in a context menu form.
 *
 * @param props Props passed to the edit flow container.
 * @param onSelect The action to perform when a component is selected.
 */
const componentSelectorForm = (
  // @TODO: Separate component selector props from edit flow container props.
  props: EditFlowContainerProps,
  onSelect: ComponentSelectorProps['onSelect'],
) => contextMenuForm({
  initialValues: { selection: '' },
  hasSubmit: false,
})(
  ({ ui, closeForm }) => (
    <ComponentSelector
      {...props}
      ui={{ ...ui as ComponentSelectorUI, ...props.ui as ComponentSelectorUI }}
      closeForm={closeForm}
      onSelect={(...args) => { onSelect(...args); closeForm(null); }}
      components={Object.values(props.components) as ComponentWithMeta[]}
      mandatoryCategories={props.mandatoryCategories}
    />
  ),
);

export default componentSelectorForm;
