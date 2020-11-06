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

import React, { FC, createContext, useContext } from 'react';
import {
  Text, TextArea, Radio, RadioGroup, Checkbox, Option, Select,
} from 'informed';
import ReactTooltip from 'rc-tooltip';
import { omit } from 'lodash';
import ReactTagsField from './ReactTagsField';
import type { ContextMenuUI, ContextMenuFormProps } from '../Types/ContextMenuTypes';

type ContextType = {
  // eslint-disable-next-line max-len
  setRenderForm?: React.Dispatch<React.SetStateAction<((props: ContextMenuFormProps) => JSX.Element) | undefined>>;
};

type ContextUIType = {
  ui?: ContextMenuUI;
};

const DefaultToolbarButton = (props: any) => (
  <div {...omit(props, 'isActive', 'isDisabled', 'isFirst')} />
);

const defaultUI: Required<ContextMenuUI> = {
  Icon: (props: any) => <i {...omit(props, 'isActive')} />,
  ComponentFormTitle: 'h3',
  ComponentFormLabel: 'label',
  ComponentFormButton: 'button',
  ComponentFormCloseButton: 'button',
  ComponentFormSubmitButton: 'button',
  ComponentFormUnwrapButton: 'button',
  ComponentFormText: Text,
  ComponentFormTextArea: TextArea,
  ComponentFormError: 'div',
  ComponentFormWarning: 'div',
  ComponentFormLink: 'a',
  Form: 'form',
  ReactTags: ReactTagsField,
  ComponentFormList: 'ul',
  ComponentFormListItem: 'li',
  ComponentFormDescription: 'div',
  ContextSubMenu: React.Fragment,
  HorizontalToolbarButton: DefaultToolbarButton,
  ToolbarButton: DefaultToolbarButton,
  FormWrapper: 'div',
  ToolbarDivider: 'div',
  Tooltip: ReactTooltip,
  Toolbar: 'div',
  ContextMenuGroup: ({ children, key }: any) => (
    <React.Fragment key={key}>{children}</React.Fragment>
  ),
  ToolbarButtonLabel: 'span',
  ComponentFormRadio: Radio,
  ComponentFormRadioGroup: RadioGroup,
  ComponentFormCheckBox: Checkbox,
  ComponentFormFieldTitle: 'title',
  ComponentFormOption: Option,
  ComponentFormSelect: Select,
  ComponentFormFieldWrapper: 'div',
};

const getUI = (ui: ContextMenuUI = {}) => ({
  ...defaultUI,
  ...ui,
});

const ContextMenuContext = createContext<ContextType>({});
const ContextMenuUIContext = createContext<ContextMenuUI>({});

const useContextMenuContext = () => useContext(ContextMenuContext);
const useMenuOptionUI = () => getUI(useContext(ContextMenuUIContext));

const ContextMenuProvider: FC<ContextType & ContextUIType> = ({ children, setRenderForm, ui }) => (
  <ContextMenuUIContext.Provider value={getUI(ui)}>
    <ContextMenuContext.Provider value={{ setRenderForm }}>
      { children }
    </ContextMenuContext.Provider>
  </ContextMenuUIContext.Provider>
);

export default ContextMenuProvider;
export {
  useContextMenuContext,
  useMenuOptionUI,
  getUI,
};
