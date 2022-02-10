import {
  ComponentType,
  HTMLProps,
} from 'react';
import { AxiosPromise } from 'axios';
import type {
  BaseFieldProps,
  FormValue,
  FormValues,
  FormError,
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
  FormFields?: (Label: ComponentType<HTMLProps<HTMLLabelElement>>) => void,
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
  deletePage: (path: string) => AxiosPromise<any>;
  movePage: (origin: string, destination: string) => AxiosPromise<any>;
  savePage: (path: string, template?: string) => AxiosPromise<any>;
};

type PageData = {
  pagePath: string;
  retries?: number;
};

/**
 * props that can be passed to PageURLField
 * disallow overriding field prop
 * if we decide to allow overriding it in the future
 * then also we need to allow overriding the second PageURLField input
 */
type FieldLabel = {
  fieldFull?: boolean,
  fieldLabel?: string,
};
type FieldProps = Omit<BaseFieldProps, 'field'> & FieldLabel;
type FieldValidate = (value: FormValue, values: FormValues) => FormError;

export {
  PageClient,
  PageData,
  PageMenuOptions,
  PageStatus,
  PageState,
  FieldProps,
  FieldValidate,
};
