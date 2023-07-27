import {
  withChild,
} from '@bodiless/core';
import { as } from '@bodiless/fclasses';
import {
  asBurgerMenuToggler,
} from '@bodiless/navigation';
import { asElementToken } from '@bodiless/vital-elements';
import { asIsland } from '@bodiless/hydration';
import BurgerIcon from '../assets/BurgerIcon';

const Default = asElementToken({
  Core: {
    _: as(
      asBurgerMenuToggler
    )
  },
  Layout: {
    _: 'flex justify-center items-center'
  },
  Theme: {
    // @todo perhaps this should be an element spcing token ike "LargeIconSize".
    _: 'w-6 h-6',
  },
  Content: {
    _: withChild(BurgerIcon),
  },
  Behavior: {
    _: asIsland('vitalMenuToggler'),
  }
});

export default {
  Default
};
