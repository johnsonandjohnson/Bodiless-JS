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
  asBodilessComponent,
  getUI,
} from '@bodiless/core';
import type {
  WithNodeKeyProps,
  BodilessOptions,
  EditButtonOptions,
} from '@bodiless/core';
import {
  asComponent,
  DesignableComponentsProps
} from '@bodiless/fclasses';

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
const options: BodilessOptions<Props, Data> = {
  icon: 'settings',
  label: 'Settings',
  name: 'Edit',
  renderForm: ({ ui: formUi }) => {
    const { ComponentFormTitle, ComponentFormLabel, ComponentFormText } = getUI(formUi);
    return (
      <>
        <ComponentFormTitle>iFrame</ComponentFormTitle>
        <ComponentFormLabel htmlFor="iframe-src">Src</ComponentFormLabel>
        <ComponentFormText field="src" id="iframe-src" />
        <ComponentFormLabel htmlFor="iframe-height">Height</ComponentFormLabel>
        <ComponentFormText field="height" id="iframe-height" />
      </>
    );
  },
  global: false,
  local: true,
};

const EditPlaceholder = (props: IframeProps) => {
  const { src, ...rest } = props;
  return src
    ? <div {...rest}>{`Iframe with ${src} configured.`}</div>
    : <div {...rest}>Click to enter iframe url.</div>;
};

const asBodilessIframe = (
  nodeKeys?: WithNodeKeyProps,
  defaultData?: Data,
  useOverrides?: (props: Props) => Partial<EditButtonOptions<Props, Data>>,
) =>
  flowRight(
    asBodilessComponent(options)(
      nodeKeys,
      defaultData,
      useOverrides
    ),
    withEditPlaceholder(EditPlaceholder),
  );

export default asBodilessIframe;
