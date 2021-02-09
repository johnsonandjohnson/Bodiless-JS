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

import React, { Fragment, FC } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
import { useEditContext, TMenuOption } from '@bodiless/core';
import { DesignableComponents } from '@bodiless/fclasses';
import { EditFlowContainerProps } from '../../src/FlowContainer/types';
import componentSelectorForm from '../../src/ComponentSelector/componentSelectorForm';
import { useItemHandlers, useFlowContainerDataHandlers } from '../../src/FlowContainer/model';
import { useMenuOptions, useGetItemUseGetMenuOptions } from '../../src/FlowContainer/useGetMenuOptions';

jest.mock('../../src/ComponentSelector/componentSelectorForm');
jest.mock('../../src/FlowContainer/model');
jest.mock('../../src/FlowContainer/SortableChild', () => ({
  FALLBACK_SNAP_CLASSNAME: 'w-full',
}));

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
  useGetter: jest.fn((options: any) => () => options),
}));

const Foo: FC = Fragment;
const Bar: FC = Fragment;
const components: DesignableComponents = { Foo, Bar };
const foo = {
  uuid: 'foo',
  type: 'Foo',
  wrapperProps: {
    className: 'foo-class',
  },
};

describe('useGetMenuOptions', () => {
  const logMenuOptions = jest.fn();

  const getLoggedMenuOptions = (index = 0): TMenuOption[] => (
    logMenuOptions.mock.calls[index][0].filter(
      (op: TMenuOption) => {
        if (op.isHidden === undefined) return true;
        if (typeof op.isHidden === 'function') return !op.isHidden();
        return !op.isHidden;
      },
    )
  );

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
    action([selection]);
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
    function LogMenuOptions({ maxComponents }: { maxComponents?: number }) {
      const props: EditFlowContainerProps = {
        components,
      };
      if (maxComponents) {
        props.maxComponents = maxComponents;
      }
      const hook = useGetItemUseGetMenuOptions(props)(foo);
      logMenuOptions(hook()());
      return null;
    }
    function getMenuOptions(maxComponents?: number) {
      logMenuOptions.mockClear();
      shallow(<LogMenuOptions maxComponents={maxComponents} />);
      return getLoggedMenuOptions();
    }

    beforeEach(() => {
      const { getItems } = useItemHandlers();
      // @ts-ignore jest mock methods don't exist on mocked imports.
      getItems.mockReturnValue([
        foo,
        {
          uuid: 'bar',
          type: 'Bar',
          wrapperProps: {
            className: 'bar-class',
          },
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
      const addButton = options.find(option => option.name === 'add-item');
      expect(addButton).not.toBeUndefined();
      invokeAction(addButton!, 'Baz');
      expectDataHandlerCall(insertFlowContainerItem, ['Baz', foo]);
    });

    it('Does not return an add button when flow container is full', () => {
      const options = getMenuOptions(2);
      const addButton = options.find(option => option.name === 'add');
      expect(addButton).toBeUndefined();
    });

    it('Returns a copy button', () => {
      const { insertFlowContainerItem } = useFlowContainerDataHandlers();
      const options = getMenuOptions(3);
      const copyButton = options.find(option => option.name === 'copy-item');
      expect(copyButton).not.toBeUndefined();
      // @ts-ignore handler expects an event but doesn't use it
      copyButton.handler();
      expectDataHandlerCall(insertFlowContainerItem, ['Foo', foo, { className: 'foo-class' }]);
    });

    it('Does not return a copy button when flow container is full', () => {
      const options = getMenuOptions(2);
      const copyButton = options.find(option => option.name === 'copy-item');
      expect(copyButton).toBeUndefined();
    });

    it('Returns a delete button', () => {
      const { deleteFlowContainerItem } = useFlowContainerDataHandlers();
      const options = getMenuOptions();
      const button = options.find(option => option.name === 'delete');
      expect(button).not.toBeUndefined();
      // @ts-ignore handler expects an event but doesn't use it
      button.handler();
      expectDataHandlerCall(deleteFlowContainerItem, ['foo']);
    });

    it('Returns a swap button', () => {
      const { updateFlowContainerItem } = useFlowContainerDataHandlers();
      const options = getMenuOptions();
      const button = options.find(option => option.name === 'swap');
      expect(button).not.toBeUndefined();
      invokeAction(button!, 'Bar');
      expectDataHandlerCall(updateFlowContainerItem, [{ ...foo, type: 'Bar' }]);
    });
  });

  describe('flow container getMenuOptions', () => {
    function LogMenuOptions() {
      const props: EditFlowContainerProps = {
        components,
      };
      logMenuOptions(useMenuOptions(props));
      return null;
    }

    function getMenuOptions() {
      logMenuOptions.mockClear();
      shallow(<LogMenuOptions />);
      return getLoggedMenuOptions();
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
      shallow(<LogMenuOptions />);
      const options = getMenuOptions();
      expect(options.length).toBe(1);
      invokeAction(options[0], 'Bar');
      expectDataHandlerCall(insertFlowContainerItem, ['Bar']);
    });
  });
});
