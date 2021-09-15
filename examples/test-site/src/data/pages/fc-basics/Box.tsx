import { asToken, addClasses } from '@bodiless/fclasses';

export const asBox = asToken(
  addClasses('w-full h-36'),
  asToken.meta.term('Component')('Box'),
  asToken.meta.term('Attribute')('Styles'),
  asToken.meta.term('Type')('Box'),
);

export const withBlueBorder = asToken(
  addClasses('border-blue-800 border-8'),
  asToken.meta.term('Color')('Blue-Border'),
  asToken.meta.term('Attribute')('border'),
);

export const withTealBorder = asToken(
  addClasses('border-teal-800 border-8'),
  asToken.meta.term('Color')('Teal-Border'),
  asToken.meta.term('Attribute')('border'),
);

export const asRounded = asToken(
  addClasses('rounded-2xl'),
  asToken.meta.term('Border')('Rounded'),
  asToken.meta.term('Attribute')('border-radius'),
);

export const asSquare = asToken(
  asToken.meta.term('Border')('Square'),
);

export const asBlue = asToken(
  addClasses('bg-blue-800'),
  asToken.meta.term('Color')('Blue'),
  asToken.meta.term('Attribute')('bg-color'),
);
export const asOrange = asToken(
  addClasses('bg-orange-800'),
  asToken.meta.term('Color')('Orange'),
  asToken.meta.term('Attribute')('bg-color'),
);
export const asTeal = asToken(
  addClasses('bg-teal-800'),
  asToken.meta.term('Color')('Teal'),
  asToken.meta.term('Attribute')('bg-color'),
);
