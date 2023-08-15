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

import React, { ComponentType } from 'react';
import type { FC } from 'react';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { withNode } from '@bodiless/data';

import { ComponentSelector, ComponentDisplayMode } from '@bodiless/layouts';
import { componentSelectorUi } from '@bodiless/layouts-ui';
import {
  designable, flowHoc, addProps, DesignableComponentsProps, removeClasses, HOC,
} from '@bodiless/fclasses';
import type { ComponentSelectorProps, ComponentWithMeta } from '@bodiless/layouts';
import Layout from '../../../components/Layout';
import withDefaultVariations from '../../../components/FlowContainer/withDefaultVariations';

type StyleGuideProps =
  Omit<ComponentSelectorProps, 'components'|'onSelect'> & DesignableComponentsProps;

const withNodeKeyFromItemId: HOC = Component => {
  const WithNodeKeyFromDisplayName: FC<any> = props => (
    // eslint-disable-next-line react/destructuring-assignment
    <Component {...props} nodeKey={props['data-item-id']} />
  );
  return WithNodeKeyFromDisplayName;
};

const StyleGuideBase: FC<StyleGuideProps> = props => {
  const { components } = props;
  const ui = {
    ...componentSelectorUi,
    MasterWrapper: removeClasses(
      'bl-form-wrapper',
    )(componentSelectorUi.MasterWrapper as ComponentType<any>),
    ComponentSelectButton: () => null,
    ComponentSelectorWrapper: removeClasses(
      'bl-text-white',
    )(componentSelectorUi.ComponentSelectorWrapper as ComponentType<any>),
    ItemBox: flowHoc(
      withNode, withNodeKeyFromItemId,
    )(componentSelectorUi.ItemBox as ComponentType<any>),
  };
  const onSelect = () => null;
  const finalProps: ComponentSelectorProps = {
    ...props,
    components: Object.values(components) as ComponentWithMeta[],
    onSelect,
    ui,
    mode: ComponentDisplayMode.EditFlowContainer,
  };
  return (
    <ComponentSelector {...finalProps} />
  );
};

const StyleGuide = flowHoc(
  designable({}, 'StyleGuide'),
  withDefaultVariations,
  addProps({
    mandatoryCategories: ['Type'],
    onSelect: () => null,
  }),
)(StyleGuideBase);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Styleguide</h1>
      <StyleGuide />
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
