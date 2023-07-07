import React, { FC } from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { designable, Div, Hr } from '@bodiless/fclasses';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import type { DividerComponents } from './types';

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
    <C.Divider></C.Divider>
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
