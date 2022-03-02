import { cxElementLayout } from './layout.token';
import { cxElementTypography } from './typography.token';
import { cxElementColor } from './color.token';

export { cxElementTypography } from './typography.token';
export { cxElementLayout } from './layout.token';

export const cxElement = {
  ...cxElementTypography,
  ...cxElementLayout,
  ...cxElementColor,
};
