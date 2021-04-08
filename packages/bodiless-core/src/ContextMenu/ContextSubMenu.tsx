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
import React, {
  FC, createContext, useContext, ReactNode,
} from 'react';
import { addProps, Div } from '@bodiless/fclasses';
import ContextMenuItem from '../components/ContextMenuItem';
import { ContextMenuBase } from '../components/ContextMenu';
import { useMenuOptionUI } from '../components/ContextMenuContext';
import { FormChrome } from '../contextMenuForm';
import type { IContextMenuItemProps, ContextMenuFormProps } from '../Types/ContextMenuTypes';

// A context to hold the child menu items.
const SubMenuContext = createContext<ReactNode>(null);
const SubMenuChildren = () => {
  const children = useContext(SubMenuContext);
  return <>{children}</>;
};

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
          <SubMenuChildren />
        </SubMenu>
      </FormChrome>
    </ContextMenuBase>
  );
  const newOption = { ...option, handler };
  return (
    // We put the children into a context which is then de-referenced
    // inside the submenu "form". This is necessary bc the handler
    // above returns a renderForm function which captures the children
    // in a closure and this is only regenerated when you click the button.
    // This way, we ensure that the menu buttons re-render when their option
    // definitions change.
    <SubMenuContext.Provider value={children}>
      <ContextMenuItem option={newOption} name={option.name} {...rest} />
    </SubMenuContext.Provider>
  );
};

export default ContextSubMenu;
