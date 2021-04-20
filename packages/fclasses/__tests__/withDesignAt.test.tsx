import React, { ComponentType, FC } from 'react';
import flow from 'lodash/flow';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from 'enzyme';
import type { DesignableComponentsProps, Token } from '../src';
import {
  designable, replaceWith, withDesign, withDesignAt,
} from '../src';

type Components = {
  A: ComponentType<any>,
  B: ComponentType<any>,
};

const startComponents = {
  A: (props: any) => <div {...props} />,
  B: (props: any) => <div {...props} />,
};

const Base: FC<DesignableComponentsProps<Components>> = ({ components: C, ...rest }) => (
  <div {...rest}>
    <C.A />
    <C.B />
  </div>
);

const withAttr = (name: string, value: string|boolean = true): Token => (
  (C: ComponentType<any>) => (
    (props: any) => <C {...props} {...{ [`data-${name}`]: value }} />
  )
) as Token;

const Inner = flow(
  designable<Components>(startComponents),
  withDesign({
    A: withAttr('key', 'inner-a'),
    B: withAttr('key', 'inner-b'),
  }),
  withAttr('comp', 'inner'),
)(Base);

const Middle = flow(
  designable<Components>(startComponents),
  withDesign({
    A: flow(
      replaceWith(Inner),
      withAttr('key', 'middle-a'),
    ),
    B: withAttr('key', 'middle-b'),
  }),
  withAttr('comp', 'middle'),
)(Base);

const Outer = flow(
  designable<Components>(startComponents),
  withDesign({
    A: flow(
      replaceWith(Middle),
      withAttr('key', 'outer-a'),
    ),
    B: withAttr('key', 'outer-b'),
  }),
  withAttr('comp', 'outer'),
)(Base);

const findNeedle = (T: ComponentType) => {
  // const wrapper = mount(<T />);
  // console.log(wrapper.html());
  // console.log(wrapper.debug());
  // return wrapper.find('div[data-needle=true]');
  const wrapper = render(<div><T /></div>);
  return wrapper.find('div[data-needle="true"]');
};
const withNeedle = withAttr('needle');

describe('withDesignAt', () => {
  it('Has a correct baseline', () => {
    const $ = render(<div><Outer /></div>);
    expect($).toMatchSnapshot();
  });

  it('Applies a token correctly to an inner path', () => {
    const Test = withDesignAt(['A', 'A', 'B'])(withNeedle)(Outer);
    const needle = findNeedle(Test);
    expect(needle).toHaveLength(1);
    expect(needle.prop('data-key')).toEqual('inner-b');
  });

  it('Applies a token correctly to a middle path', () => {
    const Test = withDesignAt(['A', 'B'])(withNeedle)(Outer);
    const needle = findNeedle(Test);
    expect(needle).toHaveLength(1);
    expect(needle.prop('data-key')).toEqual('middle-b');
  });

  it('Applies a token correctly to an outer path', () => {
    const Test = withDesignAt(['B'])(withNeedle)(Outer);
    const needle = findNeedle(Test);
    expect(needle).toHaveLength(1);
    expect(needle.prop('data-key')).toEqual('outer-b');
  });

  it('Applies a design correctly to an middle path', () => {
    const Test = withDesignAt(['A', 'A'])({
      B: withNeedle,
    })(Outer);
    const needle = findNeedle(Test);
    expect(needle).toHaveLength(1);
    expect(needle.prop('data-key')).toEqual('inner-b');
  });

  it('Applies a token correctly to an element which itself has a design', () => {
    const Test = withDesignAt(['A'])(withNeedle)(Outer);
    const needle = findNeedle(Test);
    expect(needle).toHaveLength(1);
    expect(needle.prop('data-comp')).toBe('middle');
  });

  it('Applies a token correctly to multiple paths', () => {
    const Test = withDesignAt(['A', 'B'], ['B'])(withNeedle)(Outer);
    const needle = findNeedle(Test);
    expect(needle).toHaveLength(2);
    expect(needle.eq(0).attr('data-key')).toBe('middle-b');
    expect(needle.eq(1).attr('data-key')).toBe('outer-b');
  });

  it('Applies a token correctly at the top level', () => {
    const Test = withDesignAt([])(withNeedle)(Outer);
    const needle = findNeedle(Test);
    expect(needle).toHaveLength(1);
    expect(needle.prop('data-comp')).toBe('outer');
  });
});
