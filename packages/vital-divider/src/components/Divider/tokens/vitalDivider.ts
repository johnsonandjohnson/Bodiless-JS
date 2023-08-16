import { asDividerToken } from '../DividerClean';
import type { VitalDividers } from '../types';
import { vitalDividerElement } from '@bodiless/vital-elements';
import { as, flowHoc } from '@bodiless/fclasses';

const Base = asDividerToken({
  Spacing: {
    Divider: as('border-1px border-solid')
  }
});

const WithPrimaryDivider = asDividerToken({
  Spacing: {
    Divider: as(vitalDividerElement.LightThemePrimary)
  }
});

const WithSecondaryDivider = asDividerToken({
  Theme: {
    Divider: as(vitalDividerElement.LightThemeSecondary)
  }
});

const WithVerticalOrientation = asDividerToken({
  Spacing: {
    Divider: 'rotate-90 h-0px',
  },
  Meta: flowHoc.meta.term('Orientation')('Vertical'),
});

// Add additional variant tokens or variators here.
// ...

/**
 * Tokens for DividerClean
 *
 * @category Token Collection
 * @see [[VitalDividers]]
 * @see [[DividerClean]]
 */
const vitalDividers: VitalDividers = {
  Base,
  WithPrimaryDivider,
  WithSecondaryDivider,
  WithVerticalOrientation
};

export default vitalDividers;
