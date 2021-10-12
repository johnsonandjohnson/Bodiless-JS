import { AxiosPromise } from 'axios';

export const DEFAULT_PAGE_TEMPLATE = '_default';

export enum PageState {
  Init,
  Pending,
  Complete,
  Errored,
}

export type PageStatus = {
  status: PageState;
  pagePath?: string;
  errorMessage?: string;
};

export type Client = {
  savePage: (path: string, template?: string) => AxiosPromise<any>;
};
