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
} from 'react';
import debug from 'debug';
import MaterialIcon from '@material/react-material-icon';

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
import { Spinner } from '@bodiless/ui';
import BackendSave from './BackendSave';
import Placeholder from './placeholder.png';

// Type of the data used by this component.
export type Data = {
  src: string;
  alt: string;
};

// Type of the props accepted by this component.
// Exclude the href from the props accepted as we write it.
type ImageProps = HTMLProps<HTMLImageElement>;

// Controls the time spent on file upload
const MaxTimeout:number = 10000;

const errorLog = debug('Image');

// DropZonePlugin control the upload of file and only saves jpg/png files.
function DropZonePlugin({ formApi, targetFieldName }: {
  formApi: FormApi<Data>; targetFieldName:string }) {
  const [statusText, setStatusText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadTimeout, setIsUploadingTimeout] = useState(false);
  const [isUploadFinished, setIsUploadFinished] = useState(false);
  useEffect(() => {
    if (isUploading) {
      const timer = setTimeout(
        () => {
          if (isUploading) {
            BackendSave.cancel('Timeout exceeded');
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
    setStatusText(`File "${acceptedFiles[0].name}" selected`);
    formApi.setError(targetFieldName, 'Uploading in progress');
    const saveRequest = new BackendSave();
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
    accept: 'image/jpeg, image/png, image/svg+xml,',
    multiple: false,
  });

  return (
    <section className="bl-container">
      <div {...getRootProps({
        className: 'bl-min-h-grid-16 bl-border bl-border-dashed bl-border-grey-800 bl-bg-grey-100 bl-p-grid-3 bl-mb-grid-3 bl-text-black',
      })}
      >
        <input {...getInputProps()} />
        <div className="bl-font-bold bl-text-base bl-text-center">
          Drag a file or click here to upload.
          <MaterialIcon className="bl-w-full" icon="cloud_upload" />
        </div>
        <div className="bl-text-red">
          {isDragReject && 'File type not accepted or too many, try again!'}
        </div>
        <div className="bl-text-red">
          {isUploadTimeout && 'Upload failed, please try again.'}
        </div>
        {isUploading && <Spinner color="bl-bg-grey-800 bl-my-4" />}
        {isUploadFinished && <div className="bl-text-center bl-text-lg bl-text-black">Done!</div>}
        <div className="">
          {statusText}
        </div>
      </div>

    </section>
  );
}

export type Props = Pick<ImageProps, Exclude<keyof ImageProps, 'src'> | Exclude<keyof ImageProps, 'alt'>>;

// Options used to create an edit button.
export const editButtonOptions: EditButtonOptions<Props, Data> = {
  icon: 'image',
  name: 'Image',
  renderForm: ({ ui: formUi, formApi }) => {
    const { ComponentFormTitle, ComponentFormLabel, ComponentFormText } = getUI(formUi);
    return (
      <>
        <ComponentFormTitle>Image</ComponentFormTitle>
        <ComponentFormLabel htmlFor="image-src">Src</ComponentFormLabel>
        <ComponentFormText field="src" id="image-src" />
        <ComponentFormLabel htmlFor="image-alt">Alt</ComponentFormLabel>
        <ComponentFormText field="alt" id="image-alt" />
        <DropZonePlugin formApi={formApi} targetFieldName="src" />
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


// Composed hoc which creates editable version of the component.
// Note - the order is important. In particular:
// - the node data handlers must be outermost
// - anything relying on the context (activator, indicator) must be
//   *after* `withEditButton()` as this establishes the context.
// - withData must be *after* the data handlers are defiend.
export const asBodilessImage = (nodeKey?: string, nodeData?: Partial<Data>) => flowRight(
  // @ts-ignore: Types of parameters are incompatible.
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers(
    {
      ...emptyValue,
      ...nodeData,
    },
  ),
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
