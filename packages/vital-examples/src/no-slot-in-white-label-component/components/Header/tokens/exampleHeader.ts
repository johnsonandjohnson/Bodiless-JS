import {
  as, Div, startWith
} from '@bodiless/fclasses';
import { vitalColor } from '@bodiless/vital-elements';
import { vitalHeaderBase } from '@bodiless/vital-layout/lib/base';
import { asHeaderToken } from '../HeaderClean';

const Default = asHeaderToken({
  ...vitalHeaderBase.Default,
  Components: {
    ...vitalHeaderBase.Default.Components,
    // A flex gap of 0.5rem is being added here simply to add some separation
    // between the `WhereToBuy` button and our new `NewButton.`
    ActionMenuContainer: 'gap-2',
    // Here we're selecting our new `NewButton` slot and adding a collection of tokens
    NewButton: as(
      // When instantiating a slot as a 'fragment,' it will not be rendered unless specifically
      // called. This is most often done by using the `startWith` helper, which can take as its
      // argument a variety of items, including components and -- in this case -- a stylable HTML
      // element.
      //
      // Here we are essentially saying, instantiate this NewButton slot as a 'div' element,
      // and -- for the purposes of this demo -- give it a width, some padding, a border, and
      // a background color, to make it appear more like a button that you might find in a header
      // nav.
      startWith(Div),
      'w-[100px] px-20 py-10 border-2',
      vitalColor.BgPrimaryBrand,
    ),
  },
});

export default {
  Default,
};
