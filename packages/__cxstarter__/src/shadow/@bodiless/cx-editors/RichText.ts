import { asFluidToken } from '@bodiless/cx-elements';
import { cxRichTextBase } from '@bodiless/cx-editors';
import { addProps } from '@bodiless/fclasses';

const Default = asFluidToken({
  ...cxRichTextBase.Default,
  Compose: {
    ...(cxRichTextBase.Default.Compose || {}),
    WithShadowedBy: addProps({ 'data-shadowed-by': '@bodiless/__cxstarter__' }),
  },
  // Demonstrates how to remove a component from the default editor.
  // Core: {
  //   ...omit(cxRichTextBase.Default.Core, 'H1'),
  // },
  // Components: {
  //   ...omit(cxRichTextBase.Default.Components, 'H1'),
  // },
});

export default {
  ...cxRichTextBase,
  Default,
};
