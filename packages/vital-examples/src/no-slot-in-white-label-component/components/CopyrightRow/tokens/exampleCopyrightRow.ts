import { asCopyrightRowToken } from '@bodiless/vital-layout';
import {
  as,
  Div,
} from '@bodiless/fclasses';
import { vitalCopyrightRowBase } from '@bodiless/vital-layout/lib/base';
import { withAppendChild } from '@bodiless/core';
import { vitalColor } from '@bodiless/vital-elements';

const Default = asCopyrightRowToken({
  ...vitalCopyrightRowBase.Default,
  Components: {
    ...vitalCopyrightRowBase.Default.Components,
    // After spreading in everything in the `Components` domain of
    // the Vital `CopyrightRow` token, we will append our `NewButton` element
    // as the next/last child of the `CopyrightWrapper` slot/element.
    //
    // For demo purposes, we'll add a bit of width, padding, and color to this 'button'
    // in order to make it visible.
    CopyrightWrapper: withAppendChild(
      as(
        'w-[100px] px-20 py-10 border-2',
        vitalColor.BgPrimaryBrand,
      )(Div), 'New Button'
    ),
  }
},);

export default {
  Default,
};
