import { asTokenGroup, TextDecorationMeta } from '@bodiless/vital-elements';
import { vitalTextDecorationBase } from '@bodiless/vital-elements/src/base';

/**
 * Here we use `asTokenGroup` to share the `TextDecorationMeta` among all
 * tokens exported.
 */
export default asTokenGroup(TextDecorationMeta)({
  ...vitalTextDecorationBase,
  Bold: 'font-black',
});
