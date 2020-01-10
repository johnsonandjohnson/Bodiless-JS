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

import React, { ComponentType as CT } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow, mount } from 'enzyme';

type BVProps = {
  productId: string | number;
};

jest.mock('../src/components/BVLoader');
jest.mock('../src/components/asBVComponent', () => ({
  asDesignableBVComponent: (
    name: string,
    onLoaded: (bvprops: BVProps) => void,
  ) => (Component: CT) => (props: any) => {
    const { productId } = props;
    onLoaded({ productId });
    return <Component {...props} />;
  },
}));
jest.mock('../src/components/asEditableBV');

const creatBVReviews = () => {
  let BVReviews;
  // @ts-ignore no types defined for jest.isolateModules
  jest.isolateModules(() => {
    // eslint-disable-next-line global-require,prefer-destructuring
    BVReviews = require('../src/components/v1/BVReviews').BVReviewsBase;
  });
  return BVReviews;
};

describe('bv reviews', () => {
  it('renders according to BV specification', () => {
    const BVReviews = creatBVReviews();
    // @ts-ignore
    const wrapper = shallow(<BVReviews productId="123" />);
    expect(wrapper.html()).toBe('<div id="BVRRContainer"></div>');
  });
  it('triggers $BV.ui method once $BV is initialized', () => {
    // @ts-ignore
    window.$BV = {};
    // @ts-ignore
    const BVMock = window.$BV.ui = jest.fn(); // eslint-disable-line no-multi-assign
    const BVReviews = creatBVReviews();
    const testProductId = 123;
    // @ts-ignore
    mount(<BVReviews productId={testProductId} />);
    expect(BVMock.mock.calls[0][0]).toBe('rr');
    expect(BVMock.mock.calls[0][1]).toBe('show_reviews');
    expect(BVMock.mock.calls[0][2]).toStrictEqual({ productId: testProductId });
  });
});
