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

/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useEditContext } from '../hooks';
import { useContextMenuContext, useMenuOptionUI } from './ContextMenuContext';
import type { IContextMenuItemProps as IProps, ContextMenuFormProps, TMenuOption } from '../Types/ContextMenuTypes';

const ContextMenuItem = observer((props: IProps) => {
  const { option: option$, name, index } = props;
  const option: TMenuOption = option$ || { name };
  const [renderForm, setRenderForm$] = useState<(props:ContextMenuFormProps) => JSX.Element>();
  const [isToolTipShown, setIsToolTipShown] = useState(false);
  const ui = useMenuOptionUI();
  const {
    ToolbarDivider, Icon, ToolbarButton,
    FormWrapper, Tooltip, ToolbarButtonLabel,
  } = ui;
  const isActive = option.isActive ? (typeof option.isActive === 'function' ? option.isActive() : option.isActive) : false;
  const isDisabled = option.isDisabled ? (typeof option.isDisabled === 'function' ? option.isDisabled() : option.isDisabled) : false;
  const isHidden = option.isHidden ? (typeof option.isHidden === 'function' ? option.isHidden() : option.isHidden) : false;
  const label = option.label ? (typeof option.label === 'function' ? option.label() : option.label) : '';
  const ariaLabel = option.ariaLabel ? (typeof option.ariaLabel === 'function' ? option.ariaLabel() : option.ariaLabel) : (label || option.name);
  const icon = option.icon ? (typeof option.icon === 'function' ? option.icon() : option.icon) : '';
  const title = typeof option.formTitle === 'function' ? option.formTitle() : option.formTitle;
  const description = typeof option.formDescription === 'function' ? option.formDescription() : option.formDescription;
  const activateContext = option.activateContext
    ? (typeof option.activateContext === 'function'
      ? option.activateContext()
      : option.activateContext)
    : option.activateContext !== false;

  const isFirst = index === 0;
  const setRenderForm = useContextMenuContext().setRenderForm || setRenderForm$;
  const context = useEditContext();

  const onToolbarButtonClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const menuForm = option.handler ? option.handler(event) : undefined;
    if (activateContext) context.activate();
    if (menuForm) {
      if (!option.local) context.toggleLocalTooltipsDisabled(!context.areLocalTooltipsDisabled);
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
    context.toggleLocalTooltipsDisabled(false);
    setIsToolTipShown(false);
    setRenderForm(undefined);
  };

  function getContextMenuForm(): JSX.Element {
    if (renderForm) {
      const formProps: ContextMenuFormProps = {
        closeForm: onFormClose,
        ui,
        'aria-label': `Context Menu ${ariaLabel} Form`,
        title,
        description,
      };
      return (
        <FormWrapper onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
          {renderForm(formProps)}
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
    <Tooltip
      trigger={['click']}
      overlay={getContextMenuForm()}
      visible={isToolTipShown}
      destroyTooltipOnHide
    >
      <ToolbarButton
        isActive={isActive}
        isDisabled={isDisabled}
        isFirst={isFirst}
        onClick={onToolbarButtonClick}
        aria-label={ariaLabel || label || option.name}
      >
        <Icon isActive={isActive || isToolTipShown}>{icon}</Icon>
        {
          (label) ? (
            <ToolbarButtonLabel>
              {label}
            </ToolbarButtonLabel>
          ) : (null)
        }
      </ToolbarButton>
    </Tooltip>
  );
});

export default ContextMenuItem;
