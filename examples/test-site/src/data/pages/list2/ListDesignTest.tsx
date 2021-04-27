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

import React from 'react';
import {
  withDesign, addProps, asToken,
} from '@bodiless/fclasses';
import {
  asSubList, asBodilessList, withSubLists,
} from '@bodiless/components';
// import { withDefaultContent } from '@bodiless/core';

const withItemTitle = (title: string) => withDesign({
  Title: asToken(
    () => (props: any) => <span {...props}>{title}</span>,
  ),
});

const TestList = asToken(
  asBodilessList('testlist'),
  withItemTitle('TopList'),
  withSubLists(2)({
    A: asToken(asSubList(), withItemTitle('SublistA')),
    B: asToken(asSubList(), withItemTitle('SubListB')),
  }),
  // Add some id's so we can find the elements.
  withDesign({
    Wrapper: addProps({ id: 'top' }),
    Item: withDesign({
      A: withDesign({
        Wrapper: withDesign({
          List: addProps({ id: 'middle-a' }),
        }),
        Item: withDesign({
          A: withDesign({
            Wrapper: withDesign({
              List: addProps({ id: 'inner-a-a' }),
            }),
          }),
          B: withDesign({
            Wrapper: withDesign({
              List: addProps({ id: 'inner-a-b' }),
            }),
          }),
        }),
      }),
      B: withDesign({
        Wrapper: withDesign({
          List: addProps({ id: 'middle-b' }),
        }),
        Item: withDesign({
          A: withDesign({
            Wrapper: withDesign({
              List: addProps({ id: 'inner-b-a' }),
            }),
          }),
          B: withDesign({
            Wrapper: withDesign({
              List: addProps({ id: 'inner-b-b' }),
            }),
          }),
        }),
      }),
    }),
  }),
)('ul');

export default TestList;
