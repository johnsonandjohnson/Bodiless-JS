import { asElementToken } from '@bodiless/cx-elements';
import { cxPage } from '@bodiless/cx-templates';

const Default = asElementToken({
  ...cxPage.Default,
});

export default {
  ...cxPage,
  Default,
};
