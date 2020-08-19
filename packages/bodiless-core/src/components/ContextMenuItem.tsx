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

import React, {
  useState, createContext, useContext,
} from 'react';
import ReactTooltip from 'rc-tooltip';
import { getUI as getFormUI, FormProps } from '../contextMenuForm';
import { UI, IContextMenuItemProps as IProps } from '../Types/ContextMenuTypes';

const defaultUI = {
  Icon: 'span',
  ToolbarButton: 'div',
  ToolbarButtonLabel: 'span',
  FormWrapper: 'div',
  ToolbarDivider: 'div',
  Form: 'form',
  Tooltip: ReactTooltip,
};

export const getUI = (ui: UI = {}) => ({
  ...defaultUI,
  ...getFormUI(),
  ...ui,
});

const UIContext = createContext<UI>({});
export const useUI = () => {
  const ui = useContext(UIContext);
  return getUI(ui);
};

const ContextMenuItem = ({ option, index, ui }: IProps) => {
  const [renderForm, setRenderForm] = useState<(props:FormProps) => JSX.Element>();
  const [isToolTipShown, setIsToolTipShown] = useState(false);
  const finalUI = getUI(ui);
  const {
    ToolbarDivider,
    Icon,
    ToolbarButton,
    ToolbarButtonLabel,
    FormWrapper,
    Tooltip,
  } = finalUI;
  const isActive = option.isActive ? option.isActive() : false;
  const isDisabled = option.isDisabled ? option.isDisabled() : false;
  const isHidden = option.isHidden ? option.isHidden() : false;
  const isFirst = index === 0;

  const onToolbarButtonClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const menuForm = option.handler ? option.handler(event) : undefined;
    if (menuForm) {
      setIsToolTipShown(!isToolTipShown);
      // We have to pass a function to setRenderForm b/c menuForm is itself a function
      // (a render prop) and, when a function is passed to setState, react interprets
      // it as a state setter (in order to set state based on previous state)
      // see https://reactjs.org/docs/hooks-reference.html#functional-updates
      setRenderForm(() => menuForm);
    }
  };

  // Reset form and tooltip state
  const onFormClose = (): void => {
    setIsToolTipShown(false);
    setRenderForm(undefined);
  };

  function getContextMenuForm(): JSX.Element {
    if (renderForm) {
      const formProps = {
        closeForm: onFormClose,
        ui,
        'aria-label': `Context Menu ${option.label || option.name} Form`,
      };
      return (
        <FormWrapper onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
          <UIContext.Provider value={finalUI}>
            {renderForm(formProps)}
          </UIContext.Provider>
        </FormWrapper>
      );
    }
    return <></>;
  }

  if (option.name.startsWith('__divider')) {
    return <ToolbarDivider />;
  }

  if (isHidden) {
    return null;
  }

  return (
    <ToolbarButton
      isActive={isActive}
      isDisabled={isDisabled}
      isFirst={isFirst}
      onClick={onToolbarButtonClick}
      aria-label={option.label || option.name}
    >
      <Tooltip
        trigger={['click']}
        overlay={getContextMenuForm()}
        visible={isToolTipShown}
      >
        <Icon isActive={isActive || isToolTipShown}>{option.icon}</Icon>
      </Tooltip>
      {
        (option.label) ? (
          <ToolbarButtonLabel>
            {option.label}
          </ToolbarButtonLabel>
        ) : (null)
      }
    </ToolbarButton>
  );
};

export default ContextMenuItem;
