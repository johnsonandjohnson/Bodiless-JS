/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { flow } from 'lodash';
import React, { FC, ComponentType } from 'react';
import {
  designable,
  Div,
  Span,
  DesignableProps,
} from '@bodiless/fclasses';
import {
  asAccordionIcon,
  asAccordionTitleWrapper,
  asAccordionTitle,
} from './Accordion.tokens';
import { useAccordionContext } from './AccordionContext';
import { AccordionTitleProps, AccordionTitleComponents } from './types';

const AccordionTitleComponentsStart:AccordionTitleComponents = {
  Wrapper: asAccordionTitleWrapper(Div),
  Icon: asAccordionIcon(Span),
  Title: asAccordionTitle(Div),
};

const AccordionTitleBase: FC<AccordionTitleProps> = ({ components, children }) => {
  const { Wrapper, Title, Icon } = components;
  const { isExpanded, setExpanded } = useAccordionContext();

  return (
    <Wrapper onClick={() => setExpanded(!isExpanded)}>
      <Title>{ children }</Title>
      <Icon
        isExpanded={isExpanded}
        data-accordion-icon={isExpanded ? 'remove' : 'add'}
      >
        {isExpanded ? 'remove' : 'add'}
      </Icon>
    </Wrapper>
  );
};

const AccordionTitleClean = flow(
  designable(AccordionTitleComponentsStart),
)(AccordionTitleBase);

const asAccodionTitle = <P extends DesignableProps<AccordionTitleComponents>>(
  Component: ComponentType<P> | string,
) => (props: P) => (
  <AccordionTitleClean design={props.design}>
    <Component {...props} />
  </AccordionTitleClean>
  );

export default AccordionTitleClean;
export {
  asAccodionTitle,
};
