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
