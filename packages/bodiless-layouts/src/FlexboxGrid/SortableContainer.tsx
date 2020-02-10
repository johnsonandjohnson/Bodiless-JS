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

type SortableListProps = {
  children: React.ReactNode;
  onSortEnd: SortEndHandler;
};

const SortableListWrapper = SortableContainer(
  ({ children }: SortableListProps): React.ReactElement<SortableListProps> => (
    <section className="bl-flex bl-flex-wrap bl-py-grid-3" {...useContextActivator()}>{children}</section>
  ),
);
SortableListWrapper.displayName = 'SortableListWrapper';

const EditListView = ({ onSortEnd, children }: SortableListProps) => (
  <SortableListWrapper
    axis="xy"
    useDragHandle
    transitionDuration={0}
    onSortEnd={onSortEnd}
  >
    {children}
  </SortableListWrapper>
);

EditListView.displayName = 'EditListView';

EditListView.defaultProps = {
  onSortEnd: () => {},
};

export default EditListView;
