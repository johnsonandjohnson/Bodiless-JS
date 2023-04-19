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

import React, { ComponentType, HTMLProps, PropsWithChildren } from 'react';
import { SortableContainer, SortEndHandler } from 'react-sortable-hoc';
import {
  useContextActivator, withLocalContextMenu, withContextActivator, observer,
} from '@bodiless/core';
import omit from 'lodash/omit';
import { flowHoc } from '@bodiless/fclasses';

type FinalUI = {
  FlowContainerEmptyWrapper: ComponentType<HTMLProps<HTMLDivElement>> | string,
};

export type UI = Partial<FinalUI>;

export type SortableListProps = PropsWithChildren<{
  onSortEnd: SortEndHandler;
  ui?: UI;
  className?: string;
}>;

const defaultUI: FinalUI = {
  FlowContainerEmptyWrapper: 'div',
};

const getUI = (ui: UI = {}) => ({ ...defaultUI, ...ui });

const FlowContainerEmpty$ = (ui: UI) => {
  const { FlowContainerEmptyWrapper } = getUI(ui);
  // mobx has issues with destructured values
  // eslint-disable-next-line react/destructuring-assignment
  const classNames = `bl-border-2 bl-border-dashed bl-border-gray-200 bl-flex bl-w-full bl-justify-center 
    bl-flex-wrap bl-py-grid-3 hover:bl-border-orange-400`;
  return (
    <FlowContainerEmptyWrapper className={classNames}>
      Empty FlowContainer
    </FlowContainerEmptyWrapper>
  );
};

const FlowContainerEmpty = flowHoc(
  withContextActivator('onClick'),
  withLocalContextMenu,
)(FlowContainerEmpty$);

const SortableListWrapper = SortableContainer(
  observer(
    ({ children, ui, ...rest }: SortableListProps): React.ReactElement<SortableListProps> => {
      const children$ = React.Children.toArray(children);
      const content = children && children$.length
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
    {...omit(rest, 'itemCount')}
  >
    {children}
  </SortableListWrapper>
);

EditListView.displayName = 'EditListView';

EditListView.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  onSortEnd: () => {},
};

export default EditListView;
