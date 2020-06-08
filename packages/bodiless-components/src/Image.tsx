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
  useCallback,
  useState,
  useEffect,
  ComponentType as CT,
} from 'react';
import debug from 'debug';

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
import { useDropzone } from 'react-dropzone';
import { FormApi } from 'informed';
import BackendSave from './BackendSave';
import withPropsFromPlaceholder from './withPropsFromPlaceholder';
// @ts-ignore fails when it is imported by jest.
import Placeholder from './placeholder.png';

// Type of the data used by this component.
export type Data = {
  src: string;
  alt: string;
};

// Controls the time spent on file upload
const MaxTimeout:number = 10000;

const errorLog = debug('Image');

type UploadStatusProps = HTMLProps<HTMLElement> & { statusText: string; };
export type TImagePickerUI = {
  MasterWrapper: CT<HTMLProps<HTMLElement>>,
  Wrapper: CT<HTMLProps<HTMLElement>>,
  Input: CT<HTMLProps<HTMLInputElement>>,
  UploadArea: CT<HTMLProps<HTMLElement>>,
  Uploading: CT<HTMLProps<HTMLElement>>,
  DragRejected: CT<HTMLProps<HTMLElement>>,
  UploadTimeout: CT<HTMLProps<HTMLElement>>,
  UploadFinished: CT<HTMLProps<HTMLElement>>,
  UploadStatus: CT<UploadStatusProps>,
};

const defaultImagePickerUI = {
  MasterWrapper: 'section',
  Wrapper: 'div',
  Input: 'input',
  UploadArea: () => <div>Drag a file or click here to upload.</div>,
  Uploading: () => <div>Upload is in progress</div>,
  DragRejected: () => <div>File type not accepted or too many, try again!</div>,
  UploadTimeout: () => <div>Upload failed, please try again.</div>,
  UploadFinished: () => <div>Done!</div>,
  UploadStatus: ({ statusText }: UploadStatusProps) => <div>{statusText}</div>,
};

// DropZonePlugin control the upload of file and only saves jpg/png files.
function DropZonePlugin({ formApi, targetFieldName, ui }: {
  formApi: FormApi<Data>;
  targetFieldName:string;
  ui?: TImagePickerUI;
}) {
  const [statusText, setStatusText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadTimeout, setIsUploadingTimeout] = useState(false);
  const [isUploadFinished, setIsUploadFinished] = useState(false);
  const saveRequest = new BackendSave();
  useEffect(() => {
    if (isUploading) {
      const timer = setTimeout(
        () => {
          if (isUploading) {
            saveRequest.cancel('Timeout exceeded');
            formApi.setError(targetFieldName, 'Timeout exceeded');
            setIsUploadingTimeout(true);
            setIsUploading(false);
          }
        },
        MaxTimeout,
      );
      return () => clearTimeout(timer);
    }
    return () => null;
  });
  const onDrop = useCallback(acceptedFiles => {
    setIsUploading(true);
    setIsUploadFinished(false);
    setIsUploadingTimeout(false);
    setStatusText(`File "${acceptedFiles[0].name}" selected`);
    formApi.setError(targetFieldName, 'Uploading in progress');
    saveRequest.saveFile(acceptedFiles[0])
      .then(() => {
        const state = formApi.getState();
        // *HACK* as the formApi does not provide a interface to unset errors
        delete state.errors[targetFieldName as ('alt' | 'src')];
        formApi.setValue(targetFieldName, `/${acceptedFiles[0].name}`);
        // formApi.validate();
        setIsUploading(false);
        setIsUploadingTimeout(false);
        setIsUploadFinished(true);
      })
      .catch(errorLog);
  }, []);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/svg+xml, image/gif, image/webp, image/apng',
    multiple: false,
  });

  const {
    MasterWrapper,
    Wrapper,
    Input,
    UploadArea,
    Uploading,
    DragRejected,
    UploadTimeout,
    UploadFinished,
    UploadStatus,
  } = {
    ...defaultImagePickerUI,
    ...ui,
  };

  return (
    <MasterWrapper>
      <Wrapper {...getRootProps()}>
        <Input {...getInputProps()} />
        <UploadArea />
        {isDragReject && <DragRejected />}
        {isUploadTimeout && <UploadTimeout />}
        {isUploading && <Uploading />}
        {isUploadFinished && <UploadFinished />}
        <UploadStatus statusText={statusText} />
      </Wrapper>
    </MasterWrapper>
  );
}

// Type of the props accepted by this component.
// Exclude the src and alt from the props accepted as we write it.
type ImageProps = HTMLProps<HTMLImageElement>;
type ReducedImageProps = Pick<ImageProps, Exclude<keyof ImageProps, 'src'> | Exclude<keyof ImageProps, 'alt'>>;
type Props = ReducedImageProps & { ui?: TImagePickerUI};

// Options used to create an edit button.
export const editButtonOptions: EditButtonOptions<Props, Data> = {
  icon: 'image',
  name: 'Image',
  renderForm: ({ ui: formUi, formApi, componentProps }) => {
    const { ui: imagePickerUI } = componentProps;
    const { ComponentFormTitle, ComponentFormLabel, ComponentFormText } = getUI(formUi);
    return (
      <>
        <ComponentFormTitle>Image</ComponentFormTitle>
        <ComponentFormLabel htmlFor="image-src">Src</ComponentFormLabel>
        <ComponentFormText field="src" id="image-src" />
        <ComponentFormLabel htmlFor="image-alt">Alt</ComponentFormLabel>
        <ComponentFormText field="alt" id="image-alt" />
        <DropZonePlugin formApi={formApi} targetFieldName="src" ui={imagePickerUI} />
      </>
    );
  },
  global: false,
  local: true,
};

const emptyValue = {
  src: Placeholder,
  alt: 'Alt Text',
};

export const withImagePlaceholder = withPropsFromPlaceholder(['src']);

// Composed hoc which creates editable version of the component.
// Note - the order is important. In particular:
// - the node data handlers must be outermost
// - anything relying on the context (activator, indicator) must be
//   *after* `withEditButton()` as this establishes the context.
// - withData must be *after* the data handlers are defiend.
export const asBodilessImage = (nodeKey?: string) => flowRight(
  // @ts-ignore: Types of parameters are incompatible.
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers(emptyValue),
  ifReadOnly(
    withoutProps(['setComponentData']),
  ),
  ifEditable(
    withEditButton(editButtonOptions),
    withContextActivator('onClick'),
    withLocalContextMenu,
  ),
  withData,
) as Bodiless<Props, Props & Partial<WithNodeProps>>;

const Image = asBodilessImage()('img');
export default Image;
