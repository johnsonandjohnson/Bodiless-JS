import { vitalDividerElement } from '@bodiless/vital-elements';
import { flowHoc } from '@bodiless/fclasses';
import { asDividerToken } from '../DividerClean';
import type { VitalDividers } from '../types';

const Base = asDividerToken({
  Spacing: {
    Divider: 'border-1px border-solid'
  }
});

const WithPrimaryDivider = asDividerToken({
  Spacing: {
    Divider: vitalDividerElement.LightThemePrimary
  }
});

const WithSecondaryDivider = asDividerToken({
  Theme: {
    Divider: vitalDividerElement.LightThemeSecondary
  }
});

const WithVerticalOrientation = asDividerToken({
  Spacing: {
    Divider: 'w-1px h-32px',
  },
  Meta: flowHoc.meta.term('Orientation')('Vertical'),
});

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
