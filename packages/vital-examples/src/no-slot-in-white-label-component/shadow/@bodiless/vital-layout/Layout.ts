import { on } from '@bodiless/fclasses';
import {
  asLayoutToken,
} from '@bodiless/vital-layout';
import { vitalLayoutBase } from '@bodiless/vital-layout/lib/base';
import HeaderClean from '../../../components/Header/HeaderClean';
import exampleHeader from './Header';

const Default = asLayoutToken(vitalLayoutBase.Default, {
  Components: {
    ...vitalLayoutBase.Default.Components,
    Header: on(HeaderClean)(exampleHeader.Default),
  },
});

export default {
  Default,
};
