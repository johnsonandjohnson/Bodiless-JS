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
import { Img, withDesign, addProps } from '@bodiless/fclasses';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { mount } from 'enzyme';
import flow from 'lodash/flow';
import asGatsbyImage from '../src/dist/GatsbyImage/asGatsbyImage';

const fluidShapeMock = {
  aspectRatio: 1.5,
  src: 'test_image.jpg',
  srcSet: 'some srcSet',
  srcSetWebp: 'some srcSetWebp',
  sizes: '(max-width: 600px) 100vw, 600px',
  base64: 'string_of_base64',
};

describe('asGatsbyImage', () => {
  describe('when gatsbyImg prop is passed', () => {
    it('renders GatsbyImage component', () => {
      const Foo = asGatsbyImage(Img);
      const props = {
        gatsbyImg: {
          fluid: fluidShapeMock,
        },
      };
      const wrapper = mount(<Foo {...props} />);
      expect(wrapper.find('Image').length).toBe(1);
    });
  });
  describe('when gatsbyImg prop is not passed', () => {
    it('renders standard image', () => {
      const Foo = asGatsbyImage(Img);
      const wrapper = mount(<Foo />);
      expect(wrapper.find('img').length).toBe(1);
    });
  });
  it('allows adjusting GatsbyImage using design API', () => {
    const testGatsbyImgStyle = {
      borderWidth: 1,
    };
    const Foo = flow(
      asGatsbyImage,
      withDesign({
        GatsbyImage: addProps({
          style: testGatsbyImgStyle,
        }),
      }),
    )(Img);
    const props = {
      gatsbyImg: {
        fluid: fluidShapeMock,
      },
    };
    const wrapper = mount(<Foo {...props} />);
    expect(wrapper.find('Image').prop('style')).toBe(testGatsbyImgStyle);
    const wrapper$ = mount(<Foo />);
    expect(wrapper$.find('img').prop('style')).toBe(undefined);
  });
  it('allows adjusting standard image using design API', () => {
    const testGatsbyImgStyle = {
      borderWidth: 1,
    };
    const Foo = flow(
      asGatsbyImage,
      withDesign({
        Image: addProps({
          style: testGatsbyImgStyle,
        }),
      }),
    )(Img);
    const props = {
      gatsbyImg: {
        fluid: fluidShapeMock,
      },
    };
    const wrapper = mount(<Foo {...props} />);
    expect(wrapper.find('Image').prop('style')).toBe(undefined);
    const wrapper$ = mount(<Foo />);
    expect(wrapper$.find('img').prop('style')).toBe(testGatsbyImgStyle);
  });
});
