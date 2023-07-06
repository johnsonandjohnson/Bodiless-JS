import { asElementToken } from '@bodiless/vital-elements';

/// [simple-token]
/*
 * Below, we craft a simple element token that will apply a 40px, bottom-right
 * border radius to any component on which the token is applied.
 */
const Simple = asElementToken({
  Theme: {
    _: 'rounded-bl-[40px]',
  },
});
/// [simple-token]

/// [fancy-token]
/*
 * Here, we craft a second reusable element token that will apply the more
 * complex CSS rules previously added to the Tailwind configuration file.
 */
const Fancy = asElementToken({
  Theme: {
    _: 'card-corner md:card-corner-md lg:card-corner-lg',
  },
});
/// [fancy-token]

export default {
  Simple,
  Fancy,
};
