/**
 * Copyright © 2021 Johnson & Johnson
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

import React, { FC, HTMLProps } from 'react';
import nextId from 'react-id-generator';
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

const AccordionBase: FC<AccordionProps & AccordionProviderProps & HTMLProps<HTMLElement>> = ({
  ...props
}) => {
  const {
    id,
    components,
    collapsible,
    expanded,
    focus,
    meta,
    ...rest
  } = props;
  const {
    Wrapper,
    Title = AccordionTitleClean,
    Body = AccordionBodyClean,
  } = components;
  // Generates accordion ids and prepares meta information to context
  // In case props already provides id, use it instead of generating new ones
  const accordionId = id ?? nextId('accordion-');

  const accordionMeta = {
    accordionId,
    accordionTitleId: `accordion__title-${accordionId}`,
    accordionContentId: `accordion__content-${accordionId}`,
  };

  return (
    <AccordionProvider
      collapsible={collapsible}
      expanded={expanded}
      focus={focus}
      meta={accordionMeta}
    >
      <Wrapper {...rest} id={accordionId}>
        <Title />
        <Body />
      </Wrapper>
    </AccordionProvider>
  );
};

const AccordionClean = designable(AccordionComponentsStart, 'Accordion')(AccordionBase);

export default AccordionClean;
