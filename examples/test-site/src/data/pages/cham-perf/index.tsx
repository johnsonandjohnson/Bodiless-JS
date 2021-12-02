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

import React from 'react';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  addClasses, H2, withDesign,
  addProps, Div,
  asToken,
  varyDesigns,
  startWith,
  HOC,
} from '@bodiless/fclasses';
import {
  asBodilessChameleon
} from '@bodiless/components';
import {
  useChameleonSelectorForm,
} from '@bodiless/components-ui';
import Layout from '../../../components/Layout';


const toggleDesign = {
  Blue: addClasses('bg-blue-500'),
};

const lightDesign = {
  Blue: addClasses('bg-blue-500'),
  Red: addClasses('bg-red-500'),
};

export const spawnDesign = (i: number) => {
  let design = {};
  for (i;  i > 0; i--) {
    design[`d${i}`] = addClasses(`d-${i}`);
  }
  return design;
};

const colors = ['red', 'blue', 'teal', 'green', 'yellow', 'purple', 'orange'];
const createColorDesign = (prefix: string) => colors.reduce(
  (acc, next) => ({
    ...acc,
    [`${prefix}${next}4`]: asToken(addClasses(`${prefix}-${next}-400`), asToken.meta.term(prefix)(`${prefix}-${next}`)),
  }),
  {},
);
const Box = asToken(
  addClasses('p-2 border-2'),
)(Div);

const createTextDesign = (n: number) => {
  const design: any = {};
  for (var i = 0; i < n; i++) {
    design[`Text${i}`] = asToken(
      addProps({ children: `Foo ${i}` }),
      asToken.meta.term('Copy')(`${i}`),
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
  // createTextDesign(5), // 1715 items // ≈ 11 sec
  createTextDesign(10) // 3430 items // ≈ 19 sec
  // createTextDesign(20) // 6860 items // ≈ 80 sec
);

/*
 * Primitive Chamelion
 */
const PrimitiveChameleon = asToken(
  asBodilessChameleon('primitive-chameleon', undefined, useChameleonSelectorForm),
  // asBodilessChameleon('primitive-chameleon'),
  // withDesign(toggleDesign),
  withDesign(lightDesign), // 2 items // ≈ 3 sec
  // withDesign(heavyDesign),
  // withDesign(spawnDesign(2000)), // ≈ 8 sec
  // withDesign(spawnDesign(4000)), // ≈ 20 sec
  // withDesign(spawnDesign(4000))
)(Box);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <H2>Primitive Chameleon</H2>
      <PrimitiveChameleon>
        <div>Chameleon</div>
      </PrimitiveChameleon>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
    ...DefaultContentQuery
  }
`;
