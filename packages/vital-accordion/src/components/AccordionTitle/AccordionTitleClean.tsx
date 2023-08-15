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

import React, { FC, PropsWithChildren, useCallback } from 'react';
import {
  designable,
  Span,
  H4,
  HOC,
} from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { useEditContext } from '@bodiless/core';
import { AddIcon, RemoveIcon } from '../../assets';
import { useAccordionContext } from '../Accordion/AccordionContext';
import {
  AccordionTitleBaseProps,
  AccordionTitleComponents,
} from './types';

const accordionTitleComponents: AccordionTitleComponents = {
  Wrapper: H4,
  Icon: Span,
  Label: Span,
  OpenIcon: AddIcon,
  CloseIcon: RemoveIcon,
};
const AccordionTitleBase: FC<PropsWithChildren<AccordionTitleBaseProps>> = ({
  components, children,
}) => {
  const {
    Wrapper, Label, Icon, OpenIcon, CloseIcon
  } = components;
  const {
    isExpanded,
    setExpanded,
    hasFocus,
    setFocus,
    meta,
  } = useAccordionContext();

  return (
    <Wrapper
      onClick={() => setExpanded(!isExpanded)}
      onFocus={() => setFocus(!hasFocus)}
      onBlur={() => setFocus(!hasFocus)}
      id={meta.accordionTitleId}
      role="button"
      aria-controls={meta.accordionContentId}
      aria-expanded={isExpanded ? 'true' : 'false'}
      tabIndex={0}
    >
      <Label>{ children }</Label>
      <Icon data-accordion-icon={isExpanded ? 'collapse' : 'expand'}>
        {isExpanded ? <CloseIcon /> : <OpenIcon />}
      </Icon>
    </Wrapper>
  );
};

/**
 * A HOC that handles toggling the current accordion when pressing Enter or Space on the keyboard.
 * On Edit, the keyboard won't toggle the accordion, but this will prevent the user from placing
 * a carriage return (Enter) in the title, forcing it to be one line.
 */
export const withAccordionTitleHandler: HOC<any, any> = Component => props => {
  const { isEdit } = useEditContext();
  const { onKeyPress, ...rest } = props;
  const { setExpanded } = useAccordionContext();

  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    const toggleAccordion = () => {
      event.preventDefault();
      setExpanded((isExpanded) => !isExpanded);
    };

    switch (event.key) {
      case 'Enter':
        if (isEdit) event.preventDefault();
        else toggleAccordion();
        break;
      case ' ':
        if (!isEdit) toggleAccordion();
        break;
      default:
        if (typeof onKeyPress === 'function') onKeyPress(event);
    }
  }, [isEdit, onKeyPress, setExpanded]);

  return <Component {...rest} onKeyPress={handleKeyPress} />;
};

const AccordionTitleClean = designable(accordionTitleComponents, 'AccordionTitle')(AccordionTitleBase);

export const asAccordionTitleToken = asVitalTokenSpec<AccordionTitleComponents>();

export default AccordionTitleClean;
