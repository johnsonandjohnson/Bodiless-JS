import React, { FC } from 'react';

import {
  Token, withDesign, addProps, replaceWith, withoutProps,
} from '@bodiless/fclasses';
import { withDefaultContent } from '@bodiless/core';
import { flow } from 'lodash';
import { render, ComponentType } from 'enzyme';
import { withSubLists } from '../src/List/asChameleonSubList';
import asBodilessList, { asSubList } from '../src/List/asBodilessList';

const withItemTitle = (title: string) => withDesign({
  Title: flow(
    () => (props: any) => <span {...props}>{title}</span>,
  ),
}) as Token;

describe('list styling', () => {
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
          Wrapper: addProps({ id: 'middle-a' }),
          Item: withDesign({
            A: withDesign({
              Wrapper: addProps({ id: 'inner-a-a' }),
            }),
            B: withDesign({
              Wrapper: addProps({ id: 'inner-a-b' }),
            }),
          }),
        }),
        B: withDesign({
          Wrapper: addProps({ id: 'middle-b' }),
          Item: withDesign({
            A: withDesign({
              Wrapper: addProps({ id: 'inner-b-a' }),
            }),
            B: withDesign({
              Wrapper: addProps({ id: 'inner-b-b' }),
            }),
          }),
        }),
      }),
    }),
  )('ul');

  const withSubListData = (levelOne?: 'A'|'B', levelTwo?: 'A'|'B') => withDefaultContent<any, any>({
    'testlist$default$cham-sublist': {
      component: levelOne,
    },
    'testlist$default$sublist$default$cham-sublist': {
      component: levelTwo,
    },
  });

  const renderTest = (C: ComponentType<any>) => render(<div><C /></div>);

  let wrapper;

  it('Applies a design on Item to the li for all sublist types', () => {
    const Test = withDesign<any>({
      Item: addProps({ 'data-test': 'foo' }),
    })(TestList);
    wrapper = renderTest(withSubListData()(Test));
    expect(wrapper.find('ul#top>li').prop('data-test')).toBe('foo');
    wrapper = renderTest(withSubListData('A')(Test));
    console.log(wrapper.html());
    expect(wrapper.find('ul#top>li').prop('data-test')).toBe('foo');
    wrapper = renderTest(withSubListData('B')(Test));
    expect(wrapper.find('ul#top>li').prop('data-test')).toBe('foo');
  });

  it('Applies a design on Wrapper to the ul for all sublist types', () => {
    const Test = withDesign<any>({
      Item: withDesign({
        // NOTE: we cannot apply the design directly to the item bc the
        // chameleon consumes it.  Perhaps look at using extendDesignable
        // for chameleons...
        A: withDesign({
          Wrapper: addProps({ 'data-test': 'foo' }),
        }),
        B: withDesign({
          Wrapper: addProps({ 'data-test': 'foo' }),
        }),
      }),
    })(TestList);
    wrapper = renderTest(withSubListData()(Test));
    expect(wrapper.find('ul#top>li').prop('data-test')).toBeUndefined();
    wrapper = renderTest(withSubListData('A')(Test));
    expect(wrapper.find('ul#top>li').prop('data-test')).toBeUndefined();
    expect(wrapper.find('ul#top>li>ul').prop('data-test')).toBe('foo');
    wrapper = renderTest(withSubListData('B')(Test));
    expect(wrapper.find('ul#top>li').prop('data-test')).toBeUndefined();
    expect(wrapper.find('ul#top>li>ul').prop('data-test')).toBe('foo');
  });

  it('Supports an rc-menu style sublist', () => {
    const TitledSubList: FC<any> = ({ title, children, ...rest }) => (
      <li id="title-sub-list" {...rest}>
        {title}
        <ul>
          {children}
        </ul>
      </li>
    );
    const Test = flow(
      withDesign({
        Item: flow(
          addProps({ 'data-item': true }),
          withDesign({
            A: withDesign({
              OuterWrapper: flow(
                replaceWith(TitledSubList),
                // @todo find a way to avoid this.
                withoutProps(['addItem', 'deleteItem', 'canDelete', 'unwrap']),
              ) as Token,
            }),
          }),
        ),
      }),
      withSubListData('A'),
    )(TestList);
    wrapper = renderTest(Test);
    expect(wrapper.find('ul#top>li').prop('id')).toBe('title-sub-list');
    console.log(wrapper.html());
  });
});
