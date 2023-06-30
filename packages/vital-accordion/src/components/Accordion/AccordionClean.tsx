/**
 * Copyright © 2022 Johnson & Johnson
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

import React, { FC, HTMLProps, useMemo } from 'react';
import uniqueId from 'lodash/uniqueId';
import { designable, Div, Fragment } from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { AccordionTitleClean } from '../AccordionTitle';
import { AccordionBodyClean } from '../AccordionBody';
import { AccordionProvider } from './AccordionContext';
import { AccordionComponents, AccordionBaseProps, AccordionProviderProps } from './types';

export const AccordionComponentsStart: AccordionComponents = {
  Wrapper: Div,
  TitleWrapper: Fragment,
  Title: AccordionTitleClean,
  BodyWrapper: Fragment,
  Body: AccordionBodyClean,
};

const AccordionBase: FC<AccordionBaseProps & AccordionProviderProps & HTMLProps<HTMLElement>> = ({
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
    TitleWrapper,
    Title,
    BodyWrapper,
    Body,
  } = components;
  // Generates accordion ids and prepares meta information to context
  // In case props already provides id, use it instead of generating new ones
  const accordionId = useMemo(() => id ?? uniqueId('bl-accordion-'), [id]);

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
        <TitleWrapper>
          <Title />
        </TitleWrapper>
        <BodyWrapper>
          <Body />
        </BodyWrapper>
      </Wrapper>
    </AccordionProvider>
  );
};

const AccordionClean = designable(AccordionComponentsStart, 'Accordion')(AccordionBase);

export const AccordionBodyPreview = () => <span className="bl-text-gray-800">Accordion Body</span>;

export const asAccordionToken = asVitalTokenSpec<AccordionComponents>();

// These are used in definig the VitalAccordion interface.
const accordionToken = asAccordionToken();
export type AccordionToken = typeof accordionToken;

export default AccordionClean;
