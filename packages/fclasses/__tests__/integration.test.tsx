/**
 * Copyright © 2019 Johnson & Johnson
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

// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from 'enzyme';
import { flowRight, flow } from 'lodash';
import React, { HTMLProps, FC, ComponentType } from 'react';

import {
  addClasses, removeClasses, stylable,
} from '../src/FClasses';
import {
  flowIf, hasProp, withoutProps,
} from '../src/hoc-util';

import {
  applyDesign,
  withDesign,
  replaceWith,
  DesignableProps,
} from '../src/Design';

type ToutComponents = {
  Wrapper: ComponentType<any>,
  Title: ComponentType<any>,
  Body: ComponentType<any>,
  Cta: ComponentType<any>,
};

type HOC = <P extends object>(Component: ComponentType<P>) => ComponentType<P>;

const getToutComponents = applyDesign({
  Wrapper: stylable('div'),
  Title: stylable('h2'),
  Body: stylable('div'),
  Cta: stylable('a'),
} as ToutComponents);

const Tout: FC<DesignableProps<ToutComponents>> = ({ design }) => {
  const {
    Wrapper,
    Title,
    Body,
    Cta,
  } = getToutComponents(design) as ToutComponents;
  return (
    <Wrapper id="wrapper">
      <Title id="title">This is the title</Title>
      <Body id="body">This is the body</Body>
      <Cta id="cta">This is the CTA</Cta>
    </Wrapper>
  );
};

const asBasicTout = withDesign<ToutComponents>({
  Wrapper: addClasses('font-sans'),
  Title: addClasses('text-sm text-green'),
  Body: addClasses('my-10'),
  Cta: addClasses('block w-full bg-blue text-yellow py-1'),
});

const asPinkTout = withDesign({
  Cta: flow(
    addClasses('bg-pink'),
    removeClasses('bg-blue'),
  ) as HOC,
});

// const StylableH2 = stylable<HTMLProps<HTMLHeadingElement>>('h2');
const StylableH2 = stylable<JSX.IntrinsicElements['h2']>('h2');
const ReusableH2 = addClasses('text-xl text-blue')(StylableH2);

const asStandardTout = withDesign({
  Title: replaceWith(ReusableH2), // () => ReusableH2
});

const withGreenCtaText = withDesign({
  Cta: flow(
    addClasses('text-green'),
    removeClasses('text-yellow'),
  ),
});

// @ts-ignore: Types of parameters are incompatible.
const BasicTout = asBasicTout(Tout);
const PinkTout = asPinkTout(BasicTout);
// const StandardTout = asStandardTout(BasicTout);asSta
const StandardPinkTout = asStandardTout(PinkTout);
const StandardPinkAndGreenTout = flowRight(
  withGreenCtaText,
  asStandardTout,
  asPinkTout,
)(BasicTout);

function expectClasses(wrapper: cheerio.Cheerio, selector: string, classes: string) {
  const normalize = (className: string) => className.split(' ').filter(Boolean).sort().join(' ');
  const found = normalize(wrapper.find(selector).attr('class')!);
  const expected = normalize(classes);
  expect(found).toBe(expected);
}

describe('Design with FClasses', () => {
  it('Renders a basic tout correctly', () => {
    // const mounted = mount(<PinkTout />);
    // console.log(mounted.debug());
    const wrapper = render(<div><BasicTout /></div>);
    expect(wrapper.find('#wrapper').is('div')).toBeTruthy();
    expectClasses(wrapper, '#wrapper', 'font-sans');
    expect(wrapper.find('#title').is('h2')).toBeTruthy();
    expectClasses(wrapper, '#title', 'text-sm text-green');
    expect(wrapper.find('#body').is('div')).toBeTruthy();
    expectClasses(wrapper, '#body', 'my-10');
    expect(wrapper.find('#cta').is('a')).toBeTruthy();
    expectClasses(wrapper, '#cta', 'block w-full bg-blue text-yellow py-1');
  });

  it('Renders a restyled tout correctly', () => {
    // const mounted = mount(<PinkTout />);
    // console.log(mounted.debug());
    const wrapper = render(<div><PinkTout /></div>);
    expect(wrapper.find('#wrapper').is('div')).toBeTruthy();
    expectClasses(wrapper, '#wrapper', 'font-sans');
    expect(wrapper.find('#title').is('h2')).toBeTruthy();
    expectClasses(wrapper, '#title', 'text-sm text-green');
    expect(wrapper.find('#body').is('div')).toBeTruthy();
    expectClasses(wrapper, '#body', 'my-10');
    expect(wrapper.find('#cta').is('a')).toBeTruthy();
    expectClasses(wrapper, '#cta', 'block w-full bg-pink text-yellow py-1');
  });

  it('Renders a twice restyled tout correctly', () => {
    // const mounted = mount(<PinkTout />);
    // console.log(mounted.debug());
    const wrapper = render(<div><StandardPinkTout /></div>);
    expect(wrapper.find('#wrapper').is('div')).toBeTruthy();
    expectClasses(wrapper, '#wrapper', 'font-sans');
    expect(wrapper.find('#title').is('h2')).toBeTruthy();
    expectClasses(wrapper, '#title', 'text-xl text-blue');
    expect(wrapper.find('#body').is('div')).toBeTruthy();
    expectClasses(wrapper, '#body', 'my-10');
    expect(wrapper.find('#cta').is('a')).toBeTruthy();
    expectClasses(wrapper, '#cta', 'block w-full bg-pink text-yellow py-1');
  });

  it('Renders a complex styling flow correctly', () => {
    // const mounted = mount(<PinkTout />);
    // console.log(mounted.debug());
    const wrapper = render(<div><StandardPinkAndGreenTout /></div>);
    expect(wrapper.find('#wrapper').is('div')).toBeTruthy();
    expectClasses(wrapper, '#wrapper', 'font-sans');
    expect(wrapper.find('#title').is('h2')).toBeTruthy();
    expectClasses(wrapper, '#title', 'text-xl text-blue');
    expect(wrapper.find('#body').is('div')).toBeTruthy();
    expectClasses(wrapper, '#body', 'my-10');
    expect(wrapper.find('#cta').is('a')).toBeTruthy();
    expectClasses(wrapper, '#cta', 'block w-full bg-pink text-green py-1');
  });
});

type VariantProps = {
  isActive?: boolean,
  isFirst?: boolean,
  isEnabled?: boolean,
};

const Div = stylable<HTMLProps<HTMLDivElement>>('div');

const ContextMenuButton = flow(
  withoutProps<VariantProps>(['isActive', 'isFirst', 'isEnabled']),
  addClasses('cursor-pointer pl-2 text-grey').flow,
  flowIf(hasProp('isActive'))(
    flow(addClasses('text-white'), removeClasses('text-grey')),
  ),
  flowIf(hasProp('isFirst'))(
    removeClasses('pl-2'),
  ),
)(Div);

describe('flowIf', () => {
  it('Adds and removes classes based on conditional props', () => {
    let wrapper = render(<div><ContextMenuButton /></div>);
    expectClasses(wrapper, 'div', 'cursor-pointer pl-2 text-grey');
    wrapper = render(<div><ContextMenuButton isFirst /></div>);
    expectClasses(wrapper, 'div', 'cursor-pointer text-grey');
    wrapper = render(<div><ContextMenuButton isActive /></div>);
    expectClasses(wrapper, 'div', 'cursor-pointer pl-2 text-white');
    wrapper = render(<div><ContextMenuButton isActive isFirst id="foo" /></div>);
    expectClasses(wrapper, 'div', 'cursor-pointer text-white');
    expect(wrapper.find('div').attr('id')).toBe('foo');
  });
});
