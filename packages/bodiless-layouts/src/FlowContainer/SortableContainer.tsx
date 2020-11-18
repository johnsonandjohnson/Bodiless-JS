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

import React, { ComponentType, HTMLProps } from 'react';
import { observer } from 'mobx-react-lite';
import { SortableContainer, SortEndHandler } from 'react-sortable-hoc';
import {
  useContextActivator, useEditContext, withLocalContextMenu, withContextActivator,
} from '@bodiless/core';
import { flow } from 'lodash';

type FinalUI = {
  FlowContainerEmptyWrapper: ComponentType<HTMLProps<HTMLDivElement>> | string,
};

export type UI = Partial<FinalUI>;

export type SortableListProps = {
  children: React.ReactNode[];
  onSortEnd: SortEndHandler;
  ui?: UI;
  className?: string;
};

const defaultUI: FinalUI = {
  FlowContainerEmptyWrapper: 'div',
};

const getUI = (ui: UI = {}) => ({ ...defaultUI, ...ui });

const FlowContainerEmpty$ = (ui: UI) => {
  const { FlowContainerEmptyWrapper } = getUI(ui);
  const context = useEditContext();
  // mobx has issues with destructured values
  // eslint-disable-next-line react/destructuring-assignment
  const activeClassName = context.isActive ? 'bl-border-orange-400' : 'hover:bl-border-orange-400';
  const classNames = `bl-border-2 bl-border-dashed bl-flex bl-w-full bl-justify-center 
    bl-flex-wrap bl-py-grid-3 ${activeClassName}`;
  return (
    <FlowContainerEmptyWrapper className={classNames}>
      Empty FlowContainer
    </FlowContainerEmptyWrapper>
  );
};

const FlowContainerEmpty = flow(
  withContextActivator('onClick'),
  withLocalContextMenu,
)(FlowContainerEmpty$);

const SortableListWrapper = SortableContainer(
  observer(
    ({ children, ui, ...rest }: SortableListProps): React.ReactElement<SortableListProps> => {
      const content = children && children.length
        ? children
        : <FlowContainerEmpty />;
      return (
        <section {...rest} {...useContextActivator()}>
          {content}
        </section>
      );
    },
  ),
);
SortableListWrapper.displayName = 'SortableListWrapper';

const EditListView = ({
  onSortEnd,
  ui,
  children,
  ...rest
}: SortableListProps) => (
  <SortableListWrapper
    axis="xy"
    useDragHandle
    transitionDuration={0}
    onSortEnd={onSortEnd}
    ui={ui}
    {...rest}
  >
    {children}
  </SortableListWrapper>
);

EditListView.displayName = 'EditListView';

EditListView.defaultProps = {
  onSortEnd: () => {},
};

export default EditListView;
