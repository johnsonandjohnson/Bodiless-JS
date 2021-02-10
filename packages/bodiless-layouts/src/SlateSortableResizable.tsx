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
import { SortableElementProps } from 'react-sortable-hoc';
import {
  PageContextProvider,
  TMenuOptionGetter,
  useContextActivator,
  useEditContext,
  useActivateOnEffectActivator,
  withContextActivator,
  withLocalContextMenu,
} from '@bodiless/core';
import { observer } from 'mobx-react-lite';
import { flow } from 'lodash';
import CleanWrapper, { Props as WrapperProps } from './SortableResizableWrapper';

export type FinalUI = {
  Wrapper: ComponentType<WrapperProps & SortableElementProps>,
  SnapIndicator: ComponentType<HTMLProps<HTMLDivElement>>|string,
};
export type UI = Partial<FinalUI>;
const defaultUI: FinalUI = {
  Wrapper: CleanWrapper,
  SnapIndicator: 'div',
};
export const getUI = (ui: UI = {}) => ({ ...defaultUI, ...ui });

type Props = {
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
};

type SortableResizableProps = Omit<Props, 'useGetMenuOptions'>;

const SortableResizable$: FC<SortableResizableProps> = ({
  isResizeEnabled,
  children,
  ui,
  ...props
}) => {
  // We wabt to activate if nessesary
  const { uuid } = props;
  useActivateOnEffectActivator(uuid);
  const { isActive } = useEditContext();
  const isEnabled = isResizeEnabled !== false && isActive;
  const { Wrapper } = getUI(ui);
  // @ts-ignore
  return (
    <Wrapper
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

const useIsNested = (prefix = 'flexItem') => {
  const context = useEditContext();
  for (let c = context.parent; c; c = c.parent) {
    if (c.id.startsWith(prefix)) return true;
  }
  return false;
};

const SlateSortableResizable = (props: Props) => {
  const {
    children,
    uuid,
    useGetMenuOptions,
    ...rest
  } = props;

  const isNested = useIsNested();
  const name = isNested ? 'Nested Component' : 'Component';

  return (
    <PageContextProvider
      name={name}
      id={`flexItem-${uuid}`}
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
