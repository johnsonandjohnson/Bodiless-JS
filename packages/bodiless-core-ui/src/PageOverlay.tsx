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

import React from 'react';
import ReactDOM from 'react-dom';
import { flow } from 'lodash';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import {
  removeClasses,
} from '@bodiless/fclasses';
import { Spinner, ComponentFormCloseButton } from '@bodiless/ui';

type overlaySettings = {
  isActive?: boolean,
  isManageable?: boolean,
  hasSpinner?: boolean,
  maxTimeout?: number | null,
  message?: string,
};

export const overlayStore = observable({
  isActive: false,
  isManageable: false,
  hasSpinner: true,
  message: '',
});

export const showOverlay = ({
  message = '',
  hasSpinner = true,
  isManageable = false,
  maxTimeout = null,
}: overlaySettings = {
  message: '',
  hasSpinner: true,
  isManageable: false,
  maxTimeout: null,
}) => {
  overlayStore.isActive = true;
  overlayStore.message = message;
  overlayStore.isManageable = isManageable;
  overlayStore.hasSpinner = hasSpinner;
  if (maxTimeout) {
    setTimeout(() => {
      overlayStore.message = 'The operation has timed out';
      overlayStore.hasSpinner = false;
      overlayStore.isManageable = true;
    }, maxTimeout * 1000);
  }
};

export const Wrapper = {
  showOverlay,
};

export const hideOverlay = () => {
  overlayStore.isActive = false;
};

const OverlayCloseButton = flow(
  removeClasses('bl-float-right'),
)(ComponentFormCloseButton);

export const OverlayUI = ({ message, isManageable, hasSpinner }: overlaySettings) => (
  <div
    id="overlay"
    className="bl-bg-black bl-opacity-75
      bl-w-full bl-h-full bl-fixed bl-top-0 bl-z-50 flex flex-col justify-around items-center"
  >
    {hasSpinner && <div><Spinner color="bl-bg-white" /></div>}
    {message && <h1 style={{ color: 'white', fontSize: '30px' }}>{message}</h1>}
    {isManageable && <OverlayCloseButton onClick={() => hideOverlay()} />}
  </div>
);

export const OverlayPortal = observer(({ store }) => {
  const root = typeof window !== 'undefined' ? window.document.body : null;
  return store.isActive
  && root
  && ReactDOM.createPortal(
    <OverlayUI
      message={store.message}
      isManageable={store.isManageable}
      hasSpinner={store.hasSpinner}
    />,
    root,
  );
});

export const Overlay = () => (
  <OverlayPortal store={overlayStore} />
);

export default Overlay;
