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
    onChange,
    marginValue,
    hasMarginClasses,
  } = props;

  const finalUI: FinalUI = { ...defaultUI, ...useMenuOptionUI(), ...ui };

  return (
    <uiContext.Provider value={finalUI}>
      <finalUI.MasterWrapper className="flex flex-col">
        <finalUI.MarginSideCheckboxesWrapper className="bl-my-grid-1">
          <finalUI.MarginSideCheckboxLabel htmlFor="Bottom" className="text-base">
            <finalUI.MarginSideCheckbox
              key="enable-mb"
              type="checkbox"
              id="Bottom"
              name="Bottom"
              className="mr-2"
              onChange={(e) => onChange(e, 'checkbox')}
              checked={hasMarginClasses}
              value={hasMarginClasses ? 'on' : 'off'}
            />
            Enable margin bottom
          </finalUI.MarginSideCheckboxLabel>
        </finalUI.MarginSideCheckboxesWrapper>
        <finalUI.MarginValueInput
          type="number"
          id="margin-value"
          placeholder="Value..."
          className="w-52 bl-mb-grid-1 p-1 text-base text-black "
          onChange={(e) => onChange(e, 'textfield')}
          value={marginValue}
          disabled={!hasMarginClasses}
        />
      </finalUI.MasterWrapper>
    </uiContext.Provider>
  );
};

/**
 * Returns a margin settings component wrapped in a context menu form.
 *
 * @param props Props passed to the edit flow container.
 * @param hasMarginClasses The callback to check whether the item has margin classes or not.
 * @param getMargin The callback to get the margin updated value.
 * @param onChange The action to perform when margin settings are changed.
 */
export const componentMarginForm = (
  props: EditFlowContainerProps,
  hasMarginClasses: () => boolean,
  getMargin: () => string,
  onChange: ComponentMarginProps['onChange'],
) => contextMenuForm({
  hasSubmit: false,
})(
  ({ ui, closeForm }) => (
    <ComponentMargin
      {...props}
      ui={{ ...ui as ComponentMarginUI, ...props.ui as ComponentMarginUI }}
      closeForm={closeForm}
      onChange={(...args) => { onChange(...args); }}
      marginValue={getMargin()}
      hasMarginClasses={hasMarginClasses()}
    />
  ),
);
