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
import React, { FC, createContext, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import ContextMenu from './ContextMenu';

import PageContextProvider from '../PageContextProvider';

import { useEditContext } from '../hooks';
import { IContextMenuProps as ContextMenuProps } from '../Types/ContextMenuTypes';
import { TMenuOption } from '../PageEditContext/types';

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
  const { contextMenuOptions, isPositionToggled } = context;
  const options = contextMenuOptions.filter(
    (op: TMenuOption) => op.global !== false,
  );
  return <Menu options={options} isPositionToggled={isPositionToggled} />;
});

const PageEditor: FC<Props> = ({ children, ui }) => {
  const context = useEditContext();
  // TODO: This should use useHandler to memoize the callback.
  // This probably remains replacing the get method isEdit with
  // a real function.
  const getMenuOptions = () => [
    {
      name: 'switcher',
      icon: 'compare_arrows',
      handler: () => {
        context.togglePosition();
        context.refresh();
      },
    },
    {
      name: 'docs',
      icon: 'description',
      label: 'Docs',
      handler: () => {
        window.open(process.env.BODILESS_DOCS_URL, '_blank');
      },
    },
    {
      name: 'edit',
      icon: 'edit',
      label: 'Edit',
      isActive: () => context.isEdit,
      handler: () => {
        // Force page reload after switching back to edit.
        if (!context.isEdit) {
          window.location.reload();
        }
        // Set edit mode on/off.
        context.toggleEdit();
        context.refresh();
      },
    },
  ];

  const newUI = {
    ...useUI(),
    ...ui,
  };

  const { PageOverlay = () => null } = newUI;

  return (
    <uiContext.Provider value={newUI}>
      <PageContextProvider name="page" getMenuOptions={getMenuOptions}>
        {children}
        <GlobalContextMenu />
        <PageOverlay />
      </PageContextProvider>
    </uiContext.Provider>
  );
};

export default PageEditor;
