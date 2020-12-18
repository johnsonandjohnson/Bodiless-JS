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
import { shallow, mount } from 'enzyme';
import { PageEditContext } from '@bodiless/core';
import HoverMenu, { HoverMenuProps } from '../src/core/HoverMenu';

jest.mock('slate-react', () => ({
  useSlate: () => ({
    editor: {
      selection: [],
    },
  }),
}));

const setupPageEditContext = (isEdit: boolean): PageEditContext => {
  const pageEditContext = new PageEditContext();
  Object.defineProperty(pageEditContext, 'isEdit', { value: isEdit });
  return pageEditContext;
};

describe('hover menu', () => {
  it('should render', () => {
    const wrapper = shallow(<HoverMenu />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should have id, children and className', () => {
    const pageEditContext = setupPageEditContext(true);
    const content = Math.random();
    const props: HoverMenuProps = {
      className: 'fooClass',
    };

    const wrapper = mount(
      <PageEditContext.Provider value={pageEditContext}>
        <HoverMenu {...props}>
          {content}
        </HoverMenu>
      </PageEditContext.Provider>,
    );

    const div = wrapper.find('HoverMenu').find('div');
    const { className, id } = div.props();
    expect(id).toContain('hover-menu-');
    expect(className).toEqual(props.className);
    expect(div.text()).toEqual(content.toString());
  });
});
