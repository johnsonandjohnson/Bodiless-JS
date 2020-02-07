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

import React, { useRef, FC, PropsWithChildren } from 'react';
import { arrayMove, SortEnd } from 'react-sortable-hoc';
import { observer } from 'mobx-react-lite';
import { v1 } from 'uuid';
import {
  ContextProvider, useContextActivator, withActivateOnEffect, withNode,
} from '@bodiless/core';
import { DesignableComponents } from '@bodiless/fclasses';
import SortableChild from './SortableChild';
import SortableContainer from './SortableContainer';
import {
  useItemHandlers,
  useFlowContainerDataHandlers,
  useGetMenuOptions,
} from './helpers';
import { EditFlowContainerProps, FlowContainerItem } from './types';

const ChildNodeProvider = withNode<PropsWithChildren<{}>, any>(React.Fragment);

function isAllowedComponent(
  components: DesignableComponents,
  type: string,
): boolean {
  return Boolean(components[type]);
}

const FlowContainerActivator: React.FC = ({ children }) => (
  <div {...useContextActivator('onClick')}>
    {children}
  </div>
);

const EditFlowContainer: FC<EditFlowContainerProps> = (props:EditFlowContainerProps) => {
  const uuid = useRef(v1());
  const { components, ui, snapData } = props;
  const items = useItemHandlers().getItems();
  const getMenuOptions = useGetMenuOptions(props);
  const {
    onFlowContainerItemResize,
    setFlowContainerItems,
    deleteFlowContainerItem,
  } = useFlowContainerDataHandlers();

  return (
    <ContextProvider
      name={`flex-${uuid.current}`}
      getMenuOptions={getMenuOptions}
    >
      <FlowContainerActivator>
        <SortableContainer
          onSortEnd={(sort: SortEnd) => {
            const { oldIndex, newIndex } = sort;
            setFlowContainerItems(arrayMove(items, oldIndex, newIndex));
          }}
        >
          {items.map(
            (flowContainerItem: FlowContainerItem, index: number): React.ReactNode => {
              if (!isAllowedComponent(components, flowContainerItem.type)) {
                return null;
              }
              const ChildComponent = components[flowContainerItem.type];
              return (
                <SortableChild
                  ui={ui}
                  key={`node-${flowContainerItem.uuid}`}
                  index={index}
                  flowContainerItem={flowContainerItem}
                  snapData={snapData}
                  onDelete={() => deleteFlowContainerItem(flowContainerItem.uuid)}
                  onResizeStop={
                    flowContainerItemProps => (
                      onFlowContainerItemResize(flowContainerItem.uuid, flowContainerItemProps)
                    )
                  }
                >
                  <ChildNodeProvider nodeKey={flowContainerItem.uuid}>
                    <ChildComponent />
                  </ChildNodeProvider>
                </SortableChild>
              );
            },
          )}
        </SortableContainer>
      </FlowContainerActivator>
    </ContextProvider>
  );
};

EditFlowContainer.displayName = 'EditFlowContainer';

EditFlowContainer.defaultProps = {
  components: {},
};

// Wrap the EditFlowContainer in a wthActivateContext so we can activate new items
export default withActivateOnEffect(observer(EditFlowContainer));
