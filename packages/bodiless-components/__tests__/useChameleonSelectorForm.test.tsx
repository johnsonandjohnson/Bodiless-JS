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

import { Fragment } from 'react';
import { componentSelectorForm } from '@bodiless/layouts';
import { useChameleonSelectorForm } from '../src';

jest.mock('@bodiless/layouts');

const contextValue = {
  isOn: true,
  activeComponent: 'Foo',
  components: {
    Foo: Fragment,
    Bar: Fragment,
  },
  selectableComponents: {
    Foo: Fragment,
    Bar: Fragment,
  },
  setActiveComponent: jest.fn(),
};

jest.mock('../src/Chameleon/withChameleonContext', () => ({
  useChameleonContext: jest.fn(() => contextValue),
}));

describe('useChameleonSelectorForm', () => {
  const components = {
    Foo: Fragment,
    Bar: Fragment,
  };
  const props = {
    components,
    mandatoryCategories: ['foo'],
    blacklistCategories: ['bar'],
  };
  it('Passes correct arguments to component selector', () => {
    const test = useChameleonSelectorForm(props);
    test.handler();
    // @ts-ignore
    const { mock } = componentSelectorForm;
    expect(mock.calls.length).toBe(1);
    expect(mock.calls[0][0].mandatoryCategories).toEqual(props.mandatoryCategories);
    expect(mock.calls[0][0].blacklistCategories).toEqual(props.blacklistCategories);
    expect(mock.calls[0][0].components).toEqual(props.components);
    mock.calls[0][0].onSelect(['Foo']);

    expect(contextValue.setActiveComponent.mock.calls.length).toBe(1);
    expect(contextValue.setActiveComponent.mock.calls[0][0]).toEqual('Foo');
  });
});
