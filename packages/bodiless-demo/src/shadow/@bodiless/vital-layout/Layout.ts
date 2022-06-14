import { asLayoutToken, vitalHeader, vitalLayoutBase } from '@bodiless/vital-layout';
import asBodilessDemoFooter from '../../../components/Footer';

const Default = asLayoutToken({
  ...vitalLayoutBase.Base,
  Components: {
    Header: vitalHeader.Default,
    Footer: asBodilessDemoFooter,
  },
});

export default {
  ...vitalLayoutBase,
  Default,
};
