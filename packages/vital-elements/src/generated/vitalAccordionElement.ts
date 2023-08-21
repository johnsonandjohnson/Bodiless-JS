import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['AccordionElement'],
  },
};

export default asTokenGroup(meta)({
  DropdownTextBody: vitalColor.TextDarkBase,
  BorderBorder: vitalColor.BorderDarkBase,
  LabelBackgroundBackground: vitalColor.BackgroundBase,
  LabelTextLabel: vitalColor.TextDarkBase,
  DropdownBackgroundBackground: vitalColor.BackgroundAlt6,
  DropdownBorderRadiusActiveBottomRight: 'rounded-br-0px',
  DropdownBorderRadiusActiveTopRight: 'rounded-tr-0px',
  DropdownTextDarkThemeBody: vitalColor.TextLightBase,
  DropdownTextLightThemeBody: vitalColor.TextDarkBase,
  DropdownBackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  BorderLightThemeBorder: vitalColor.BorderDarkBase,
  LabelBorderRadiusActiveTopRight: 'rounded-tr-0px',
  LabelBorderRadiusActiveTopLeft: 'rounded-tl-0px',
  LabelBorderRadiusIdleBottomLeft: 'rounded-bl-0px',
  LabelBorderRadiusIdleBottomRight: 'rounded-br-0px',
  DropdownBorderRadiusActiveBottomLeft: 'rounded-bl-0px',
  LabelBackgroundLightThemeBackground: vitalColor.BackgroundBase,
  LabelTextDarkThemeLabel: vitalColor.TextLightBase,
  LabelTextLightThemeLabel: vitalColor.TextDarkBase,
  LabelBorderRadiusIdleTopRight: 'rounded-tr-0px',
  LabelBorderRadiusIdleTopLeft: 'rounded-tl-0px',
  LabelBorderRadiusActiveBottomRight: 'rounded-br-0px',
  LabelBorderRadiusActiveBottomLeft: 'rounded-bl-0px',
  DropdownBorderRadiusActiveTopLeft: 'rounded-tl-0px',
  DropdownBackgroundLightThemeBackground: vitalColor.BackgroundAlt6,
  BorderDarkThemeBorder: vitalColor.BorderLightBase,
  LabelBackgroundDarkThemeBackground: vitalColor.BackgroundAlt5,
  DropdownPaddingBottom: 'pb-16px md:pb-16px lg:pb-16px',
  DropdownPaddingLeft: 'pl-16px md:pl-16px lg:pl-24px',
  DropdownPaddingTop: 'pt-16px md:pt-16px lg:pt-16px',
  LabelPaddingLeft: 'pl-16px md:pl-16px lg:pl-24px',
  LabelPaddingBottom: 'pb-16px md:pb-16px lg:pb-16px',
  LabelPaddingTop: 'pt-16px md:pt-16px lg:pt-16px',
  DropdownPaddingRight: 'pr-16px md:pr-16px lg:pr-24px',
  LabelPaddingRight: 'pr-16px md:pr-16px lg:pr-24px',
});
