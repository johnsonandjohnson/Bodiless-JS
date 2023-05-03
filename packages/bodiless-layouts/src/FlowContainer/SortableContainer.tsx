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

import React, {
  ComponentType,
  HTMLProps,
  PropsWithChildren,
  useState,
} from 'react';
import {
  DndContext,
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  closestCenter
} from '@dnd-kit/core';
import { SortableContext, SortableContextProps, rectSortingStrategy } from '@dnd-kit/sortable';
import {
  useContextActivator, withLocalContextMenu, withContextActivator, observer,
} from '@bodiless/core';
import omit from 'lodash/omit';
import { flowHoc } from '@bodiless/fclasses';

import type { UniqueIdentifier } from '@dnd-kit/core';

type FinalUI = {
  FlowContainerEmptyWrapper: ComponentType<HTMLProps<HTMLDivElement>> | string,
};

export type UI = Partial<FinalUI>;

export type onSortEndArgs = {
  oldIndex: number,
  newIndex: number
};

export type SortableListProps = PropsWithChildren<{
  onSortEnd: (arg: onSortEndArgs) => void;
  ui?: UI;
  className?: string;
} & SortableContextProps>;

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

const SortableListWrapper = observer(
  ({
    children,
    ui,
    onSortEnd,
    ...rest
  }: SortableListProps): React.ReactElement<SortableListProps> => {
    const children$ = React.Children.toArray(children);
    const content = children && children$.length
      ? children
      : <FlowContainerEmpty />;

    const items = children$.map((item: any, index: number) => item.props.nodeKey);

    const [, setActiveId] = useState<UniqueIdentifier | null>(null);
    const getIndex = (id: UniqueIdentifier) => items.indexOf(id);

    const sensors = useSensors(
      useSensor(MouseSensor, {
        // Require the mouse to move by 10 pixels before activating.
        // Slight distance prevents sortable logic messing with
        // interactive elements in the handler toolbar component.
        activationConstraint: {
          distance: 5,
        },
      }),
      useSensor(TouchSensor, {
        // Press delay of 250ms, with tolerance of 5px of movement.
        activationConstraint: {
          delay: 250,
          tolerance: 5,
        },
      })
    );
    return children && children$.length ?(
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={({ active }) => {
          if (active) {
            setActiveId(active.id);
          }
        }}
        onDragEnd={({ active, over }) => {
          if (over && active.id !== over.id) {
            onSortEnd({
              oldIndex: getIndex(active.id),
              newIndex: getIndex(over.id),
            });
          }
          setActiveId(null);
        }}
        onDragCancel={() => { setActiveId(null); }}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <section {...rest} {...useContextActivator()}>
            {content}
          </section>
        </SortableContext>
      </DndContext>
    ) : (
      <section {...rest} {...useContextActivator()}>
        {content}
      </section>
    );
  },
);

const EditListView = ({
  onSortEnd,
  ui,
  children,
  ...rest
}: SortableListProps) => (
  <SortableListWrapper
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
