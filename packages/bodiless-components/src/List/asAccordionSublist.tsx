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

import React, {
  ComponentType as CT,
  PropsWithChildren,
} from 'react';
import { DesignableProps, Div } from '@bodiless/fclasses';
import { withToggleTo } from '../Toggle';
import {
  FinalProps as ListProps,
} from './types';
import {
  asAccordionWrapper,
  asAccordionBody,
  asAccodionTitle,
  AccordionTitleComponents,
} from '../Accordion';

/**
 * Takes a sublist component and returns a HOC which, when applied to a list item,
 * adds a toggled version of the sublist as an Accordion body to the list item.
 *
 * @param Sublist The sublist component to add to the list accordion body.
 */
const asAccordionSublist = (Sublist: CT<ListProps>) => (
  (Item: CT<PropsWithChildren<DesignableProps<AccordionTitleComponents>>> | string) => {
    const AccordionWrapper = asAccordionWrapper(Div);
    const AccordionTitle = asAccodionTitle(Item);
    const AccordionBody = asAccordionBody(Sublist);

    const ItemWithSublist: CT<ListProps> = ({ children, ...rest }) => (
      <AccordionWrapper>
        <AccordionTitle>
          {children}
        </AccordionTitle>
        <AccordionBody {...rest} />
      </AccordionWrapper>
    );
    const ItemWithoutSublist: CT<ListProps> = ({ wrap, nodeKey, ...rest }) => (
      <Item {...rest} />
    );

    return withToggleTo(ItemWithoutSublist)(ItemWithSublist);
  }
);

export default asAccordionSublist;
