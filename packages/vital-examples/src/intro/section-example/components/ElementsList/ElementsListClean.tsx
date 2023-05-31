import React, { FC, useMemo } from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { withNode, withNodeKey } from '@bodiless/data';
import {
  DesignableComponentsProps, Ul, Li, designable, ComponentOrTag, Fragment, flowHoc,
} from '@bodiless/fclasses';

export type ElementsListComponents = {
  Wrapper: ComponentOrTag<any>,
  ElementWrapper: ComponentOrTag<any>,
  Element: ComponentOrTag<any>,
};

export const elementsListComponents: ElementsListComponents = {
  Wrapper: Ul,
  ElementWrapper: Li,
  Element: Fragment,
};

const ElementsListBase: FC<DesignableComponentsProps & { times: number }> = props => {
  const { times = 4, components, ...rest } = props;
  const { Wrapper, Element, ElementWrapper } = components;

  const items = useMemo(() => Array.from(Array(times).keys()).map((val) => {
    const FinalElement = flowHoc(
      withNode,
      withNodeKey(`element-${val}`),
    )(Element);

    return (
      <ElementWrapper key={val}>
        <FinalElement />
      </ElementWrapper>
    );
  }), [components, times]);

  return (
    <Wrapper {...rest}>
      {items}
    </Wrapper>
  );
};

const ElementListClean = designable(elementsListComponents, 'ElementsList')(ElementsListBase);

export const asElementListToken = asVitalTokenSpec<ElementsListComponents>();
export default ElementListClean;
