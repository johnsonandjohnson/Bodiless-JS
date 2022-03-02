import { asBodilessChameleon, useChameleonContext } from '@bodiless/components';
import { withDesign, flowHoc, Div } from '@bodiless/fclasses';
import {
  asBox, asBlue, asOrange, asTeal, withBlueBorder,
} from './Box';

const useToggleOverrides = () => {
  const isOn = useChameleonContext();
  return {
    groupLabel: 'Fill',
    label: isOn ? 'Teal' : 'Blue',
  };
};

export const useSwapOverrides = () => ({
  groupLabel: 'Fill',
});

const ChameleonBox = flowHoc(
  asBox,
  asBodilessChameleon('chameleon', undefined, useToggleOverrides),
  // asBodilessChameleon('chameleon', undefined, useSwapOverrides),
  withBlueBorder,
  withDesign({
    Teal: flowHoc(asTeal, { title: 'Color Teal' }),
    Orange: asOrange,
    _default: asBlue,
  }),
)(Div);

export default ChameleonBox;
