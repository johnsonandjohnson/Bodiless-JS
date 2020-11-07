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

/* eslint-disable no-nested-ternary */
import React, { FC } from 'react';
import { addProps, Div } from '@bodiless/fclasses';
import ContextMenuItem from '../components/ContextMenuItem';
import { ContextMenuBase } from '../components/ContextMenu';
import { useMenuOptionUI } from '../components/ContextMenuContext';
import { FormChrome } from '../contextMenuForm';
import type { IContextMenuItemProps, ContextMenuFormProps } from '../Types/ContextMenuTypes';

const ContextSubMenu: FC<IContextMenuItemProps> = props => {
  const {
    option: option$, name, children, ...rest
  } = props;
  const option = option$ || { name };

  const { HorizontalToolbarButton } = useMenuOptionUI();

  const finalUi = {
    ...useMenuOptionUI(),
    Toolbar: addProps({ 'aria-label': `Context Submenu ${option.label} form` })(Div),
    ToolbarButton: HorizontalToolbarButton,
  };

  const { ContextSubMenu: SubMenu } = finalUi;
  const title = option.label ? (typeof option.label === 'function' ? option.label() : option.label) : '';

  const handler = () => ({ closeForm }: ContextMenuFormProps) => (
    <ContextMenuBase ui={finalUi} renderInTooltip={false} closeForm={closeForm}>
      <FormChrome
        title={title}
        hasSubmit={false}
        closeForm={closeForm}
        onClickOutside={closeForm}
        {...rest}
      >
        <SubMenu>
          {children}
        </SubMenu>
      </FormChrome>
    </ContextMenuBase>
  );
  const newOption = { ...option, handler };
  return <ContextMenuItem option={newOption} name={option.name} {...rest} />;
};

export default ContextSubMenu;
