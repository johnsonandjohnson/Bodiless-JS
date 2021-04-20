import React from 'react';
import { withDesign, Token, addProps } from '@bodiless/fclasses';
import { flow } from 'lodash';
import {
  asSubList, asBodilessList, withSubLists,
} from '@bodiless/components';
// import { withDefaultContent } from '@bodiless/core';

const withItemTitle = (title: string) => withDesign({
  Title: flow(
    () => (props: any) => <span {...props}>{title}</span>,
  ),
}) as Token;

const TestList = flow(
  asBodilessList('testlist'),
  withItemTitle('TopList'),
  withSubLists(2)({
    A: flow(asSubList(), withItemTitle('SublistA')),
    B: flow(asSubList(), withItemTitle('SubListB')),
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
