/**
 * Copyright © 2022 Johnson & Johnson
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
  flowHoc, addClasses, Div, addProps, startWith, varyDesigns, HOC, withDesign
} from '@bodiless/fclasses';
import type { FC, ReactNode } from 'react';
import pick from 'lodash/pick';
import { FlowContainer } from '@bodiless/layouts-ui';
import { asBodilessChameleon } from '@bodiless/components';
import { withParent } from '@bodiless/core';
import { withNodeKey } from '@bodiless/data';

const colors = ['red', 'blue', 'teal', 'green', 'yellow', 'purple', 'orange'];
const createColorDesign = (prefix: string) => colors.reduce(
  (acc, next) => ({
    ...acc,
    [`${prefix}${next}4`]: flowHoc(addClasses(`${prefix}-${next}-400`), flowHoc.meta.term(prefix)(`${prefix}-${next}`)),
  }),
  {},
);
const Box = flowHoc(
  addClasses('w-12 h-12 p-2 border-2'),
)(Div);

const createTextDesign = (n: number) => {
  const design: any = {};
  for (let i = 0; i < n; i += 1) {
    design[`Text${i}`] = flowHoc(
      addProps({ children: `Foo ${i}` }),
      flowHoc.meta.term('Copy')(`${i}`),
    );
  }
  return design;
};

const baseDesign = {
  Box: startWith(Box),
};

export const heavyDesign = varyDesigns(
  baseDesign,
  createColorDesign('bg'),
  createColorDesign('border'),
  createColorDesign('text'),
  createTextDesign(5),
);

export const withPrunedDesign: HOC = Component => {
  const WithPrunedDesign: FC<any> = props => {
    const { design } = props;
    const newDesign = pick(design, 'Wrapper', 'ComponentWrapper');
    return <Component {...props} design={newDesign} />;
  };
  return WithPrunedDesign;
};

export const createHeavyFlowContainer = (n: number = 1) => flowHoc(
  // withPrunedDesign,
  withDesign(heavyDesign),
  withNodeKey(`fc-${n}`),
  addProps({ key: `fc-${n}` }),
  withParent(Div),
  withDesign({
    Parent: addClasses('w-1/4'),
  })
)(FlowContainer);

export const createHeavyChameleon = (n: number = 1) => flowHoc(
  asBodilessChameleon(`chameleon-${n}`),
  // withPrunedDesign,
  withDesign(heavyDesign),
  addProps({ key: `chameleon-${n}` }),
)(Box);

export const createHeavyElements = (type: 'fc'|'chameleon', n: number = 1) => {
  const nodes: ReactNode[] = [];
  for (let i = 0; i < n; i += 1) {
    const C = type === 'fc' ? createHeavyFlowContainer(i) : createHeavyChameleon(i);
    nodes.push(<C />);
  }
  return nodes;
};
