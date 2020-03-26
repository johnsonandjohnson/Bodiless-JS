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

import React, { ComponentType, HTMLProps } from 'react';
import ReactDOM from 'react-dom';
import { flow } from 'lodash';
import { observer } from 'mobx-react';
import { useEditContext } from '@bodiless/core';

import {
  removeClasses, addProps,
} from '@bodiless/fclasses';
import { Spinner, ComponentFormCloseButton } from '@bodiless/ui';

type OverlaySettings = {
  isActive?: boolean,
  hasCloseButton?: boolean,
  hasSpinner?: boolean,
  maxTimeoutInSeconds?: number | null,
  message?: string,
  onClose?: any,
};

type OverlayProps = {
  ui: {
    OvSpinner: ComponentType<HTMLProps<HTMLDivElement>>,
    OvCloseButton: ComponentType<HTMLProps<HTMLDivElement>>,
  },
  settings: OverlaySettings,
};

const DefaultSpinner = () => <Spinner color="bl-bg-white" />;

const DefaultCloseButton = (props: any) => {
  const context = useEditContext();
  const Button = flow(
    addProps({
      onClick: () => {
        context.hidePageOverlay();
        props.onClick();
      },
    }),
    removeClasses('bl-float-right'),
  )(ComponentFormCloseButton);
  return <Button />;
};

export const Overlay = ({ ui, settings }: OverlayProps) => {
  const { OvSpinner, OvCloseButton } = ui;
  const { message, hasCloseButton, hasSpinner } = settings;
  return (
    <div
      id="overlay"
      style={{
        backgroundColor: '#000000bf',
      }}
      className="bl-p-20 bl-py-10 bl-w-full bl-h-full bl-fixed bl-top-0 bl-z-50
        bl-flex bl-flex-col bl-justify-center bl-items-center"
    >
      <div
        className={`bl-p-5 bl-rounded ${hasCloseButton && 'bl-bg-black'}`}
      >
        {hasCloseButton && (
          <div className="bl-flex bl-pb-5 bl-justify-end bl-w-full">
            <OvCloseButton onClick={() => { settings.onClose(); }} />
          </div>
        )}
        {hasSpinner && (
          <div className="h-15">
            <OvSpinner />
          </div>
        )}
        {message && (
          <h1 className="bl-text-gray-100 bl-text-center bl-text-2xl bl-whitespace-pre-line">
            {message}
          </h1>
        )}
      </div>
    </div>
  );
};

export const OverlayPortal = observer(({ store }) => {
  const root = typeof window !== 'undefined' ? window.document.body : null;
  return store.data.isActive
  && root
  && ReactDOM.createPortal(
    <Overlay
      ui={{
        OvSpinner: DefaultSpinner,
        OvCloseButton: DefaultCloseButton,
      }}
      settings={{ ...store.data }}
    />,
    root,
  );
});

export const PageOverlay = () => {
  const pageOverlayStore = useEditContext().pageOverlay;
  return <OverlayPortal store={pageOverlayStore} />;
};

export default PageOverlay;
