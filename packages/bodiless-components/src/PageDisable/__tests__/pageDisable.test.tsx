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

import React from 'react';
import { render, mount } from 'enzyme';
import { PageEditContext } from '@bodiless/core';
import { asToken, A, HOC } from '@bodiless/fclasses';
import { asBodilessLink } from '../../Link';
import { withMockNode } from '../../../__tests__/helpers/MockContentNode';
import { PageDisabledDataItems } from '../types';

const mockDisabledPages: PageDisabledDataItems = {
  '/all-disabled/': {
    pageDisabled: true,
    menuLinksDisabled: true,
    contentLinksDisabled: true,
    indexingDisabled: true,
  },
  '/disabled-menu-links/': {
    pageDisabled: false,
    menuLinksDisabled: true,
    contentLinksDisabled: false,
    indexingDisabled: false,
  },
  '/disabled-content-links/': {
    pageDisabled: true,
    menuLinksDisabled: false,
    contentLinksDisabled: true,
    indexingDisabled: false,
  },
  '/all-enabled/': {
    pageDisabled: false,
    menuLinksDisabled: false,
    contentLinksDisabled: false,
    indexingDisabled: false,
  },
};

const withPageLink = (pagePath: string) => asToken(
  asBodilessLink(),
  withMockNode({ href: pagePath, disabled: mockDisabledPages }, ['Page']) as HOC,
)(A);

describe('Disabled page', () => {
  const PageLink1 = withPageLink('/all-disabled/');
  const PageLink2 = withPageLink('/disabled-content-links/');
  const PageLink3 = withPageLink('/disabled-menu-links/');
  const PageLink4 = withPageLink('/all-enabled/');
  const wrapper1 = render(<PageLink1 />);
  const wrapper2 = render(<PageLink2 />);
  const wrapper3 = render(<PageLink3 />);
  const wrapper4 = render(<PageLink4 />);
  describe('Disabled content (non-menu) link', () => {
    it('Renders without "href" if the link leads to disabled page', () => {
      expect(wrapper1.prop('href')).toBeUndefined();
      expect(wrapper2.prop('href')).toBeUndefined();
    });
    it('Renders as usual link if only menu links are disabled for current page', () => {
      expect(wrapper3.prop('href')).toBeDefined();
    });
    it('Renders as usual link if all page disabling options are enabled', () => {
      expect(wrapper4.prop('href')).toBeDefined();
    });
    it('Does not highlight disabled links in preview mode', () => {
      const wrapper1 = mount(<PageLink1 />);
      expect(wrapper1.hasClass('bl-link-disabled')).toBeFalsy();
    });
    it('Highlights disabled links in edit mode', () => {
      let mockIsEdit: jest.SpyInstance;
      mockIsEdit = jest.spyOn(PageEditContext.prototype, 'isEdit', 'get').mockReturnValue(true);
      const wrapper1 = mount(<PageLink1 />);
      expect(wrapper1.render().hasClass('bl-link-disabled')).toBeTruthy();
      mockIsEdit.mockRestore();
    });
  });
});
