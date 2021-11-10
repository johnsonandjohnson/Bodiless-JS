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
  HTMLProps,
  ComponentType,
} from 'react';
import flow from 'lodash/flow';
import {
  getUI,
  asBodilessComponent,
  BodilessOptions,
  AsBodiless,
} from '@bodiless/core';
import { addProps } from '@bodiless/fclasses';
import { withFieldApi } from 'informed';
import { FileUpload } from '../FileUpload';
import type { FileUploadPickerUI } from '../FileUpload';
import withPropsFromPlaceholder from '../withPropsFromPlaceholder';
// @ts-ignore fails when it is imported by jest.
import Placeholder from './placeholder.png';

// Type of the data used by this component.
export type Data = {
  src: string;
  alt: string;
  title: string;
};

export type TImagePickerUI = FileUploadPickerUI;

// DropZonePlugin control the upload of file and only saves jpg/png files.
export const DropZonePlugin = flow(
  addProps({
    accept: 'image/jpeg, image/png, image/svg+xml, image/gif, image/apng',
  }),
)(FileUpload);

// Type of the props accepted by this component.
// Exclude the src and alt from the props accepted as we write it.
type ImageProps = HTMLProps<HTMLImageElement>;
type Props = ImageProps & { ui?: TImagePickerUI};

const ImageDropZonePlugin: ComponentType<{ ui?: Partial<TImagePickerUI> }> = withFieldApi('src')(DropZonePlugin);

// Options used to create an edit button.
const options: BodilessOptions<Props, Data> = {
  icon: 'image',
  label: 'Select',
  groupLabel: 'Image',
  formTitle: 'Image',
  name: 'Image',
  renderForm: ({ ui: formUi, componentProps }) => {
    const { ui: imagePickerUI } = componentProps;
    const { ComponentFormLabel, ComponentFormText } = getUI(formUi);
    return (
      <>
        <ComponentFormLabel htmlFor="image-src">Src</ComponentFormLabel>
        <ComponentFormText field="src" id="image-src" />
        <ComponentFormLabel htmlFor="image-alt">Alt</ComponentFormLabel>
        <ComponentFormText field="alt" id="image-alt" />
        <ComponentFormLabel htmlFor="image-title">Title</ComponentFormLabel>
        <ComponentFormText field="title" id="image-title" />
        <ImageDropZonePlugin ui={imagePickerUI} />
      </>
    );
  },
  global: false,
  local: true,
  defaultData: {
    src: Placeholder,
    alt: '',
    title: '',
  },
};

export const withImagePlaceholder = withPropsFromPlaceholder(['src']);

export type AsBodilessImage = AsBodiless<ImageProps, Data>;

export const asBodilessImage: AsBodilessImage = asBodilessComponent(options);
export type ImageToken = ReturnType<AsBodilessImage>;

const Image = asBodilessImage()('img');

export default Image;
