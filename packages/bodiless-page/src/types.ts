/**
 * Copyright © 2022 Johnson & Johnson
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
  ComponentType,
  HTMLProps,
  ReactNode,
} from 'react';
import { AxiosPromise } from 'axios';
import type {
  FieldProps as BaseFieldProps,
} from 'informed';

enum PageStatus {
  Init,
  Pending,
  Complete,
  Errored,
}

type PageState = {
  status: PageStatus;
  pagePath?: string;
  errorMessage?: string;
  completeMessage?: string;
  titlePending?: string;
  formTitle?: string,
  linkId?: string,
  isRedirectActive?: boolean,
  FormFields?: (Label: ComponentType<HTMLProps<HTMLLabelElement>>) => ReactNode,
};

type PageMenuOptions = {
  name: string,
  icon: string,
  label: string,
  isDisabled: boolean,
  isHidden: boolean,
  handler: () => any,
};

type PageClient = {
  clonePage: (origin: string, destination: string) => AxiosPromise<any>;
  deletePage: (path: string) => AxiosPromise<any>;
  movePage: (origin: string, destination: string) => AxiosPromise<any>;
  savePage: (path: string, template?: string) => AxiosPromise<any>;
};

type PageProps = {
  pagePath: string;
  retries?: number;
};

/**
 * props that can be passed to PageURLField
 * disallow overriding field prop
 * if we decide to allow overriding it in the future
 * then also we need to allow overriding the second PageURLField input
 */
type CustomFieldProps = {
  fieldFull?: boolean,
  fieldLabel?: string,
  required?: boolean,
  simpleValidation?: boolean,
};
type FieldProps = Omit<BaseFieldProps<any>, 'name'> & CustomFieldProps;
type FieldValidate = (value: unknown) => Record<string, unknown>;

type PageDataContextProps = {
  pagePath: string,
  subPageTemplate: string,
  template: string,
};

type PageDataContextProviderProps = {
  pageData: PageDataContextProps,
};

export {
  CustomFieldProps,
  PageClient,
  PageProps,
  PageMenuOptions,
  PageStatus,
  PageState,
  FieldProps,
  FieldValidate,
  PageDataContextProps,
  PageDataContextProviderProps,
};
