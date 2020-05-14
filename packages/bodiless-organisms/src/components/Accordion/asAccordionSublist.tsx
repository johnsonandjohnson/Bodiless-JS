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
import React, { ComponentType, PropsWithChildren } from 'react';
import { asComponent } from '@bodiless/fclasses';
import {
  ListProps,
  withToggleTo,
  withDeleteSublistOnUnwrap,
  withSublist,
} from '@bodiless/components';
import asAccordionWrapper from './AccordionWrapper';
import { asAccordionBody } from './AccordionBody';
import { asAccodionTitle } from './AccordionTitle';

/**
 * Takes a sublist component and returns a HOC which, when applied to a list item,
 * adds a toggled version of the sublist as an Accordion body to the list item.
 *
 * @param Sublist The sublist component to add to the list accordion body.
 */
const asAccordionSublist = (Sublist: ComponentType<ListProps>) => (
  (Item: ComponentType<PropsWithChildren<{}>> | string) => {
    const AccordionWrapper = asAccordionWrapper(Item);
    const AccordionBody = asAccordionBody(Sublist);
    const AccordionTitle = flow(
      asAccodionTitle,
      asComponent,
    )('div');

    const ItemWithSublist: ComponentType<ListProps> = ({ children, ...rest }) => (
      <AccordionWrapper>
        <AccordionTitle>
          {children}
        </AccordionTitle>
        <AccordionBody {...rest} />
      </AccordionWrapper>
    );
    const ItemWithoutSublist: ComponentType<ListProps> = ({ wrap, nodeKey, ...rest }) => (
      <Item {...rest} />
    );

    return withToggleTo(ItemWithoutSublist)(ItemWithSublist);
  }
);

const withAccordionSublist = flow(
  withDeleteSublistOnUnwrap,
  asAccordionSublist,
  withSublist,
);

export default asAccordionSublist;
export {
  withAccordionSublist,
};
