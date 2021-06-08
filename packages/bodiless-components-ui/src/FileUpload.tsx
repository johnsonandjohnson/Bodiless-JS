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

import React, { ComponentType } from 'react';
import { flowRight } from 'lodash';
import { FileUploadStatus, FileUploadStrings } from '@bodiless/components';
import type { UploadStatusProps } from '@bodiless/components';
import type { HOC } from '@bodiless/fclasses';
import {
  addClasses,
  stylable,
  Section,
} from '@bodiless/fclasses';
import { Spinner } from '@bodiless/ui';
import MaterialIcon from '@material/react-material-icon';
import merge from 'lodash/merge';

const withForwardedRefStart = (Component: ComponentType<any>) => {
  const WithForwardedRefStart = React.forwardRef((props, ref) => (
    <Component forwardedRef={ref} {...props} />
  ));
  WithForwardedRefStart.displayName = 'WithForwardedRefStart';
  return WithForwardedRefStart;
};

const withForwardedRefEnd = (Component: ComponentType<any>) => {
  const WithForwardedRefEnd = ({ forwardedRef, ...rest }: any) => (
    <Component {...rest} ref={forwardedRef} />
  );
  WithForwardedRefEnd.displayName = 'WithForwardedRefEnd';
  return WithForwardedRefEnd;
};

// Allows to pass a ref through a component to one of its children.
// @see: https://reactjs.org/docs/forwarding-refs.html
const withForwardedRef = (...hocs: HOC[]) => flowRight(
  withForwardedRefStart,
  ...hocs,
  withForwardedRefEnd,
);

const MasterWrapper = addClasses('bl-container')(Section);

const Wrapper = flowRight(
  withForwardedRef(
    addClasses(
      'bl-min-h-grid-16 bl-border bl-border-dashed bl-border-gray-800 bl-bg-gray-100 bl-p-grid-3 bl-mb-grid-3 bl-text-black',
    ),
    stylable,
  ),
)('div');

const Input = withForwardedRef()('input');

const UploadArea = () => (
  <div className="bl-font-bold bl-text-base bl-text-center">
    {`${FileUploadStrings.DragOrClickToUpload}`}
    <MaterialIcon className="bl-w-full" icon="cloud_upload" />
  </div>
);
const DragRejected = () => (
  <div className="bl-text-red">{`${FileUploadStrings.FileRejected}`}</div>
);
const UploadTimeout = () => (
  <div className="bl-text-red">{`${FileUploadStrings.UploadTimeout}`}</div>
);
const Uploading = () => <Spinner color="bl-bg-gray-800 bl-my-4" />;
const UploadFinished = () => (
  <div className="bl-text-center bl-text-lg bl-text-black">{`${FileUploadStrings.UploadFinished}`}</div>
);

const truncateFileName = (file: string, length: number) => {
  if (file.length <= length) return file;
  const ellipsis = '...';
  const ext = file.split('.').pop();
  const filename = file.split('.').slice(0, -1).join('.');
  const reducedFileNameLength = length - ellipsis.length - (ext ? ext.length + 1 : 0);
  const midPoint = Math.ceil(reducedFileNameLength / 2);
  const reducedFileName = filename.substr(0, midPoint)
    + ellipsis
    + filename.substr(filename.length - midPoint);
  return reducedFileName + (ext ? `.${ext}` : '');
};

const UPLOAD_STATUS_MAX_FILENAME_LENGTH = 30;

const UploadStatus = ({ status, selectedFile }: UploadStatusProps) => {
  let statusText;
  const selectedFile$ = selectedFile ? truncateFileName(selectedFile, UPLOAD_STATUS_MAX_FILENAME_LENGTH) : '';
  switch (status) {
    case FileUploadStatus.FileAccepted:
      statusText = `File "${selectedFile$}" selected`;
      break;
    case FileUploadStatus.FileRejected:
      statusText = FileUploadStrings.FileRejected;
      break;
    default:
      statusText = '';
  }
  return (
    <div className="bl-overflow-clip bl-overflow-hidden">{statusText}</div>
  );
};

const fileUploadUI = {
  MasterWrapper,
  Wrapper,
  Input,
  UploadArea,
  Uploading,
  DragRejected,
  UploadTimeout,
  UploadFinished,
  UploadStatus,
};

type UI = { [key: string]: object };
const withUI = <P extends UI>(ui: UI) => (
  Component: ComponentType<P>,
) => ({ ui: uiFromProp, ...rest }: P) => {
  // disable rerendering on ui prop change
  const ui$ = React.useMemo(() => merge({}, ui, uiFromProp), []);
  return <Component {...rest as P} ui={ui$} />;
};

export {
  fileUploadUI,
  withUI,
  truncateFileName,
};
