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
  DesignableProps,
} from '@bodiless/fclasses';
import { asAccordionBodyWrapper, asAccordionBody as asAccordionBodyElement } from './Accordion.tokens';
import { useAccordionContext } from './AccordionContext';
import { AccordionBodyComponents, AccordionBodyProps } from './types';

const AccordionBodyComponentsStart:AccordionBodyComponents = {
  Wrapper: asAccordionBodyWrapper(Div),
  Body: asAccordionBodyElement(Div),
};

const AccordionBodyBase: FC<AccordionBodyProps> = ({ components, children }) => {
  const { Wrapper, Body } = components;
  const { isExpanded } = useAccordionContext();

  return (
    <Wrapper isExpanded={isExpanded}>
      <Body>
        { children }
      </Body>
    </Wrapper>
  );
};

const AccordionBodyClean = flow(
  designable(AccordionBodyComponentsStart),
)(AccordionBodyBase);

const asAccordionBody = <P extends DesignableProps<AccordionBodyComponents>>(
  Component: ComponentType<P> | string,
) => (props: P) => (
  <AccordionBodyClean design={props.design}>
    <Component {...props} />
  </AccordionBodyClean>
  );

export default AccordionBodyClean;
export {
  asAccordionBody,
};
