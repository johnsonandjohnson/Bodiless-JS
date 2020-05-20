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

import { Fragment, FC } from 'react';
import { useEditContext, TMenuOption } from '@bodiless/core';
import { DesignableComponents } from '@bodiless/fclasses';
import { EditFlowContainerProps } from '../../src/FlowContainer/types';
import componentSelectorForm from '../../src/ComponentSelector/componentSelectorForm';
import { useItemHandlers, useFlowContainerDataHandlers } from '../../src/FlowContainer/model';
import useGetMenuOptions from '../../src/FlowContainer/useGetMenuOptions';

jest.mock('../../src/ComponentSelector/componentSelectorForm');
jest.mock('../../src/FlowContainer/model');

const editContext = {
  activate: jest.fn(),
  isEdit: true,
};
const activateOnEffect = {
  setId: jest.fn(),
};
const contextMenuFormInner = jest.fn();
jest.mock('@bodiless/core', () => ({
  useEditContext: jest.fn(() => editContext),
  useActivateOnEffect: jest.fn(() => activateOnEffect),
  useNode: jest.fn(),
  contextMenuForm: jest.fn(() => contextMenuFormInner),
}));

const Foo: FC = Fragment;
const Bar: FC = Fragment;
const components: DesignableComponents = { Foo, Bar };
const item = {
  uuid: 'foo',
  type: 'Foo',
  wrapperProps: {},
};

describe('useGetMenuOptions', () => {
  function setIsEdit(isEdit: boolean) {
    (useEditContext as jest.Mock).mockReturnValue(
      { ...useEditContext(), isEdit },
    );
  }


  function invokeAction(button: TMenuOption, selection: string) {
    // @ts-ignore
    button.handler();
    expect(componentSelectorForm).toHaveBeenCalledTimes(1);
    expect((componentSelectorForm as jest.Mock).mock.calls[0][0].components).toEqual(components);
    const action = (componentSelectorForm as jest.Mock).mock.calls[0][1];
    action(null, selection);
  }

  function expectDataHandlerCall(method: Function, args: any[]) {
    const mockedMethod = method as jest.Mock;
    expect(mockedMethod).toHaveBeenCalledTimes(1);
    args.forEach((arg, index) => {
      expect(mockedMethod.mock.calls[0][index]).toEqual(arg);
    });
  }

  beforeEach(() => {
    setIsEdit(true);
    jest.clearAllMocks();
  });

  describe('item getMenuOptions', () => {
    function getMenuOptions(maxComponents?: number) {
      const props: EditFlowContainerProps = {
        components,
      };
      if (maxComponents) {
        props.maxComponents = maxComponents;
      }
      return useGetMenuOptions(props, item)();
    }

    beforeEach(() => {
      const { getItems } = useItemHandlers();
      // @ts-ignore jest mock methods don't exist on mocked imports.
      getItems.mockReturnValue([
        {
          uuid: 'foo',
          type: 'Foo',
        },
        {
          uuid: 'bar',
          type: 'Bar',
        },
      ]);
    });

    it('Returns no buttons when edit mode is off', () => {
      setIsEdit(false);
      const options = getMenuOptions();
      expect(options).toHaveLength(0);
    });

    it('Returns an add button', () => {
      const { insertFlowContainerItem } = useFlowContainerDataHandlers();
      const options = getMenuOptions(3);
      const addButton = options.find(option => option.name === 'add');
      expect(addButton).not.toBeUndefined();
      invokeAction(addButton!, 'Baz');
      expectDataHandlerCall(insertFlowContainerItem, ['Baz', item]);
    });

    it('Does not return an add button when flow container is full', () => {
      const options = getMenuOptions(2);
      const addButton = options.find(option => option.name === 'add');
      expect(addButton).toBeUndefined();
    });

    it('Returns a delete button', () => {
      const { deleteFlowContainerItem } = useFlowContainerDataHandlers();
      const options = getMenuOptions();
      const button = options.find(option => option.name === 'delete');
      expect(button).not.toBeUndefined();
      // @ts-ignore
      button.handler();
      expectDataHandlerCall(deleteFlowContainerItem, ['foo']);
    });

    it('Returns a swap button', () => {
      const { updateFlowContainerItem } = useFlowContainerDataHandlers();
      const options = getMenuOptions();
      const button = options.find(option => option.name === 'swap');
      expect(button).not.toBeUndefined();
      invokeAction(button!, 'Bar');
      expectDataHandlerCall(updateFlowContainerItem, [{ ...item, type: 'Bar' }]);
    });
  });


  describe('flow container getMenuOptions', () => {
    function getMenuOptions() {
      const props = {
        components,
      };
      return useGetMenuOptions(props)();
    }

    it('Returns no buttons when edit mode is off', () => {
      setIsEdit(false);
      const options = getMenuOptions();
      expect(options).toHaveLength(0);
    });

    it('Returns no buttons for the flow container when it is not empty', () => {
      const { getItems } = useItemHandlers();
      // @ts-ignore jest mock methods don't exist on mocked imports.
      getItems.mockReturnValue([{
        uuid: 'foo',
        type: 'Foo',
      }]);
      const options = getMenuOptions();
      expect(options).toHaveLength(0);
    });
    it('Returns a single add button for the flow container when it is empty', () => {
      const { getItems } = useItemHandlers();
      // @ts-ignore jest mock methods don't exist on mocked imports.
      getItems.mockReturnValue([]);
      const { insertFlowContainerItem } = useFlowContainerDataHandlers();
      const options = getMenuOptions();
      expect(options.length).toBe(1);
      expect(options[0].name).toBe('add');
      invokeAction(options[0], 'Bar');
      expectDataHandlerCall(insertFlowContainerItem, ['Bar']);
    });
  });
});
