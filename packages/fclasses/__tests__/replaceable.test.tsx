/* eslint-disable react/destructuring-assignment */
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
import React, { ComponentType } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import { replaceable, startWith } from '../src/Design';

describe('replaceable', () => {
  it('should replace a component if wraped with startWith', () => {
    const Base = () => <div>base</div>;
    const Replaceable = replaceable(Base);
    const wrapper = mount(<Replaceable />);
    expect(wrapper.text()).toBe('base');
    const Replacement = () => <div>replacement</div>;
    const Sub = startWith(Replacement)(Replaceable);
    const wrapper2 = mount(<Sub />);
    expect(wrapper2.text()).toBe('replacement');
  });
  it('should replace a component and still keep hocs', () => {
    type Props = {
      text?: string,
    };
    // eslint-disable-next-line react/jsx-one-expression-per-line
    const Base = (props:Props) => <div>base{props.text}</div>;
    // eslint-disable-next-line react/jsx-one-expression-per-line
    const Replacement = (props:Props) => <div>replacement{props.text}</div>;
    const testHOC = (Component: ComponentType<any>) => () => <Component text="hoc" />;
    const Replaceable = replaceable(Base);
    const TestComponent = testHOC(Replaceable);
    const Sub = startWith(Replacement)(TestComponent);
    const wrapper = mount(<Sub />);
    expect(wrapper.text()).toBe('replacementhoc');
  });
});
