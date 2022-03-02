import { flowHoc, addClasses } from '@bodiless/fclasses';

export const asBox = flowHoc(
  addClasses('w-full h-36'),
  flowHoc.meta.term('Component')('Box'),
  flowHoc.meta.term('Attribute')('Styles'),
  flowHoc.meta.term('Type')('Box'),
);

export const withBlueBorder = flowHoc(
  addClasses('border-blue-800 border-8'),
  flowHoc.meta.term('Color')('Blue-Border'),
  flowHoc.meta.term('Attribute')('border'),
);

export const withTealBorder = flowHoc(
  addClasses('border-teal-800 border-8'),
  flowHoc.meta.term('Color')('Teal-Border'),
  flowHoc.meta.term('Attribute')('border'),
);

export const asRounded = flowHoc(
  addClasses('rounded-2xl'),
  flowHoc.meta.term('Border')('Rounded'),
  flowHoc.meta.term('Attribute')('border-radius'),
);

export const asSquare = flowHoc(
  flowHoc.meta.term('Border')('Square'),
);

export const asBlue = flowHoc(
  addClasses('bg-blue-800'),
  flowHoc.meta.term('Color')('Blue'),
  flowHoc.meta.term('Attribute')('bg-color'),
);
export const asOrange = flowHoc(
  addClasses('bg-orange-800'),
  flowHoc.meta.term('Color')('Orange'),
  flowHoc.meta.term('Attribute')('bg-color'),
);
export const asTeal = flowHoc(
  addClasses('bg-teal-800'),
  flowHoc.meta.term('Color')('Teal'),
  flowHoc.meta.term('Attribute')('bg-color'),
);
