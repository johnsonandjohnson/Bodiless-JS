/**
 * Copyright © 2020 Johnson & Johnson
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
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount, ReactWrapper } from 'enzyme';
// eslint-disable-next-line import/no-extraneous-dependencies
import cheerio from 'cheerio';
import { withDefaultContent, withSidecarNodes, ifToggledOn } from '@bodiless/core';
import {
  asBodilessLink, asEditable, withBreadcrumbStartingTrail, Breadcrumbs, withBreadcrumbStore,
} from '@bodiless/components';
import {
  replaceWith,
  withDesign,
  addProps,
} from '@bodiless/fclasses';
import { flowRight } from 'lodash';
import type { BreadcrumbStoreItemsReducer } from '@bodiless/components';

import {
  asMenuBase,
  asBreadcrumbSource,
} from '../src/components/Menu/SimpleMenu';

const { DefaultContentNode } = require('@bodiless/core');

const setPagePath = (pagePath: string) => {
  Object.defineProperty(DefaultContentNode.prototype, 'pagePath', {
    value: pagePath,
    writable: false,
  });
};

const createBreadcrumbComponent = ({
  content = {},
}) => {
  const Source = flowRight(
    asBreadcrumbSource({
      linkNodeKey: 'title$link',
      titleNodeKey: 'title$text',
    }),
    asMenuBase('testMenu'),
  )('ul');

  const BreadcrumbComponent = (props: any) => (
    <>
      <Source />
      <Breadcrumbs {...props} />
    </>
  );

  return flowRight(
    withDefaultContent(content),
    withDesign({
      // @ts-ignore
      BreadcrumbLink: replaceWith(withSidecarNodes(
        asBodilessLink(),
      ))('a'),
      BreadcrumbTitle: replaceWith(
        asEditable()(React.Fragment),
      ),
    }),
    withBreadcrumbStore,
  )(BreadcrumbComponent);
};

// Helper to get the html of only the breadcrumbs.
const breadcrumbHtml = (wrapper: ReactWrapper) => {
  // We use cheerio directly here bc using enzyme's 'render'
  // method generates warnings about not using layout
  // effects on the server.
  const $ = cheerio.load(wrapper.html());
  return $.html($('body>ul').last());
};

const generate2LevelMenuContent = () => ({
  testMenu: {
    items: [
      'home',
      'products',
      'articles',
    ],
  },
  testMenu$home$title$link: {
    href: '/',
  },
  testMenu$home$title$text: {
    text: 'home',
  },
  testMenu$products$title$link: {
    href: '/products',
  },
  testMenu$products$title$text: {
    text: 'products',
  },
  testMenu$products$sublist: {
    items: [
      'productA',
      'productB',
    ],
  },
  'testMenu$products$cham-sublist': {
    component: 'SubMenu',
  },
  testMenu$products$sublist$productA$title$link: {
    href: '/products/productA',
  },
  testMenu$products$sublist$productA$title$text: {
    text: 'productA',
  },
  testMenu$products$sublist$productB$title$link: {
    href: '/products/productB',
  },
  testMenu$products$sublist$productB$title$text: {
    text: 'productB',
  },
  testMenu$articles$title$link: {
    href: '/articles',
  },
  testMenu$articles$title$text: {
    text: 'articles',
  },
  testMenu$articles$sublist: {
    items: [
      'articleA',
    ],
  },
  testMenu$articles$sublist$articleA$title$link: {
    href: '/articles/articleA',
  },
  testMenu$articles$sublist$articleA$title$text: {
    text: 'articleA',
  },
});

describe('asBreadcrumbsClean', () => {
  it('creates breadcrumbs for basic 1-level menu', () => {
    setPagePath('/products');
    const Breadcrumb = createBreadcrumbComponent({
      content: {
        testMenu: {
          items: [
            'home',
            'products',
            'articles',
          ],
        },
        testMenu$home$title$link: {
          href: '/',
        },
        testMenu$home$title$text: {
          text: 'home',
        },
        testMenu$products$title$link: {
          href: '/products',
        },
        testMenu$products$title$text: {
          text: 'products',
        },
        testMenu$articles$title$link: {
          href: '/articles',
        },
        testMenu$articles$title$text: {
          text: 'articles',
        },
      },
    });
    const wrapper = mount(<Breadcrumb />);
    expect(breadcrumbHtml(wrapper)).toMatchSnapshot();
  });
  it('creates breadcrumbs for basic 2-level menu', () => {
    setPagePath('/products/productA');
    const Breadcrumb = createBreadcrumbComponent({
      content: generate2LevelMenuContent(),
    });
    const wrapper = mount(<Breadcrumb />);
    expect(breadcrumbHtml(wrapper)).toMatchSnapshot();
  });
  it(`when starting trail enabled and
      when menu trail starts with frontpage
      then it does not render home link twice by default`,
  () => {
    setPagePath('/products');
    const Breadcrumb = createBreadcrumbComponent({
      content: {
        testMenu: {
          items: [
            'home',
          ],
        },
        testMenu$home$title$link: {
          href: '/',
        },
        testMenu$home$title$text: {
          text: 'home',
        },
        'testMenu$home$cham-sublist': {
          component: 'SubMenu',
        },
        testMenu$home$sublist$productA$title$link: {
          href: '/products',
        },
        testMenu$home$sublist$productA$title$title: {
          href: '/products',
        },
      },
    });
    const CustomBreadcrumb = flowRight(
      withDesign({
        StartingTrail: replaceWith(() => <span>home</span>),
      }),
      withBreadcrumbStartingTrail,
    )(Breadcrumb);
    const wrapper = mount(<CustomBreadcrumb />);
    expect(breadcrumbHtml(wrapper)).toMatchSnapshot();
  });
  it(`allows override default items reducer
      so that do not render the first item from menu trail`,
  () => {
    setPagePath('/products/productA');
    const Breadcrumb = createBreadcrumbComponent({
      content: generate2LevelMenuContent(),
    });
    const customReducer: BreadcrumbStoreItemsReducer = items => items
      .filter(item => !item.isFirst())
      .map(item => item.uuid);
    const wrapper = mount(<Breadcrumb itemsReducer={customReducer} />);
    expect(breadcrumbHtml(wrapper)).toMatchSnapshot();
  });
  it('renders last menu trail item as link when current page item does not exist in store', () => {
    setPagePath('/products/nonExistingProduct');
    const Breadcrumb = createBreadcrumbComponent({
      content: generate2LevelMenuContent(),
    });
    const wrapper = mount(<Breadcrumb />);
    expect(breadcrumbHtml(wrapper)).toMatchSnapshot();
  });
  it('allows to force rendering last breadcrumb item as link', () => {
    setPagePath('/products/productA');
    const Breadcrumb = createBreadcrumbComponent({
      content: generate2LevelMenuContent(),
    });
    const wrapper = mount(<Breadcrumb renderLastItemWithoutLink={false} />);
    expect(breadcrumbHtml(wrapper)).toMatchSnapshot();
  });
  it('allows styling current page item derived from menu', () => {
    setPagePath('/products/productA');
    const BaseBreadcrumbs = createBreadcrumbComponent({
      content: generate2LevelMenuContent(),
    });
    const TestBreadcrumbs = flowRight(
      withDesign({
        BreadcrumbItem: ifToggledOn(
          ({ isCurrentPage }: any) => isCurrentPage,
        )(addProps({ className: 'font-bold' })),
      }),
    )(BaseBreadcrumbs);
    const wrapper = mount(<TestBreadcrumbs />);
    expect(breadcrumbHtml(wrapper)).toMatchSnapshot();
  });
  it('does not apply current page styles to the item which is the last derived from the menu but not current page path', () => {
    setPagePath('/products/nonExistingProduct');
    const BaseBreadcrumbs = createBreadcrumbComponent({
      content: generate2LevelMenuContent(),
    });
    const TestBreadcrumbs = flowRight(
      withDesign({
        BreadcrumbItem: ifToggledOn(
          ({ isCurrentPage }: any) => isCurrentPage,
        )(addProps({ className: 'font-bold' })),
      }),
    )(BaseBreadcrumbs);
    const wrapper = mount(<TestBreadcrumbs />);
    expect(breadcrumbHtml(wrapper)).toMatchSnapshot();
  });
});
