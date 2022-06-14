import { asCardToken, vitalCardBase } from '@bodiless/vital-card';

const Hero = asCardToken(
  vitalCardBase.HeroBase,
  vitalCardBase.WithHorizontalContentCentered,
  vitalCardBase.WithHorizontalLeftOrientation,
  vitalCardBase.WithPrimaryButton
);

export default {
  ...vitalCardBase,
  Hero,
};
