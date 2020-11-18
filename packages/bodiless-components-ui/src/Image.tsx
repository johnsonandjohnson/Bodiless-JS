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

import React, { ComponentType } from 'react';
import { flowRight } from 'lodash';
import { withoutProps } from '@bodiless/core';
import { asBodilessImage as asBaseBodilessImage } from '@bodiless/components';
import type { TImagePickerUI, AsBodilessImage } from '@bodiless/components';
import {
  addClasses,
  addProps,
  stylable,
  Img,
  Section,
} from '@bodiless/fclasses';
import { Spinner } from '@bodiless/ui';
import MaterialIcon from '@material/react-material-icon';

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

type HOC = (Component: ComponentType<any>) => ComponentType<any>;

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
      'bl-min-h-grid-16 bl-border bl-border-dashed bl-border-grey-800 bl-bg-grey-100 bl-p-grid-3 bl-mb-grid-3 bl-text-black',
    ),
    stylable,
  ),
)('div');

const Input = withForwardedRef()('input');

const UploadArea = () => (
  <div className="bl-font-bold bl-text-base bl-text-center">
    Drag a file or click here to upload.
    <MaterialIcon className="bl-w-full" icon="cloud_upload" />
  </div>
);
const DragRejected = () => (
  <div className="bl-text-red">File type not accepted or too many, try again!</div>
);
const UploadTimeout = () => (
  <div className="bl-text-red">Upload failed, please try again.</div>
);
const Uploading = () => <Spinner color="bl-bg-grey-800 bl-my-4" />;
const UploadFinished = () => <div className="bl-text-center bl-text-lg bl-text-black">Done!</div>;
const UploadStatus = ({ statusText } : { statusText: string; }) => <div>{statusText}</div>;

const imagePickerUI = {
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

const withUI = (ui: TImagePickerUI) => addProps({ ui });

const asBodilessImage:AsBodilessImage = (nodeKey, defaultData, useOverrides) => flowRight(
  withUI(imagePickerUI),
  asBaseBodilessImage(nodeKey, defaultData, useOverrides),
  withoutProps(['ui']),
);

const Image = asBodilessImage()(Img);

export default Image;
export {
  asBodilessImage,
};
