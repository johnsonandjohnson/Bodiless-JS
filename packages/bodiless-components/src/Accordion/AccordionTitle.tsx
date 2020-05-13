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
  withDesign,
  addClasses,
} from '@bodiless/fclasses';
import { useAccordionContext } from './AccordionContext';
import { ifViewportIs } from '../withResponsiveToggle';
import { AccordionTitleProps, AccordionTitleComponents } from './types';

const AccordionTitleComponentsStart:AccordionTitleComponents = {
  Wrapper: Div,
  Icon: Span,
};

const AccordionTitleBase: FC<AccordionTitleProps> = ({ components, children }) => {
  const { Wrapper, Icon } = components;
  const { expanded, setExpanded } = useAccordionContext();

  return (
    <Wrapper className="flex items-center justify-between relative" onClick={() => setExpanded(!expanded)}>
      { children }
      <Icon
        className="material-icons absolute right-0"
        data-accordion-element="accordion-icon"
        data-accordion-icon={expanded ? 'remove' : 'add'}
      >
        {expanded ? 'remove' : 'add'}
      </Icon>
    </Wrapper>
  );
};

const asNoIconOnDesktop = ifViewportIs(['sm', 'md'])(
  withDesign({
    Icon: addClasses('lg:hidden'),
  }),
);

const AccordionTitleClean = flow(
  designable(AccordionTitleComponentsStart),
  asNoIconOnDesktop,
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
