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

import {
  HTMLProps,
  ComponentType as CT,
} from 'react';
import type { FieldApi } from 'informed';

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
  UploadDisabled = 'File upload is disabled in this environment',
}

export type UploadStatusProps = HTMLProps<HTMLElement> & {
  status: FileUploadStatus;
  selectedFile?: string;
};

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
