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

type CardComponents = {
  Wrapper: ComponentType<any>,
  Title: ComponentType<any>,
  Body: ComponentType<any>,
  Cta: ComponentType<any>,
};

type HOC = <P extends object>(Component: ComponentType<P>) => ComponentType<P>;

const getCardComponents = applyDesign({
  Wrapper: stylable('div'),
  Title: stylable('h2'),
  Body: stylable('div'),
  Cta: stylable('a'),
} as CardComponents);

const Card: FC<DesignableProps<CardComponents>> = ({ design }) => {
  const {
    Wrapper,
    Title,
    Body,
    Cta,
  } = getCardComponents(design) as CardComponents;
  return (
    <Wrapper id="wrapper">
      <Title id="title">This is the title</Title>
      <Body id="body">This is the body</Body>
      <Cta id="cta">This is the CTA</Cta>
    </Wrapper>
  );
};

const asBasicCard = withDesign<CardComponents>({
  Wrapper: addClasses('font-sans'),
  Title: addClasses('text-sm text-green'),
  Body: addClasses('my-10'),
  Cta: addClasses('block w-full bg-blue text-yellow py-1'),
});

const asPinkCard = withDesign({
  Cta: flow(
    addClasses('bg-pink'),
    removeClasses('bg-blue'),
  ) as HOC,
});

// const StylableH2 = stylable<HTMLProps<HTMLHeadingElement>>('h2');
const StylableH2 = stylable<JSX.IntrinsicElements['h2']>('h2');
const ReusableH2 = addClasses('text-xl text-blue')(StylableH2);

const asStandardCard = withDesign({
  Title: replaceWith(ReusableH2), // () => ReusableH2
});

const withGreenCtaText = withDesign({
  Cta: flow(
    addClasses('text-green'),
    removeClasses('text-yellow'),
  ),
});

// @ts-ignore: Types of parameters are incompatible.
const BasicCard = asBasicCard(Card);
const PinkCard = asPinkCard(BasicCard);
// const StandardCard = asStandardCard(BasicCard);asSta
const StandardPinkCard = asStandardCard(PinkCard);
const StandardPinkAndGreenCard = flowRight(
  withGreenCtaText,
  asStandardCard,
  asPinkCard,
)(BasicCard);

function expectClasses(wrapper: cheerio.Cheerio, selector: string, classes: string) {
  const normalize = (className: string) => className.split(' ').filter(Boolean).sort().join(' ');
  const found = normalize(wrapper.find(selector).attr('class')!);
  const expected = normalize(classes);
  expect(found).toBe(expected);
}

describe('Design with FClasses', () => {
  it('Renders a basic card correctly', () => {
    // const mounted = mount(<PinkCard />);
    // console.log(mounted.debug());
    const wrapper = render(<div><BasicCard /></div>);
    expect(wrapper.find('#wrapper').is('div')).toBeTruthy();
    expectClasses(wrapper, '#wrapper', 'font-sans');
    expect(wrapper.find('#title').is('h2')).toBeTruthy();
    expectClasses(wrapper, '#title', 'text-sm text-green');
    expect(wrapper.find('#body').is('div')).toBeTruthy();
    expectClasses(wrapper, '#body', 'my-10');
    expect(wrapper.find('#cta').is('a')).toBeTruthy();
    expectClasses(wrapper, '#cta', 'block w-full bg-blue text-yellow py-1');
  });

  it('Renders a restyled card correctly', () => {
    // const mounted = mount(<PinkCard />);
    // console.log(mounted.debug());
    const wrapper = render(<div><PinkCard /></div>);
    expect(wrapper.find('#wrapper').is('div')).toBeTruthy();
    expectClasses(wrapper, '#wrapper', 'font-sans');
    expect(wrapper.find('#title').is('h2')).toBeTruthy();
    expectClasses(wrapper, '#title', 'text-sm text-green');
    expect(wrapper.find('#body').is('div')).toBeTruthy();
    expectClasses(wrapper, '#body', 'my-10');
    expect(wrapper.find('#cta').is('a')).toBeTruthy();
    expectClasses(wrapper, '#cta', 'block w-full bg-pink text-yellow py-1');
  });

  it('Renders a twice restyled card correctly', () => {
    // const mounted = mount(<PinkCard />);
    // console.log(mounted.debug());
    const wrapper = render(<div><StandardPinkCard /></div>);
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
    // const mounted = mount(<PinkCard />);
    // console.log(mounted.debug());
    const wrapper = render(<div><StandardPinkAndGreenCard /></div>);
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
  addClasses('cursor-pointer pl-2 text-gray') as HOC,
  flowIf(hasProp('isActive'))(
    flow(addClasses('text-white'), removeClasses('text-gray')),
  ),
  flowIf(hasProp('isFirst'))(
    removeClasses('pl-2'),
  ),
)(Div);

describe('flowIf', () => {
  it('Adds and removes classes based on conditional props', () => {
    let wrapper = render(<div><ContextMenuButton /></div>);
    expectClasses(wrapper, 'div', 'cursor-pointer pl-2 text-gray');
    wrapper = render(<div><ContextMenuButton isFirst /></div>);
    expectClasses(wrapper, 'div', 'cursor-pointer text-gray');
    wrapper = render(<div><ContextMenuButton isActive /></div>);
    expectClasses(wrapper, 'div', 'cursor-pointer pl-2 text-white');
    wrapper = render(<div><ContextMenuButton isActive isFirst id="foo" /></div>);
    expectClasses(wrapper, 'div', 'cursor-pointer text-white');
    expect(wrapper.find('div').attr('id')).toBe('foo');
  });
});
