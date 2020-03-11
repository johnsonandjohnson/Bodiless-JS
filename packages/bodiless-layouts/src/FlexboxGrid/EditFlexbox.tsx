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

import React, { FC, PropsWithChildren } from 'react';
import { arrayMove, SortEnd } from 'react-sortable-hoc';
import { observer } from 'mobx-react-lite';
import { flowRight, flow } from 'lodash';
import {
  withActivateOnEffect, withNode, withMenuOptions,
} from '@bodiless/core';
import {
  designable,
  Div,
  withDesign,
  addProps,
} from '@bodiless/fclasses';
import SortableChild from './SortableChild';
import SortableContainer from './SortableContainer';
import { useItemHandlers, useFlexboxDataHandlers } from './model';
import useGetMenuOptions from './useGetMenuOptions';
import { EditFlexboxProps, FlexboxItem, FlexboxComponents } from './types';

const ChildNodeProvider = withNode<PropsWithChildren<{}>, any>(React.Fragment);

const flexboxComponentStart: FlexboxComponents = {
  Wrapper: Div,
  ComponentWrapper: Div,
}

/**
 * An editable version of the Flexbox container.
 */
const EditFlexbox: FC<EditFlexboxProps> = (props:EditFlexboxProps) => {
  const {
    components, ui, snapData, defaultWidth,
  } = props;
  const items = useItemHandlers().getItems();
  const {
    onFlexboxItemResize,
    setFlexboxItems,
  } = useFlexboxDataHandlers();
  const { Wrapper, ComponentWrapper} = components;

  return (
    <Wrapper>
      <SortableContainer
        onSortEnd={(sort: SortEnd) => {
          const { oldIndex, newIndex } = sort;
          setFlexboxItems(arrayMove(items, oldIndex, newIndex));
        }}
        ui={ui}
      >
        {items.map(
          (flexboxItem: FlexboxItem, index: number): React.ReactNode => {
            const ChildComponent = components[flexboxItem.type];
            if (!ChildComponent) return null;
            return (
              <ComponentWrapper>
                <SortableChild
                  ui={ui}
                  key={`node-${flexboxItem.uuid}`}
                  index={index}
                  flexboxItem={flexboxItem}
                  snapData={snapData}
                  defaultWidth={defaultWidth}
                  getMenuOptions={useGetMenuOptions(props, flexboxItem)}
                  onResizeStop={
                      flexboxItemProps => onFlexboxItemResize(flexboxItem.uuid, flexboxItemProps)
                    }
                >
                  <ChildNodeProvider nodeKey={flexboxItem.uuid}>
                    <ChildComponent />
                  </ChildNodeProvider>
                </SortableChild>
              </ComponentWrapper>
            );
          },
        )}
      </SortableContainer>
    </Wrapper>
  );
};

EditFlexbox.displayName = 'EditFlexbox';

EditFlexbox.defaultProps = {
  components: {},
};

const EditFlexboxClean = flow(
  designable(flexboxComponentStart),
)(EditFlexbox);

const asEditFlexboxClean = withDesign({
  Wrapper: addProps({ 'data-flexbox-static': 'wrapper' }),
  ComponentWrapper: addProps({ 'data-flexbox-static': 'component-wrapper' }),
})(EditFlexboxClean);

const asEditFlexbox = flowRight(
  withActivateOnEffect,
  observer,
  withMenuOptions({
    useGetMenuOptions: (props: EditFlexboxProps) => useGetMenuOptions(props),
    name: 'Flexbox',
  }),
  observer,
);

// Wrap the EditFlexbox in a wthActivateContext so we can activate new items
export default asEditFlexbox(asEditFlexboxClean);
