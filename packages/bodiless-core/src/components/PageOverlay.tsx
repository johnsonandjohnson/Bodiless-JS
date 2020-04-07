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
import { observer } from 'mobx-react';
import { useEditContext } from '../hooks';
import { TOverlaySettings } from '../Types/PageOverlayTypes';

type FullUI = {
  OverlayWrapper: ComponentType<HTMLProps<HTMLDivElement>> | string,
  PopupWrapper: ComponentType<HTMLProps<HTMLDivElement>> | string,
  Button: ComponentType<HTMLProps<HTMLButtonElement>> | string,
  Spinner: ComponentType<HTMLProps<HTMLDivElement>> | string,
  Message: ComponentType<HTMLProps<HTMLDivElement>> | string,
};

const defaultUI: FullUI = {
  OverlayWrapper: 'div',
  PopupWrapper: 'div',
  Button: 'button',
  Spinner: 'div',
  Message: 'div',
};

export type UI = Partial<FullUI>;

const getUI = (ui: UI) => ({ ...defaultUI, ...ui });

export const Overlay = ({ settings, ui }: { settings: TOverlaySettings, ui: FullUI }) => {
  const {
    OverlayWrapper, PopupWrapper, Button, Spinner, Message,
  } = ui;
  const {
    message, hasCloseButton, hasSpinner, onClose,
  } = settings;
  const context = useEditContext();

  const CloseButton = (props: any) => (
    <Button
      onClick={() => {
        context.hidePageOverlay();
        if (onClose) {
          onClose();
        }
      }}
      {...props}
    />
  );

  const Elements = () => (
    <>
      {hasCloseButton && <CloseButton />}
      {hasSpinner && <Spinner />}
      <Message>{message}</Message>
    </>
  );

  const WrappedElements = () => (
    <PopupWrapper>
      <Elements />
    </PopupWrapper>
  );

  return (
    <OverlayWrapper>
      {hasCloseButton ? <WrappedElements /> : <Elements />}
    </OverlayWrapper>
  );
};

export const OverlayPortal = observer(({ store, ui }) => {
  const root = typeof window !== 'undefined' ? window.document.body : null;
  return store.data.isActive
  && root
  && ReactDOM.createPortal(
    <Overlay settings={{ ...store.data }} ui={ui} />,
    root,
  );
});

const PageOverlay = ({ ui }: {ui: UI}) => {
  const uiWithDefaults = getUI(ui);
  const { pageOverlay: pageOverlayStore } = useEditContext();
  return <OverlayPortal store={pageOverlayStore} ui={uiWithDefaults} />;
};

export default PageOverlay;
