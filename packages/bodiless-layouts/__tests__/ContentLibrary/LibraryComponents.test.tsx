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
import React, { FC, ComponentType as CT } from 'react';
import {
  shallow,
  mount,
} from 'enzyme';
import { v1 } from 'uuid';
import {
  withNode,
  useNode,
  withDefaultContent,
} from '@bodiless/data';

import {
  flowHoc,
  withDesign,
  startWith,
} from '@bodiless/fclasses';
// import type {ContentNode } from '@bodiless/data';
import {
  withTitle,
  withDesc,
  withFacet,
} from '../../src/meta';
import { withLibraryComponents } from '../../src/ContentLibrary/withLibraryComponents.bl-edit';
import { CONTENT_LIBRARY_TYPE_PREFIX } from '../../src/ContentLibrary/withLibraryContext';
import EditFlowContainer, { EditFlowContainerComponents } from '../../src/FlowContainer/EditFlowContainer';

// Mock method (from appendTailwindWidthClass.ts) which are not implemented in JSDOM. See
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const withType = withFacet('Type');

const Foo1: FC<any> = () => {
  const { node } = useNode();
  return (<i>{node.data.toString()}</i>);
};
Foo1.displayName = 'Foo1';
const variants1 = {
  foo1: flowHoc(
    startWith(Foo1),
  ),
  foo2: flowHoc(
    startWith(() => <></>),
  ),
};
const variants2 = {
  foo3: flowHoc(
    startWith(() => (<span>V3</span>)),
    withType('Type v3')(),
    withTitle('Title v3'),
    withDesc('Desc v3'),
  ),
};
const libItemUuid = v1();
const regularItemUuid = v1();
const libDesignType1 = `${CONTENT_LIBRARY_TYPE_PREFIX}:foo1:${libItemUuid}`;

// Mock node data for flow container testing.
const mockFlowContainerContent = {
  // FC data
  fc: {
    items: [
      {
        uuid: regularItemUuid,
        type: 'foo1',
      },
      {
        uuid: libItemUuid,
        type: libDesignType1,
      },
    ],
  },

  // Regular item data
  [`fc$${regularItemUuid}`]: 'Bar1',

  // Content library item data
  [`my_lib$${libItemUuid}`]: {
    title: 'Content lib title',
    description: 'Content lib description',
    componentKey: 'foo1',
  },
  [`my_lib$${libItemUuid}$data`]: 'Bar2',
};

describe('withLibraryComponents', () => {
  beforeEach(() => {
  });

  it('adds empty design if no content library data exists.', () => {
    const ComponentWithLibrary = withLibraryComponents(undefined, '_default')(EditFlowContainer);
    const wrapper = shallow(<ComponentWithLibrary />);
    expect(wrapper.props()).toEqual(expect.objectContaining({ design: {} }));
  });

  it('keeps design added from other FC design variants.', () => {
    const design$a = {
      foo1: flowHoc(),
      foo2: flowHoc(),
    };
    const design$b = {
      foo3: flowHoc(),
    };
    const ComponentWithLibrary = flowHoc(
      withDesign(design$a),
      withLibraryComponents(undefined, '_default'),
      withDesign(design$b),
    )(EditFlowContainer);
    const wrapper = mount(<ComponentWithLibrary />);
    const designKeys = Object.keys(wrapper.find(EditFlowContainer).prop('design')).sort();
    const expectedKeys = ['foo1', 'foo2', 'foo3'];
    expect(designKeys).toEqual(expect.arrayContaining(expectedKeys));
  });

  it('adds library design to edit flow container.', () => {
    // Cast ComponentWrapper type to fit ReactWrapper find param types.
    const { ComponentWrapper } = EditFlowContainerComponents as {
      Wrapper: CT<any>,
      ComponentWrapper: CT<any>,
    };

    const FlowContainerWithLibrary = flowHoc(
      withNode,
      withLibraryComponents(['root', 'my_lib'], '_default'),
      withDesign(variants1),
      withDesign(variants2),
      withDefaultContent(mockFlowContainerContent),
    )(EditFlowContainer);

    const wrapper = mount(<FlowContainerWithLibrary nodeKey="fc" />);
    const designKeys = Object.keys(wrapper.find(EditFlowContainer).prop('design')).sort();
    const expectedKeys = [
      'ComponentWrapper',
      libDesignType1,
      'foo1',
      'foo2',
      'foo3',
    ];
    expect(designKeys).toEqual(expect.arrayContaining(expectedKeys));
    expect(wrapper.find(ComponentWrapper)).toHaveLength(2);

    // Renders regular item content.
    expect(wrapper.find(ComponentWrapper).first().text()).toEqual('Bar1');
    // Renders content library item content.
    expect(wrapper.find(ComponentWrapper).last().text()).toEqual('Bar2');
  });
});
