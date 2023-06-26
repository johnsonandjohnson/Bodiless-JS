import { asElementToken } from '@bodiless/vital-elements';

/**
 * Element tokens can be divided into domains to make them
 * easier to extend or selectively override.
 */
const Fancy = asElementToken({
  Core: {
    _: 'border-2 rounded-lg',
  },
  Spacing: {
    _: 'p-2',
  },
});

const Blue = asElementToken({
  Theme: {
    _: 'border-blue-600',
  },
});

const Red = asElementToken({
  Theme: {
    _: 'border-red-600',
  },
});

export default {
  Fancy, Red, Blue,
};
