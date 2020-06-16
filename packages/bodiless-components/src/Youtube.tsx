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

import React, {
  HTMLProps,
} from 'react';

import {
  EditButtonOptions,
  getUI,
  withEditButton,
  withData,
  withContextActivator,
  withNode,
  withNodeKey,
  withNodeDataHandlers,
  withLocalContextMenu,
  WithNodeProps,
  ifEditable,
  Bodiless,
  ifReadOnly,
  withoutProps,
} from '@bodiless/core';

import { flowRight } from 'lodash';
import withEditPlaceholder from './Placeholder';

// Type of the data used by this component.
export type Data = {
  src: string;
};

// Type of the props accepted by this component.
type IframeProps = HTMLProps<HTMLIFrameElement>;

export type Props = Pick<IframeProps, Exclude<keyof IframeProps, 'src'>>;

// Options used to create an edit button.
export const editButtonOptions: EditButtonOptions<Props, Data> = {
  icon: 'settings',
  label: 'Settings',
  name: 'Edit',
  renderForm: ({ ui: formUi }) => {
    const { ComponentFormTitle, ComponentFormLabel, ComponentFormText } = getUI(formUi);
    return (
      <>
        <ComponentFormTitle>Youtube video</ComponentFormTitle>
        <ComponentFormLabel htmlFor="youtube-src">Src</ComponentFormLabel>
        <ComponentFormText field="src" id="youtube-src" />
      </>
    );
  },
  global: false,
  local: true,
};

const EditPlaceholder = (props: IframeProps) => {
  const { src, ...rest } = props;
  return src
    ? <div {...rest}>{`Youtube with ${src} configured.`}</div>
    : <div {...rest}>Click to enter youtube url.</div>;
};

// Composed hoc which creates editable version of the component.
// Note - the order is important. In particular:
// - the node data handlers must be outermost
// - anything relying on the context (activator, indicator) must be
//   *after* `withEditButton()` as this establishes the context.
// - withData must be *after* the data handlers are defiend.
export const asBodilessYoutube = (nodeKey?: string) => flowRight(
  // @ts-ignore: Types of parameters are incompatible.
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers(),
  ifReadOnly(
    withoutProps(['setComponentData']),
  ),
  ifEditable(
    withEditButton(editButtonOptions),
    withContextActivator('onClick'),
    withLocalContextMenu,
  ),
  withData,
  withEditPlaceholder(EditPlaceholder),
) as Bodiless<Props, Props & Partial<WithNodeProps>>;

const Youtube = asBodilessYoutube()('iframe');
export default Youtube;
