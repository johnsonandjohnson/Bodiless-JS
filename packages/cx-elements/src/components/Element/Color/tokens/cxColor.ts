import { asTokenGroup } from '../../../../util';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['Color'],
  },
};

export default asTokenGroup(meta)({
  BgPrimaryBrand: 'bg-cx-primary-brand',
  TextPrimaryBrand: 'text-cx-primary-brand',
  BgPrimaryCard: 'bg-cx-primary-card-bg',
  BgPrimaryPage: 'bg-cx-primary-page-bg',
  BgPrimaryInteractive: 'bg-cx-primary-interactive',
  TextPrimaryInteractive: 'text-cx-primary-interactive hover:opacity-70 active:text-cx-primary-interactive-active',
  WithTextPrimaryInteractiveDisabled: 'text-opacity-60',
  BgPrimaryDivider: 'bg-cx-primary-divider',
  TextPrimaryDivider: 'text-cx-primary-divider',
  TextPrimaryBodyCopy: 'text-cx-primary-body-copy',
  TextPrimaryHeaderCopy: 'text-cx-primary-header-copy',
  BgSecondaryFooter: 'bg-cx-secondary-footer-bg',
  TextSecondaryEyebrow: 'text-cx-secondary-eyebrow',
});
