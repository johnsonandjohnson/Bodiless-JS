import { asTokenSpec } from '../../../asTokenSpec';

const Bold = asTokenSpec()('font-bold');
const Underline = asTokenSpec()('underline');
const Italic = asTokenSpec()('italic');
const SuperScript = asTokenSpec()('align-baseline');
const Link = asTokenSpec()('text-blue-400', Underline);
const H1 = asTokenSpec()('text-3xl', Bold);
const H2 = asTokenSpec()('text-2xl', Bold);
const H3 = asTokenSpec()('text-xl');

export default {
  Bold,
  Underline,
  Italic,
  Link,
  SuperScript,
  H1,
  H2,
  H3,
};
