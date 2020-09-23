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

import React, { FC, useState } from 'react';
import { uniqBy } from 'lodash';
import ContextMenuItem from './ContextMenuItem';
import StructuredChildren from '../ContextMenu/StructuredChildren';
import ContextMenuProvider, { getUI } from './ContextMenuContext';
import type {
  IContextMenuProps, ContextMenuFormProps, TMenuOption,
} from '../Types/ContextMenuTypes';

const createChildrenFromOptions = (options: TMenuOption[]) => options.map(
  option => {
    const Component = option.Component || ContextMenuItem;
    return (
      <Component
        option={option}
        group={option.group}
        name={option.name}
        key={option.name}
        aria-label={option.name}
      />
    );
  },
);

const ContextMenuBase: FC<IContextMenuProps> = (props) => {
  if (typeof window === 'undefined') return null;

  const [renderForm, setRenderForm] = useState<(props:ContextMenuFormProps) => JSX.Element>();
  const {
    ui,
    renderInTooltip = true,
    children,
  } = props;
  const { Toolbar } = getUI(ui);

  if (renderForm) {
    const formProps: ContextMenuFormProps = {
      closeForm: () => setRenderForm(undefined),
      ui,
      'aria-label': 'Context Submenu Form',
    };
    return renderForm(formProps);
  }

  if (children) {
    return (
      <ContextMenuProvider setRenderForm={renderInTooltip ? undefined : setRenderForm} ui={ui}>
        <Toolbar onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
          {children}
        </Toolbar>
      </ContextMenuProvider>
    );
  }

  return null;
};

const ContextMenu: FC<IContextMenuProps> = (props) => {
  if (typeof window === 'undefined') return null;

  const { options, ui, children } = props;
  const { ContextMenuGroup } = getUI(ui);
  const childProps = { ui };
  const childrenFromOptions = uniqBy(createChildrenFromOptions(options || []), 'key');
  const finalChildren = children
    ? [...React.Children.toArray(children).filter(React.isValidElement), ...childrenFromOptions]
    : childrenFromOptions;

  if (finalChildren.length > 0) {
    return (
      <ContextMenuBase {...props}>
        <StructuredChildren components={{ Group: ContextMenuGroup! }} {...childProps}>
          {finalChildren}
        </StructuredChildren>
      </ContextMenuBase>
    );
  }

  return null;
};

export default ContextMenu;
export {
  ContextMenuBase,
};
