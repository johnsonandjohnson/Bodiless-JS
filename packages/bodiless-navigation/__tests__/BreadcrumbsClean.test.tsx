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

import React, { ComponentType } from 'react';
import { mount } from 'enzyme';
import { asReadOnly } from '@bodiless/core';
import {
  withDesign, addProps, withoutProps, HOC,
} from '@bodiless/fclasses';
import { flowRight } from 'lodash';
import { BreadcrumbsClean, withBreadcrumbStartingTrail, withoutBreadcrumbFinalTrail } from '../src/Breadcrumbs';
import { withMenuTitleEditors } from '../src';

const withAttrRename = (oldAttr: string, newAttr: string) => (Component: ComponentType) => {
  const WithAttrRename = (props: any) => {
    const { [oldAttr]: oldAttrVal, ...rest } = props;
    const props$ = {
      ...rest,
      [newAttr]: oldAttrVal,
    };
    return <Component {...props$} />;
  };
  return WithAttrRename;
};

const TestBreadcrumbs = flowRight(
  withMenuTitleEditors(undefined, asReadOnly),
)(BreadcrumbsClean);

describe('BreadcrumbsClean', () => {
  it('renders as empty unordered list by default', () => {
    const wrapper = mount(<TestBreadcrumbs />);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('allows adding starting trail and design it using design api', () => {
    const Breadcrumb = flowRight(
      withDesign({
        StartingTrail: addProps({
          'aria-label': 'starting-trail',
        }),
      }),
      withBreadcrumbStartingTrail,
    )(TestBreadcrumbs);
    const wrapper = mount(<Breadcrumb />);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it.skip('allows passing items as a prop', () => {
    const items = [
      {
        uuid: Math.random(),
        link: {
          nodeKey: 'linkNodeKey1',
        },
        title: {
          nodeKey: 'titleNodeKey1',
        },
      },
      {
        uuid: Math.random(),
        link: {
          nodeKey: 'linkNodeKey1',
        },
        title: {
          nodeKey: 'titleNodeKey1',
        },
      },
    ];
    const Breadcrumb = flowRight(
      withDesign({
        Link: flowRight(
          withAttrRename('nodeKey', 'href'),
          withoutProps('nodeCollection'),
        ),
        Title: flowRight(
          withAttrRename('nodeKey', 'aria-label'),
          withoutProps('nodeCollection'),
        ),
      }),
    )(TestBreadcrumbs);
    const wrapper = mount(<Breadcrumb items={items} />);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it.skip('allows designing separator using design api', () => {
    const items = [
      {
        uuid: Math.random(),
        link: {
          nodeKey: 'linkNodeKey1',
        },
        title: {
          nodeKey: 'titleNodeKey1',
        },
      },
      {
        uuid: Math.random(),
        link: {
          nodeKey: 'linkNodeKey1',
        },
        title: {
          nodeKey: 'titleNodeKey1',
        },
      },
    ];
    const Breadcrumb = flowRight(
      withDesign({
        Link: flowRight(
          withAttrRename('nodeKey', 'href'),
          withoutProps('nodeCollection'),
        ),
        Title: flowRight(
          withAttrRename('nodeKey', 'aria-label'),
          withoutProps('nodeCollection'),
        ),
        Separator: addProps({
          className: 'separator',
        }),
      }),
    )(TestBreadcrumbs);
    const wrapper = mount(<Breadcrumb items={items} />);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it.skip('does not render separator after last item when final trail is not set', () => {
    const items = [
      {
        uuid: Math.random(),
        link: {
          nodeKey: 'linkNodeKey1',
        },
        title: {
          nodeKey: 'titleNodeKey1',
        },
      },
    ];
    const Breadcrumb = (flowRight(
      withDesign({
        Link: flowRight(
          withAttrRename('nodeKey', 'href'),
          withoutProps('nodeCollection'),
        ),
        Title: flowRight(
          withAttrRename('nodeKey', 'aria-label'),
          withoutProps('nodeCollection'),
        ),
      }),
      withoutBreadcrumbFinalTrail,
    ) as HOC<any>)(TestBreadcrumbs);
    const wrapper = mount(<Breadcrumb items={items} />);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
