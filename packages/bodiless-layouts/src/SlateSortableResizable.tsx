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

import React, { ComponentType, FC, HTMLProps } from 'react';
import { ResizeCallback } from 're-resizable';
import {
  PageContextProvider,
  TMenuOptionGetter,
  useContextActivator,
  useEditContext,
  useActivateOnEffectActivator,
  withContextActivator,
  withLocalContextMenu,
  observer
} from '@bodiless/core';
import flow from 'lodash/flow';
import CleanWrapper, { Props as WrapperProps } from './SortableResizableWrapper';

export const FC_ITEM_CONTEXT_TYPE = 'flow-container-item';

export type FinalUI = {
  Wrapper: ComponentType<WrapperProps>,
  SnapIndicator: ComponentType<HTMLProps<HTMLDivElement>>|string,
};
export type UI = Partial<FinalUI>;
const defaultUI: FinalUI = {
  Wrapper: CleanWrapper,
  SnapIndicator: 'div',
};
export const getUI = (ui: UI = {}) => ({ ...defaultUI, ...ui });

export type SlateSortableResizableProps = {
  children: React.ReactNode;
  uuid: string;
  index: number;
  minWidth: string;
  defaultSize?: {
    width?: string | number | undefined;
    height?: string | number | undefined;
  };
  size?: {
    width?: string | number | undefined;
    height?: string | number | undefined;
  };
  className: string;
  useGetMenuOptions: () => TMenuOptionGetter;
  onResizeStop?: ResizeCallback;
  onResize?: ResizeCallback;
  ui?: UI,
  isResizeEnabled?: boolean,
  /**
   * The label to use for the group of context menu buttons provided by this item.
   */
  buttonGroupLabel?: string|((p: SlateSortableResizableProps) => string),
};

const useHasActiveChildItem = () => {
  const { id, activeContext, isActive } = useEditContext();
  if (!isActive) return false;
  for (let c = activeContext; c; c = c.parent) {
    if (c.id === id) break;
    if (c.type === FC_ITEM_CONTEXT_TYPE) return true;
  }
  return false;
};

type SortableResizableProps = Omit<SlateSortableResizableProps, 'useGetMenuOptions'>;

const SortableResizable$: FC<SortableResizableProps> = ({
  isResizeEnabled,
  children,
  ui,
  ...props
}) => {
  // We want to activate if necessary
  const { uuid } = props;
  useActivateOnEffectActivator(uuid);
  const { isActive } = useEditContext();
  const hasActiveChildItem = useHasActiveChildItem();
  const isEnabled = isResizeEnabled !== false && isActive && !hasActiveChildItem;
  const { Wrapper } = getUI(ui);

  return (
    <Wrapper
      sortId={uuid}
      isEnabled={isEnabled}
      {...useContextActivator()}
      {...props}
    >
      {children}
    </Wrapper>
  );
};

const SortableResizable = flow(
  observer,
  withContextActivator('onClick'),
  withLocalContextMenu,
)(SortableResizable$);

const useIsNested = () => {
  const context = useEditContext();
  for (let c = context.parent; c; c = c.parent) {
    if (c.type === FC_ITEM_CONTEXT_TYPE) return true;
  }
  return false;
};

const SlateSortableResizable = (props: SlateSortableResizableProps) => {
  const {
    children,
    uuid,
    useGetMenuOptions,
    buttonGroupLabel,
    ...rest
  } = props;

  const name$ = typeof buttonGroupLabel === 'function' ? buttonGroupLabel(props) : buttonGroupLabel;
  const name = name$ || (useIsNested() ? 'Nested Component' : 'Component');

  return (
    <PageContextProvider
      name={name}
      type={FC_ITEM_CONTEXT_TYPE}
      getMenuOptions={useGetMenuOptions()}
    >
      <SortableResizable uuid={uuid} {...rest}>
        {children}
      </SortableResizable>
    </PageContextProvider>
  );
};

SlateSortableResizable.displayName = 'SlateSortableResizable';

SlateSortableResizable.defaultProps = {
  onResize: () => {},
  defaultSize: {
    width: '',
    height: '',
  },
};

export default SlateSortableResizable;
