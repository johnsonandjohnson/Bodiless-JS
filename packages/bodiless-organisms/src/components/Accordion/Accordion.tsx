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
import React, { FC } from 'react';
import { designable, Div } from '@bodiless/fclasses';
import AccordionTitleClean from './AccordionTitle';
import AccordionBodyClean from './AccordionBody';
import { AccordionProvider } from './AccordionContext';
import { AccordionComponents, AccordionProps, AccordionProviderProps } from './types';

const AccordionComponentsStart:AccordionComponents = {
  Wrapper: Div,
  Title: AccordionTitleClean,
  Body: AccordionBodyClean,
};

const AccordionBase: FC<AccordionProps & AccordionProviderProps> = ({
  components, expanded, ...rest
}) => {
  const {
    Wrapper,
    Title = AccordionTitleClean,
    Body = AccordionBodyClean,
  } = components;

  return (
    <AccordionProvider expanded={expanded}>
      <Wrapper {...rest}>
        <Title />
        <Body />
      </Wrapper>
    </AccordionProvider>
  );
};

const AccordionClean = flow(
  designable(AccordionComponentsStart, 'Accordion'),
)(AccordionBase);

export default AccordionClean;
