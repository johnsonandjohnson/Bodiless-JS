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

import React, { FC } from 'react';
import {
  designable,
  Div,
} from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { useAccordionContext } from '../Accordion';
import { AccordionBodyComponents, AccordionBodyBaseProps } from './types';

const AccordionBodyComponentsStart:AccordionBodyComponents = {
  Wrapper: Div,
  Content: Div,
};

const AccordionBodyBase: FC<AccordionBodyBaseProps> = ({
  components, children, ...rest
}) => {
  const { Wrapper, Content } = components;
  const { isExpanded, meta } = useAccordionContext();

  return (
    <Wrapper
      id={meta.accordionContentId}
      role="region"
      aria-hidden={!isExpanded ? 'true' : 'false'}
      aria-labelledby={meta.accordionTitleId}
      tabIndex={!isExpanded ? -1 : 0}
      {...rest}
    >
      <Content>
        { children }
      </Content>
    </Wrapper>
  );
};

const AccordionBodyClean = designable(AccordionBodyComponentsStart, 'AccordionBody')(AccordionBodyBase);

export const asAccordionBodyToken = asVitalTokenSpec<AccordionBodyComponents>();

export default AccordionBodyClean;
