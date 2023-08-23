import { Fragment } from 'react';
import { as, designable, H4 } from '@bodiless/fclasses';
import { withNode } from '@bodiless/data';
import { asCardToken, CardStatic } from '../Card';
import { cardComponentStart, CardBase } from '../Card/CardClean';

const productCardComponentStart = {
  ...cardComponentStart,
  TitleWrapper: H4,
  EyebrowWrapper: Fragment,
  Eyebrow: Fragment,
  Description: Fragment,
};

const ProductCardClean = as(
  designable(productCardComponentStart, 'ProductCard'),
  withNode,
)(CardBase);

/**
 * A token creator that respects the ProductCard slots.
 *
 * @category Token Collection
 */
export const asProductCardToken = asCardToken;

export const ProductCardStatic = CardStatic;

export default ProductCardClean;
