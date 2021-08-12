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

import React from 'react';
import { contextMenuForm, useMenuOptionUI } from '@bodiless/core';
import { EditFlowContainerProps } from '../FlowContainer/types';
import {
  ComponentMarginProps, ComponentMarginUI, FinalUI,
} from './types';
import uiContext, { defaultUI } from './uiContext';

export const ComponentMargin: React.FC<ComponentMarginProps> = props => {
  const {
    ui,
  } = props;
  const finalUI:FinalUI = { ...defaultUI, ...useMenuOptionUI(), ...ui };

  return (
    <uiContext.Provider value={finalUI}>
      <finalUI.MasterWrapper className="flex flex-col">
        <finalUI.MarginSideCheckboxesWrapper>
          <finalUI.MarginSideCheckboxLabel htmlFor="Bottom">
            <finalUI.MarginSideCheckbox
              key="enable-mb"
              type="checkbox"
              id="Bottom"
              name="Bottom"
            />
            Enable margin bottom
          </finalUI.MarginSideCheckboxLabel>
        </finalUI.MarginSideCheckboxesWrapper>
        <finalUI.MarginValueInput
          type="number"
          id="margin-value"
          placeholder="value..."
          className="w-36"
        />
      </finalUI.MasterWrapper>
    </uiContext.Provider>
  );
};

/**
 * Returns a margin settings component wrapped in a context menu form.
 *
 * @param props Props passed to the edit flow container.
 * @param onSelect The action to perform when margin settings are changed.
 */
export const componentMarginForm = (
  props: EditFlowContainerProps,
  onChange: ComponentMarginProps['onChange'],
) => contextMenuForm({
  initialValues: { selection: '' },
  hasSubmit: false,
})(
  ({ ui, closeForm }) => (
    <ComponentMargin
      {...props}
      ui={{ ...ui as ComponentMarginUI, ...props.ui as ComponentMarginUI }}
      closeForm={closeForm}
      onChange={(...args) => { onChange(...args); closeForm(null); }}
    />
  ),
);
