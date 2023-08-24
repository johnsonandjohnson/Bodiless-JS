import React, { FC, ComponentType } from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { designable, Div, Hr } from '@bodiless/fclasses';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import { withoutHydration } from '@bodiless/hydration';
import type { DividerComponents, DividerProps } from './types';

type DividerBaseProps = DesignableComponentsProps<DividerComponents>;

/**
 * The starting components for each slot.
 */
export const dividerComponents: DividerComponents = {
  Wrapper: Div,
  Divider: Hr,
};

const DividerBase: FC<DividerBaseProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Divider />
  </C.Wrapper>
);

const DividerClean = designable(dividerComponents, 'Divider')(DividerBase);

/**
 * Use this version of the card when all components are static.
 *
 * @category Component
 */
const DividerStatic: ComponentType<DividerProps> = withoutHydration()(DividerClean);

/**
 * A token creator that respects the Divider slots.
 *
 * @category Token Collection
 */
const asDividerToken = asVitalTokenSpec<DividerComponents>();

export default DividerClean;
export {
  asDividerToken, DividerStatic
};
