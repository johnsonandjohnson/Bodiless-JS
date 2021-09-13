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
  ComponentStyleProps, ComponentStyleUI, FinalUI,
} from './types';
import uiContext, { defaultUI } from './uiContext';
import { styleTokensValues } from './token';

const isStyleChecked = (classes: string, styleClass: string): boolean => {
  if (classes.indexOf(styleClass) !== -1) return true;
  return false;
};

export const ComponentStyle: React.FC<ComponentStyleProps> = props => {
  const {
    ui,
    onChange,
    styleValues,
  } = props;

  const finalUI: FinalUI = { ...defaultUI, ...useMenuOptionUI(), ...ui };

  return (
    <uiContext.Provider value={finalUI}>
      <finalUI.MasterWrapper className="flex flex-col">
        <finalUI.MarginSideCheckboxesWrapper className="bl-my-grid-1 grid grid-cols-5">
          {Object.values(styleTokensValues.classes).map(styleClass => (
            <finalUI.MarginSideCheckboxLabel htmlFor={styleClass} className="text-base">
              <finalUI.MarginSideCheckbox
                type="checkbox"
                key={`enable-${styleClass}`}
                id={styleClass}
                className="mr-2"
                checked={isStyleChecked((styleValues ?? ''), styleClass)}
                value={styleClass}
                onChange={(e) => onChange(e)}
              />
              {styleClass}
            </finalUI.MarginSideCheckboxLabel>
          ))}
        </finalUI.MarginSideCheckboxesWrapper>
      </finalUI.MasterWrapper>
    </uiContext.Provider>
  );
};

/**
 * Returns a style classes settings component wrapped in a context menu form.
 *
 * @param props Props passed to the edit flow container.
 * @param getItemClasses The callback to get the flow container item classes.
 * @param onChange The action to perform when style classes are changed.
 */
export const componentStyleForm = (
  props: EditFlowContainerProps,
  getItemClasses: () => string,
  onChange: ComponentStyleProps['onChange'],
) => contextMenuForm({
  hasSubmit: false,
})(
  ({ ui, closeForm }) => (
    <ComponentStyle
      {...props}
      ui={{ ...ui as ComponentStyleUI, ...props.ui as ComponentStyleUI }}
      closeForm={closeForm}
      onChange={(...args) => { onChange(...args); }}
      styleValues={getItemClasses()}
    />
  ),
);
