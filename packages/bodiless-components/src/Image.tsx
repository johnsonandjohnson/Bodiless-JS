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
  getUI,
  asBodilessComponent,
  BodilessOptions,
  useNode,
  AsBodiless,
} from '@bodiless/core';

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
export function DropZonePlugin({ formApi, targetFieldName, ui }: {
  formApi: FormApi<Data>;
  targetFieldName:string;
  ui?: Partial<TImagePickerUI>;
}) {
  const [statusText, setStatusText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadTimeout, setIsUploadingTimeout] = useState(false);
  const [isUploadFinished, setIsUploadFinished] = useState(false);
  const saveRequest = new BackendSave();
  const { node } = useNode<any>();

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
    saveRequest.saveFile({
      file: acceptedFiles[0],
      nodePath: node.path.join('$'),
      baseResourcePath: node.baseResourcePath,
    })
      .then(({ data }) => {
        // unset errors
        formApi.setError(targetFieldName, undefined);
        formApi.setValue(targetFieldName, data.filesPath[0]);
        // formApi.validate();
        setIsUploading(false);
        setIsUploadingTimeout(false);
        setIsUploadFinished(true);
      })
      .catch(errorLog);
  }, []);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/svg+xml, image/gif, image/apng',
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
DropZonePlugin.defaultProps = {
  ui: {},
};

// Type of the props accepted by this component.
// Exclude the src and alt from the props accepted as we write it.
type ImageProps = HTMLProps<HTMLImageElement>;
type Props = ImageProps & { ui?: TImagePickerUI};

// Options used to create an edit button.
const options: BodilessOptions<Props, Data> = {
  icon: 'image',
  label: 'Select',
  groupLabel: 'Image',
  formTitle: 'Image',
  name: 'Image',
  renderForm: ({ ui: formUi, formApi, componentProps }) => {
    const { ui: imagePickerUI } = componentProps;
    const { ComponentFormLabel, ComponentFormText } = getUI(formUi);
    return (
      <>
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
  defaultData: {
    src: Placeholder,
    alt: 'Alt Text',
  },
};

export const withImagePlaceholder = withPropsFromPlaceholder(['src']);

export type AsBodilessImage = AsBodiless<HTMLProps<HTMLImageElement>, Data>;

export const asBodilessImage: AsBodilessImage = asBodilessComponent(options);

const Image = asBodilessImage()('img');

export default Image;
