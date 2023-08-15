export type BreadcrumbItemTitle = {
  // ToDo: Remove it, there is no need to store it here
  data: string | object;
  nodePath: string;
};

export type BreadcrumbItemLink = {
  data: string ;
  nodePath: string;
};

export type BreadcrumbItemSettings = {
  uuid: string;
  parent?: BreadcrumbItemType;
  title: BreadcrumbItemTitle;
  link: BreadcrumbItemLink;
  store: BreadcrumbStoreType;
};

export type BreadcrumbItemType = {
  setTitle: (title: BreadcrumbItemTitle) => void,
  setLink: (link: BreadcrumbItemLink) => void,
  uuid: string,
  title: BreadcrumbItemTitle;
  link: BreadcrumbItemLink;
  isSubpathOf: (item: BreadcrumbItemType | string) => boolean;
  hasPath: (item: BreadcrumbItemType | string) => boolean;
  isAncestorOf: (item: BreadcrumbItemType) => boolean;
  isDescendantOf: (item: BreadcrumbItemType) => boolean;
  isEqual: (item: BreadcrumbItemType | string) => boolean;
  isFirst: () => boolean;
  isLast: () => boolean;
  isActive: () => boolean;
  getAncestors: () => BreadcrumbItemType[];
  parent: BreadcrumbItemType | undefined;
};

export type BreadcrumbStoreType = {
  getItem: (key: string) => BreadcrumbItemType | undefined;
  setItem: (item: BreadcrumbItemType) => BreadcrumbItemType | undefined;
  deleteItem: (item: BreadcrumbItemType | string) => boolean;
  getPagePath: () => string;
  breadcrumbTrail: BreadcrumbItemType[];
  export: () => BreadcrumbItemType[];
  hasCurrentPageItem: () => boolean;
};
