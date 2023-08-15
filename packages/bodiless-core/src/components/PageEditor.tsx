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

/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  FC, createContext, useContext, useEffect, useCallback, PropsWithChildren,
} from 'react';

import ContextMenu from './ContextMenu';
import { useEditContext } from '../hooks';
import { observer } from '../mobx.bl-edit';
import { IContextMenuProps as ContextMenuProps, TMenuOption } from '../Types/ContextMenuTypes';
import { useRegisterMenuOptions } from '../PageContextProvider';
import LocalContextMenuPopup from './LocalContextMenuPopup.bl-edit';
import useLocalOptions from './useLocalOptions';

type CompleteUI = {
  GlobalContextMenu: React.ComponentType<ContextMenuProps>;
  LocalContextMenu: React.ComponentType<ContextMenuProps>;
  PageOverlay?: FC;
};
export type UI = Partial<CompleteUI>;

export type Props = {
  ui?: UI;
};

const uiContext = createContext<CompleteUI>({
  GlobalContextMenu: ContextMenu,
  LocalContextMenu: ContextMenu,
});

export const useUI = () => useContext(uiContext);

const GlobalContextMenu: FC<Props> = observer(() => {
  const { GlobalContextMenu: Menu } = useUI();
  const context = useEditContext();
  const { isPositionToggled, contextMenuOptions } = context;
  const options = contextMenuOptions.filter(
    (op: TMenuOption) => op.global !== false,
  );

  return (
    <Menu options={options} isPositionToggled={isPositionToggled} />
  );
});

/**
 * @private
 *
 * Renders the local context menu.
 */
export const LocalContextMenu = observer(() => {
  const { LocalContextMenu: Menu } = useUI();
  const options = useLocalOptions();
  return <Menu options={options} />;
});

export const useDocsButton = () => {
  const getMenuOptions = useCallback(() => [
    {
      name: 'docs',
      icon: 'description',
      label: 'Docs',
      handler: () => {
        window.open(process.env.BODILESS_DOCS_URL, '_blank');
      },
    },
  ], []);

  // Register buttons to the main menu.
  useRegisterMenuOptions({
    getMenuOptions,
    name: 'Docs',
  });
};

export const useEditButton = () => {
  const context = useEditContext();
  const getMenuOptions = useCallback(() => [
    {
      name: 'edit',
      icon: 'edit',
      label: 'Edit',
      // We use a callback here to get the latest value from the context.
      isActive: () => context.isEdit,
      handler: () => {
        context.toggleEdit();
      },
    },
  ], []);

  // Register buttons to the main menu.
  useRegisterMenuOptions({
    getMenuOptions,
    name: 'Editor',
  });
};

/**
 * Component providing the global Bodiless UI elements, the Main Menu and Page Overlay.
 * Also provides the Edit and Docs buttons on the main menu.
 */
const PageEditor: FC<PropsWithChildren<Props>> = ({ children, ui }) => {
  const context = useEditContext();

  const newUI = {
    ...useUI(),
    ...ui,
  };
  const { PageOverlay = () => null } = newUI;
  useEffect(() => {
    if (!context.isActive) context.activate();
  }, []);

  return (
    <uiContext.Provider value={newUI}>
      {children}
      <GlobalContextMenu />
      <LocalContextMenuPopup>
        <LocalContextMenu />
      </LocalContextMenuPopup>
      <PageOverlay />
    </uiContext.Provider>
  );
};

export default observer(PageEditor);
