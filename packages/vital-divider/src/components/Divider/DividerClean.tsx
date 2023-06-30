import React, { FC, Fragment } from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { designable, Div } from '@bodiless/fclasses';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import type { DividerComponents } from './types';

type DividerBaseProps = DesignableComponentsProps<DividerComponents>;

/**
 * The starting components for each slot.
 */
const dividerComponents: DividerComponents = {
  Wrapper: Div,
  Slot1Wrapper: Div,
  Slot1: Fragment,
  Slot2Wrapper: Div,
  Slot2: Fragment,
};

const DividerBase: FC<DividerBaseProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Slot1Wrapper>
      <C.Slot1 />
    </C.Slot1Wrapper>
    <C.Slot2Wrapper>
      <C.Slot2 />
    </C.Slot2Wrapper>
  </C.Wrapper>
);

const DividerClean = designable(dividerComponents, 'Divider')(DividerBase);

/**
 * A token creator that respects the Divider slots.
 *
 * @category Token Collection
 */
export const asDividerToken = asVitalTokenSpec<DividerComponents>();

export default DividerClean;
