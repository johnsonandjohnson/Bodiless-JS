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
import {
  designable,
  Div,
  HOC,
  DesignableComponentsProps,
} from '@bodiless/fclasses';
import { asAccordionBodyWrapper, asAccordionBodyContent } from './Accordion.tokens';
import { AccordionBodyComponents, AccordionBodyProps } from './types';

const AccordionBodyComponentsStart:AccordionBodyComponents = {
  Wrapper: asAccordionBodyWrapper(Div),
  Content: asAccordionBodyContent(Div),
};

type AccordionBodyBaseProps =
  Omit<AccordionBodyProps, 'design'> & DesignableComponentsProps<AccordionBodyComponents>;

const AccordionBodyBase: FC<AccordionBodyBaseProps> = ({ components, children }) => {
  const { Wrapper, Content } = components;

  return (
    <Wrapper>
      <Content>
        { children }
      </Content>
    </Wrapper>
  );
};

const AccordionBodyClean = flow(
  designable(AccordionBodyComponentsStart, 'AccordionBody'),
)(AccordionBodyBase);

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
