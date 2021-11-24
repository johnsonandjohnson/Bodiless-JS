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

import React, { ReactNode, FC } from 'react';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import Layout from '../../../components/Layout';
import { addClasses, Div, asToken, startWith, varyDesigns, withDesign, addProps, HOC } from '@bodiless/fclasses';
import { FlowContainer } from '@bodiless/layouts-ui';
import pick from 'lodash/pick';

const colors = ['red', 'blue', 'teal', 'green', 'yellow', 'purple', 'orange'];
const createColorDesign = (prefix: string) => colors.reduce(
  (acc, next) => ({
    ...acc,
    [`${prefix}${next}4`]: asToken(addClasses(`${prefix}-${next}-400`), asToken.meta.term(prefix)(`${prefix}-${next}`)),
  }),
  {},
);
const Box = asToken(
  addClasses('w-12 h-12 p-2 border-2'),
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
const finalDesign = varyDesigns(
  baseDesign,
  createColorDesign('bg'),
  createColorDesign('border'),
  createColorDesign('text'),
  createTextDesign(10),
);

export const withPrunedDesign: HOC = Component => {
  const WithPrunedDesign: FC<any> = props => {
    const { design } = props;
    const newDesign = pick(design, 'Wrapper', 'ComponentWrapper');
    return <Component {...props} design={newDesign} />;
  };
  return WithPrunedDesign;
};

const HeavyFlowContainer = asToken(
  // withPrunedDesign,
  withDesign(finalDesign),
)(FlowContainer);

const getContainers = (n: number) => {
  let nodes: ReactNode[] = [];
  for (var i = 0; i < n; i++) {
    nodes.push(
      <HeavyFlowContainer nodeKey={`fc-${i}`} key={i} />
    );
  }
  return nodes;
};


export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Flow Container Performance Page</h1>
      <div>
        {getContainers(20)}
      </div>
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
