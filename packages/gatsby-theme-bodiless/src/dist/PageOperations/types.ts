import {
  ComponentType,
  HTMLProps,
} from 'react';
import { AxiosPromise } from 'axios';

const DEFAULT_PAGE_TEMPLATE = '_default';

enum PageState {
  Init,
  Pending,
  Complete,
  Errored,
}

type PageStatus = {
  status: PageState;
  pagePath?: string;
  errorMessage?: string;
  completeMessage?: string;
  titlePending?: string;
  formTitle?: string,
  linkId?: string,
  FormFields?: (Label: ComponentType<HTMLProps<HTMLLabelElement>>) => void,
};

type Client = {
  savePage: (path: string, template?: string) => AxiosPromise<any>;
};

export {
  DEFAULT_PAGE_TEMPLATE,
  PageState,
  PageStatus,
  Client,
};
