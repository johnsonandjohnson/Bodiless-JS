import { asTokenGroup, vitalColorBase} from '@bodiless/vital-elements';

// Error: @sites/bodiless-demo: export 'ColorMeta' (reexported as 'ColorMeta') was not
// found in './tokens'
// thus redeclaring ColorMeta
export const ColorMeta = {
  categories: {
    Type: ['Element'],
    Group: ['Color'],
  },
};

const OverrideColors = asTokenGroup(ColorMeta)({
  ...vitalColorBase,
  BgPrimaryInteractive: 'bg-demo-primary-interactive',
  BorderPrimaryInteractive: 'border-demo-primary-interactive',
  TextPrimaryInteractive: 'text-demo-primary-interactive hover:opacity-70 active:text-demo-primary-interactive-active',
  TextPrimaryInteractiveNoHover: 'text-demo-primary-interactive active:text-demo-primary-interactive-active',
  TextPrimaryInteractiveHover: 'hover:text-demo-primary-interactive',
  BgSecondaryFooter: 'bg-demo-primary-interactive shadowed-bgsecondaryfooter-class',
});

export default OverrideColors;
