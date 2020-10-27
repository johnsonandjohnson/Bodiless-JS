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

import { DefaultContentNode, NodeProvider } from '@bodiless/core';
import React, { ComponentType, FC, Fragment } from 'react';
import { observer } from 'mobx-react-lite';
import { flow } from 'lodash';
import { mount } from 'enzyme';
import asBreadcrumb, { BreadcrumbContext, useBreadcrumbContext } from '../src/asBreadcrumb';

describe('BreadcrumbContext', () => {
  describe('activate', () => {
    const foo = new BreadcrumbContext('foo');
    const foobar = foo.spawn('bar');
    const foobarbing = foobar.spawn('bing');
    const foobaz = foo.spawn('baz');

    it('Activates itself', () => {
      foo.activate();
      expect(foo.isActive).toBeTruthy();
    });

    it('Axctivates all ancestors', () => {
      foo.activate();
      foobarbing.activate();
      expect(foobarbing.isActive).toBeTruthy();
      expect(foobar.isActive).toBeTruthy();
      expect(foo.isActive).toBeTruthy();
    });

    it('does not activate non ancestors', () => {
      foobarbing.activate();
      foobaz.activate();
      expect(foobaz.isActive).toBeTruthy();
      expect(foobarbing.isActive).toBeFalsy();
      expect(foobar.isActive).toBeFalsy();
      expect(foo.isActive).toBeTruthy();
    });

    it('does not deactivate descendants', () => {
      foobar.activate();
      foo.activate();
      expect(foobar.isActive).toBeTruthy();
    });
  });

  describe('spawn', () => {
    it('creates a new instance with correct parent', () => {
      const parent = new BreadcrumbContext('/foo/bar');
      const child = parent.spawn('/baz');
      expect(child.parent).toBe(parent);
      expect(child.url.pathname).toBe('/baz');
    });
  });
  describe('isAncestorOf', () => {
    it('Returns true when page is an ancestor', () => {
      const parent = new BreadcrumbContext('/foo/bar');
      const child = new BreadcrumbContext('/baz/bing', parent);
      expect(parent.isAncestorOf(child)).toBeTruthy();
    });
    it('Returns false when page is not ancestor', () => {
      const parent = new BreadcrumbContext('/foo/bar');
      const child = new BreadcrumbContext('/baz/bing', parent);
      expect(child.isAncestorOf(parent)).toBeFalsy();
    });
  });
  describe('isSubpathOf', () => {
    it('Returns false when urls have difffeent domains', () => {
      const parent = new BreadcrumbContext('http://other.com/foo/bar');
      const child = new BreadcrumbContext('foo/bar/baz');
      expect(child.isSubpathOf(parent)).toBeFalsy();
    });
    it('Returns true when path is a subpath', () => {
      const parent = new BreadcrumbContext('foo/bar');
      const child = new BreadcrumbContext('foo/bar/baz');
      expect(child.isSubpathOf(parent)).toBeTruthy();
    });
    it('Returns true when paths are the same', () => {
      const parent = new BreadcrumbContext('foo/bar');
      const child = new BreadcrumbContext('foo/bar');
      expect(child.isSubpathOf(parent)).toBeTruthy();
    });
    it('Returns false when path is not a subpath', () => {
      const parent = new BreadcrumbContext('foo/bar');
      const child = new BreadcrumbContext('foo');
      expect(child.isSubpathOf(parent)).toBeFalsy();
    });
  });
});

describe('asBreadcrumb', () => {
  const withPagePath = (pagePath: string, linkData: any) => (Component: ComponentType<any>) => {
    const MockNodeProvider: FC<any> = props => {
      const getters = {
        getNode: jest.fn(() => linkData),
        hasError: jest.fn(),
        getKeys: jest.fn(),
        getPagePath: jest.fn(() => pagePath),
        getBaseResourcePath: jest.fn(),
      };
      const actions = {
        setNode: jest.fn(),
        deleteNode: jest.fn(),
      };
      const mockNode = new DefaultContentNode(actions, getters, '');
      return (
        <NodeProvider node={mockNode}>
          <Component {...props} />
        </NodeProvider>
      );
    };
    return MockNodeProvider;
  };

  const Consumer = observer(({ id = 'test' }: any) => {
    const { isActive } = useBreadcrumbContext();
    return <span id={id}>{isActive ? 'active' : 'inactive'}</span>;
  });

  it('Activates the breadcrumb for a link which matches the current page', () => {
    const Test = flow(
      asBreadcrumb(),
      withPagePath('/foo/bar', { href: '/foo/bar' }),
    )(Consumer);
    const wrapper = mount(<Test />);
    expect(wrapper.text()).toBe('active');
  });

  it('Does not activate the breadcrumb for a link which does not match current page', () => {
    const Test = flow(
      asBreadcrumb(),
      withPagePath('/foo/bar', { href: '/foo/bar/baz' }),
    )(Consumer);
    const wrapper = mount(<Test />);
    expect(wrapper.text()).toBe('inactive');
  });

  it('Correctly activates all breadcrumbs in a chain', () => {
    const Outer = flow(
      asBreadcrumb(),
      withPagePath('/foo/bar', { href: '/baz' }),
    )(Fragment);
    const Inner = flow(
      asBreadcrumb(),
      withPagePath('/foo/bar', { href: '/foo/bar' }),
    )(Fragment);
    const Test = () => (
      <Outer>
        <Consumer id="outer" />
        <Inner>
          <Consumer id="inner" />
        </Inner>
      </Outer>
    );
    const wrapper = mount(<Test />);
    expect(wrapper.find('span#outer').text()).toBe('active');
    expect(wrapper.find('span#inner').text()).toBe('active');
  });

  it('Does not activate a breadcrumb which is not a parent', () => {
    const Outer = flow(
      asBreadcrumb(),
      withPagePath('/foo/bar', { href: '/foo' }),
    )(Fragment);
    const Inner = flow(
      asBreadcrumb(),
      withPagePath('/foo/bar', { href: '/foo/bar' }),
    )(Fragment);
    const Test = () => (
      <>
        <Outer>
          <Consumer id="outer" />
        </Outer>
        <Inner>
          <Consumer id="inner" />
        </Inner>
      </>
    );
    const wrapper = mount(<Test />);
    expect(wrapper.find('span#outer').text()).toBe('inactive');
    expect(wrapper.find('span#inner').text()).toBe('active');
  });
});
