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
  Span,
  HOC,
  DesignableComponentsProps,
} from '@bodiless/fclasses';
import {
  asAccordionIcon,
  asAccordionTitleWrapper,
  asAccordionLabel,
} from './Accordion.tokens';
import { useAccordionContext } from './AccordionContext';
import AccordionKeyPressHandler from './AccordionKeyboard';
import {
  AccordionTitleProps,
  AccordionTitleComponents,
} from './types';

const accordionTitleComponents:AccordionTitleComponents = {
  Wrapper: asAccordionTitleWrapper(Div),
  Icon: asAccordionIcon(Span),
  Label: asAccordionLabel(Div),
};

type AccordionTitleBaseProps =
  Omit<AccordionTitleProps, 'design'> & DesignableComponentsProps<AccordionTitleComponents>;
const AccordionTitleBase: FC<AccordionTitleBaseProps> = ({
  components, children,
}) => {
  const { Wrapper, Label, Icon } = components;
  const context = useAccordionContext();
  const {
    isExpanded,
    setExpanded,
    hasFocus,
    setFocus,
    getMeta,
  } = context;

  return (
    <Wrapper
      onClick={() => setExpanded(!isExpanded)}
      onFocus={() => setFocus(!hasFocus)}
      onBlur={() => setFocus(!hasFocus)}
      onKeyPress={(event) => AccordionKeyPressHandler(event, context)}
      id={getMeta.accordionTitleId}
      role="button"
      aria-controls={getMeta.accordionContentId}
      aria-expanded={isExpanded ? 'true' : 'false'}
      tabIndex={0}
    >
      <Label>{ children }</Label>
      <Icon data-accordion-icon={isExpanded ? 'collapse' : 'expand'}>
        {isExpanded ? 'remove' : 'add'}
      </Icon>
    </Wrapper>
  );
};

const AccordionTitleClean = designable(accordionTitleComponents, 'AccordionTitle')(AccordionTitleBase);

const asAccordionTitle: HOC = Component => {
  const AsAccordionTitle = (props: any) => {
    const { design } = props;
    return (
      <AccordionTitleClean design={design}>
        <Component {...props} />
      </AccordionTitleClean>
    );
  };
  return AsAccordionTitle;
};

export default AccordionTitleClean;
export {
  asAccordionTitle,
};
