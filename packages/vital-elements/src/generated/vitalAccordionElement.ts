import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['AccordionElement'],
  },
};

export default asTokenGroup(meta)({
  DropdownBorderRadiusActiveBottomRight: 'rounded-br-0px',
  DropdownBorderRadiusActiveTopRight: 'rounded-tr-0px',
  DropdownTextDarkThemeBody: vitalColor.TextDarkThemeBase,
  DropdownTextLightThemeBody: vitalColor.TextLightThemeBase,
  DropdownBackgroundDarkThemeBackground: vitalColor.BackgroundAlt8,
  BorderLightThemeBorder: vitalColor.BorderLightThemeBase,
  LabelBorderRadiusActiveTopRight: 'rounded-tr-0px',
  LabelBorderRadiusActiveTopLeft: 'rounded-tl-0px',
  LabelBorderRadiusIdleBottomLeft: 'rounded-bl-0px',
  LabelBorderRadiusIdleBottomRight: 'rounded-br-0px',
  DropdownBorderRadiusActiveBottomLeft: 'rounded-bl-0px',
  LabelBackgroundLightThemeBackground: vitalColor.BackgroundBase,
  LabelTextDarkThemeLabel: vitalColor.TextDarkThemeBase,
  LabelTextLightThemeLabel: vitalColor.TextLightThemeBase,
  LabelBorderRadiusIdleTopRight: 'rounded-tr-0px',
  LabelBorderRadiusIdleTopLeft: 'rounded-tl-0px',
  LabelBorderRadiusActiveBottomRight: 'rounded-br-0px',
  LabelBorderRadiusActiveBottomLeft: 'rounded-bl-0px',
  DropdownBorderRadiusActiveTopLeft: 'rounded-tl-0px',
  DropdownBackgroundLightThemeBackground: vitalColor.BackgroundBase,
  BorderDarkThemeBorder: vitalColor.BorderDarkThemeBase,
  LabelBackgroundDarkThemeBackground: vitalColor.BackgroundAlt7,
});
