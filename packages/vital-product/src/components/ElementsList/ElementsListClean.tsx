import React, { useMemo, FC } from 'react';
import identity from 'lodash/identity';
import { withNode, withDefaultContent, withNodeKey } from '@bodiless/data';

import {
  designable, flowHoc, DesignableComponentsProps,
  ComponentOrTag, DesignableComponents, Fragment,
} from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';

export type ElementsListComponents = {
  Wrapper: ComponentOrTag<any>,
};

export const elementsListComponents: ElementsListComponents = {
  Wrapper: Fragment,
};

export type ElementsListBaseProps = DesignableComponentsProps & { content?: any };

const ElementsListBase: FC<ElementsListBaseProps> = props => {
  const { components, content } = props;
  const { Wrapper, ...restComponents } = components;

  const finalComponents: DesignableComponents = useMemo(() => Object.entries(restComponents).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: flowHoc(
        content ? withDefaultContent(content) : identity,
        withNode,
        withNodeKey(key)
      )(value),
    }),
    {},
  ), [components, content]);

  const items = Object.entries(finalComponents).map(([name, C]) => (
    <C key={name} />
  ));
  return (
    <Wrapper>
      {items}
    </Wrapper>
  );
};

const ElementsListClean = designable(
  elementsListComponents, 'ElementsList'
)(ElementsListBase);

export const asElementsListToken = asVitalTokenSpec<ElementsListComponents>();
export default ElementsListClean;
