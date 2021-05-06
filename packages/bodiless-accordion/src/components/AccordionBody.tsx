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
  HOC,
  DesignableComponentsProps,
} from '@bodiless/fclasses';
import { asAccordionBodyWrapper, asAccordionBodyContent } from './Accordion.tokens';
import { useAccordionContext } from './AccordionContext';
import { AccordionBodyComponents, AccordionBodyProps } from './types';

const AccordionBodyComponentsStart:AccordionBodyComponents = {
  Wrapper: asAccordionBodyWrapper(Div),
  Content: asAccordionBodyContent(Div),
};

type AccordionBodyBaseProps =
  Omit<AccordionBodyProps, 'design'> & DesignableComponentsProps<AccordionBodyComponents>;

const AccordionBodyBase: FC<AccordionBodyBaseProps> = ({
  components, children,
}) => {
  const { Wrapper, Content } = components;
  const { isExpanded, getMeta } = useAccordionContext();

  return (
    <Wrapper
      id={getMeta.accordionContentId}
      role="region"
      aria-hidden={!isExpanded ? 'true' : 'false'}
      aria-labelledby={getMeta.accordionTitleId}
      tabIndex={!isExpanded ? -1 : 0}
    >
      <Content>
        { children }
      </Content>
    </Wrapper>
  );
};

const AccordionBodyClean = designable(AccordionBodyComponentsStart, 'AccordionBody')(AccordionBodyBase);

const asAccordionBody: HOC = Component => {
  const AsAccordionBody = (props: any) => {
    const { design } = props;
    return (
      <AccordionBodyClean design={design}>
        <Component {...props} />
      </AccordionBodyClean>
    );
  };
  return AsAccordionBody;
};

export default AccordionBodyClean;
export {
  asAccordionBody,
};
