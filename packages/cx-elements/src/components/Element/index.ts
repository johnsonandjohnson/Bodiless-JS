import { cxColor, cxColorStatic } from './Color';
import { cxFontSize, cxFontSizeStatic } from './FontSize';
import { cxTextDecoration, cxTextDecorationStatic } from './TextDecoration';
import { cxTypography, cxTypographyStatic } from './Typography';

const cxElement = {
  ...cxColor,
  ...cxFontSize,
  ...cxTextDecoration,
  ...cxTypography,
};

const cxElementStatic = {
  ...cxColorStatic,
  ...cxFontSizeStatic,
  ...cxTextDecorationStatic,
  ...cxTypographyStatic,
};

export {
  cxElement, cxElementStatic,
  cxFontSize, cxFontSizeStatic,
  cxColor, cxColorStatic,
  cxTextDecoration, cxTextDecorationStatic,
};
