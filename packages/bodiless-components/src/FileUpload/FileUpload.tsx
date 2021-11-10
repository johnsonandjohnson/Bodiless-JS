/**
 * Copyright © 2021 Johnson & Johnson
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
  useState,
  useEffect,
  useCallback,
  HTMLProps,
  ComponentType as CT,
} from 'react';
import debug from 'debug';
import type { FieldApi } from 'informed';
import { useNode } from '@bodiless/core';
import { useDropzone } from 'react-dropzone';
import BackendSave from '../BackendSave';

export enum FileUploadStatus {
  Initial,
  FileRejected,
  FileAccepted,
}

export enum FileUploadStrings {
  FileRejected = 'File type not accepted or too many, try again!',
  DragOrClickToUpload = 'Drag a file or click here to upload.',
  Uploading = 'Upload is in progress',
  UploadTimeout = 'Upload failed, please try again.',
  UploadFinished = 'Done!',
}

export type UploadStatusProps = HTMLProps<HTMLElement> & {
  status: FileUploadStatus;
  selectedFile?: string;
};

// Controls the time spent on file upload
const MaxTimeout:number = 10000;

export type FileUploadPickerUI = {
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

export type FileUploadProps = {
  fieldApi: FieldApi;
  ui?: Partial<FileUploadPickerUI>;
  accept?: string | string[];
};

const errorLog = debug('fileUpload');

const DefaultUploadStatus = ({ status, selectedFile }: UploadStatusProps) => {
  let statusText;
  switch (status) {
    case FileUploadStatus.FileAccepted:
      statusText = `File "${selectedFile}" selected`;
      break;
    case FileUploadStatus.FileRejected:
      statusText = FileUploadStrings.FileRejected;
      break;
    default:
      statusText = '';
  }
  return (
    <div>{statusText}</div>
  );
};

const defaultFileUploadUI = {
  MasterWrapper: 'section',
  Wrapper: 'div',
  Input: 'input',
  UploadArea: () => <div>{`${FileUploadStrings.DragOrClickToUpload}`}</div>,
  Uploading: () => <div>{`${FileUploadStrings.Uploading}`}</div>,
  DragRejected: () => <div>{`${FileUploadStrings.FileRejected}`}</div>,
  UploadTimeout: () => <div>{`${FileUploadStrings.UploadTimeout}`}</div>,
  UploadFinished: () => <div>{`${FileUploadStrings.UploadFinished}`}</div>,
  UploadStatus: DefaultUploadStatus,
};

export const FileUpload: CT<FileUploadProps> = ({ fieldApi, ui = {}, accept }: FileUploadProps) => {
  const [status, setStatus] = useState(FileUploadStatus.Initial);
  const [selectedFile, setSelectedFile] = useState('');
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
            fieldApi.setError('Timeout exceeded');
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

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    // when no files are accepted by the react-dropzone
    // when a file is accepted and other files are rejected
    // then we reject
    if (
      acceptedFiles.length < 1
      || (acceptedFiles.length + rejectedFiles.length) > 1
    ) {
      setStatus(FileUploadStatus.FileRejected);
      setSelectedFile('');
      return;
    }
    setIsUploading(true);
    setIsUploadFinished(false);
    setIsUploadingTimeout(false);
    setStatus(FileUploadStatus.FileAccepted);
    setSelectedFile(acceptedFiles[0].name);
    fieldApi.setError(FileUploadStrings.Uploading);
    saveRequest.saveFile({
      file: acceptedFiles[0],
      nodePath: node.path.join('$'),
      baseResourcePath: node.baseResourcePath,
    })
      .then(({ data }) => {
        // unset errors
        fieldApi.setError(undefined);
        fieldApi.setValue(data.filesPath[0]);
        setIsUploading(false);
        setIsUploadingTimeout(false);
        setIsUploadFinished(true);
      })
      .catch(errorLog);
  }, []);

  const { getRootProps, getInputProps, isDragReject } = useDropzone({
    onDrop,
    accept,
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
    ...defaultFileUploadUI,
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
        <UploadStatus status={status} selectedFile={selectedFile} />
      </Wrapper>
    </MasterWrapper>
  );
};
