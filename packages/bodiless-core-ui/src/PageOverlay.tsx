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

import React from 'react';
import { flow } from 'lodash';

import { Div, Spinner, ComponentFormCloseButton } from '@bodiless/ui';
import { PageOverlay as CleanPageOverlay } from '@bodiless/core';
import { addClasses, removeClasses, addProps } from '@bodiless/fclasses';

const OverlayWrapper = flow(
  addClasses([
    'bl-p-20', 'bl-py-10', 'bl-w-full', 'bl-h-full', 'bl-fixed', 'bl-top-0', 'bl-z-max',
    'bl-flex', 'bl-flex-col', 'bl-justify-center', 'bl-items-center', 'bl-bg-black-transparent',
  ]),
  addProps({
    id: 'page-overlay',
  }),
)(Div);

const PopupWrapper = addClasses('bl-p-5 bl-rounded bl-bg-black')(Div);

type ButtonProps = {
  onClick: () => void,
};

const Button = (props: ButtonProps) => {
  const ButtonWrapper = addClasses('bl-flex bl-pb-5 bl-justify-end bl-w-full')(Div);
  const ButtonEl = removeClasses('bl-float-right')(ComponentFormCloseButton);
  return (
    <ButtonWrapper>
      <ButtonEl {...props} />
    </ButtonWrapper>
  );
};

const WrappedSpinner = () => {
  const SpinnerWrapper = addClasses('h-20')(Div);
  return <SpinnerWrapper><Spinner color="bl-bg-white" /></SpinnerWrapper>;
};

const Message = addClasses([
  'bl-text-gray-100 bl-text-center bl-text-lg bl-whitespace-pre-line clear-right',
])(Div);

const ui = {
  OverlayWrapper,
  PopupWrapper,
  Button,
  Spinner: WrappedSpinner,
  Message,
};

const PageOverlay = (props: any) => <CleanPageOverlay ui={ui} {...props} />;

export default PageOverlay;
