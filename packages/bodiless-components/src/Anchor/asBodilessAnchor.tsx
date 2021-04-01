/**
 * Copyright © 2020 Johnson & Johnson
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

import React, { Fragment, HTMLProps, useCallback } from 'react';
import {
  asBodilessComponent,
  ifToggledOff,
  ifToggledOn,
  useMenuOptionUI,
  useNode,
  withData,
  withDefaultContent,
} from '@bodiless/core';
import type {
  BodilessOptions,
  AsBodiless,
} from '@bodiless/core';

import { flowRight } from 'lodash';
import { addProps, addPropsIf, withoutProps } from '@bodiless/fclasses';
import withFormSnippet from '../withFormSnippet';
import withFormHeader from '../withFormHeader';
import { replaceWith } from '@bodiless/fclasses';
import { toJS } from 'mobx';

// Type of the data used by this component.
export type Data = {
  id: string;
};

export type Props = HTMLProps<HTMLElement>;

// Options used to create an edit button.
const options: BodilessOptions<Props, Data> = {
  icon: 'local_offer',
  groupLabel: 'Anchor',
  label: 'Anchor',
  name: 'anchor-settings',
  global: false,
  local: true,
  Wrapper: 'div',
  renderForm: () => true,
};

const useAnchorBodilessOptions = () => options;

const withIdSnippet = withFormSnippet({
  nodeKeys: 'id',
  defaultData: { id: '' },
  snippetOptions: {
    renderForm: () => {
      const { ComponentFormLabel, ComponentFormText } = useMenuOptionUI();
      return (
        <React.Fragment key="id">
          <ComponentFormLabel htmlFor="id">ID</ComponentFormLabel>
          <ComponentFormText field="id" placeholder="Descriptive ID" />
        </React.Fragment>
      );
    },
  },
});

const withAnchorFormHeader = withFormHeader({
  title: 'Anchor Configuration',
});

const asBaseBodilessAnchor: AsBodiless<Props, Data> = (
  nodeKeys?,
  defaultData?,
  useOverrides?,
) => flowRight(
  asBodilessComponent(useAnchorBodilessOptions())(nodeKeys, defaultData, useOverrides),
);

const useEmptyAnchorToggle = ({ id }: Props) => {
  const { node } = useNode<Data>();
  console.log(id);
  console.log(toJS(node.data));
  const ret = (id === undefined || id === '') && node.data.id === '';
  console.log('ret', ret);
  return ret;
};
const withoutIDWhenLinkDataEmpty = ifToggledOn(useEmptyAnchorToggle)(withoutProps(['id']));

const asBodilessAnchor: AsBodiless<Props, Data> = (
  nodeKeys?,
  defaultData?,
  useOverrides?,
) => flowRight(
  withoutIDWhenLinkDataEmpty,
  asBaseBodilessAnchor(nodeKeys, defaultData, useOverrides),
  withIdSnippet,
);

export default asBodilessAnchor;
export {
  asBaseBodilessAnchor,
  useAnchorBodilessOptions,
  withAnchorFormHeader,
  withIdSnippet as withIframeFormSrcSnippet,
};
