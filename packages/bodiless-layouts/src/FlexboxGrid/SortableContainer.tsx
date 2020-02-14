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

import * as React from 'react';
import { SortableContainer, SortEndHandler } from 'react-sortable-hoc';
import { useContextActivator } from '@bodiless/core';
import { UI } from './types';

type SortableListProps = {
  children: React.ReactNode[];
  onSortEnd: SortEndHandler;
  ui?: UI;
};

const defaultUI: Partial<UI> = {
  FlexboxEmpty: 'div',
};

const getUI = (ui: UI = {}) => ({ ...defaultUI, ...ui });

const SortableListWrapper = SortableContainer(
  ({ children, ui }: SortableListProps): React.ReactElement<SortableListProps> => {
    if (!children || !children.length) {
      const { FlexboxEmpty } = getUI(ui);
      return (
        <FlexboxEmpty>
          <section className="bl-flex bl-justify-center bl-flex-wrap bl-py-grid-3" {...useContextActivator()}>Empty Flexbox</section>
        </FlexboxEmpty>
      );
    }
    return (
      <section className="bl-flex bl-flex-wrap bl-py-grid-3" {...useContextActivator()}>{children}</section>
    );
  },
);
SortableListWrapper.displayName = 'SortableListWrapper';

const EditListView = ({ onSortEnd, ui, children }: SortableListProps) => (
  <SortableListWrapper
    axis="xy"
    useDragHandle
    transitionDuration={0}
    onSortEnd={onSortEnd}
    ui={ui}
  >
    {children}
  </SortableListWrapper>
);

EditListView.displayName = 'EditListView';

EditListView.defaultProps = {
  onSortEnd: () => {},
};

export default EditListView;
