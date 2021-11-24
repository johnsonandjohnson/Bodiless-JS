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

import React, { FC, ComponentType } from 'react';
import { observer } from 'mobx-react-lite';
import { flow, uniq, pick, omit } from 'lodash';
import {
  withNode,
  useEditContext,
} from '@bodiless/core';
import {
  withDesign,
  addClasses,
  addProps,
  HOC,
} from '@bodiless/fclasses';
import EditFlowContainer from './EditFlowContainer';
import StaticFlowContainer from './StaticFlowContainer';
import { EditFlowContainerProps, FlowContainerProps } from './types';
import { useItemHandlers } from './model';

const FlowContainerBasic: FC<EditFlowContainerProps> = props => {
  const { isEdit } = useEditContext();
  return isEdit
    ? <EditFlowContainer {...props} />
    : <StaticFlowContainer {...props} />;
};

const withSplitDesign: HOC = Component => {
  const WithSplitDesign: FC<any> = (props: any) => {
    const { design, ...rest } = props;
    const items = useItemHandlers().getItems();
    const types = uniq(items.map(item => item.type));
    types.push('Wrapper', 'ComponentWrapper');
    const fcDesign = pick(design, types);
    const csDesign = omit(design, 'Wrapper', 'ComponentWrapper');
    return <Component {...rest} design={fcDesign} csDesign={csDesign} />;
  };
  return WithSplitDesign;
};

const FlowContainerDesignable = flow(
  observer,
  withSplitDesign,
  observer,
  withDesign({
    Wrapper: addClasses('flex flex-wrap'),
  }),
)(FlowContainerBasic);

const withMandatoryCategories = (categories: string[]) => addProps({
  mandatoryCategories: categories,
});

const FlowContainer = withNode(FlowContainerDesignable) as ComponentType<FlowContainerProps>;
export default FlowContainer;
export { withMandatoryCategories };
