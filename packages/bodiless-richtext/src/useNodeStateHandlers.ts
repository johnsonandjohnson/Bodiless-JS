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

import { isObservable, toJS } from 'mobx';
import isEqual from 'react-fast-compare';
import { isEmpty } from 'lodash';
import { useNode, useUUID } from '@bodiless/core';
import {
  EditorOnChange,
  Value,
} from './Type';

type Data = Value;

type InitialValue = Value;
type TUseOnChangeParams = {
  onChange?: EditorOnChange;
  key: string;
  initialValue: InitialValue;
};
type TUseOnChange = (params: TUseOnChangeParams) => EditorOnChange;
type TUseValueParam = {
  initialValue: InitialValue;
  key: string;
};
type TUseValue = (params: TUseValueParam) => Value;
type TUseNodeStateHandlersParams = Omit<TUseOnChangeParams & TUseValueParam, 'key'>;
type TUseNodeStateHandlers = (
  params: TUseNodeStateHandlersParams,
) => {
  value: Value;
  onChange: EditorOnChange;
};

// Create the onChange prop.
// @TODO Should be memoized with useCallback.
const useOnChange: TUseOnChange = ({ onChange, initialValue }) => {
  const { node } = useNode<Data>();
  let { data: nodeData } = node;
  if (isObservable(nodeData)) {
    nodeData = toJS(nodeData);
  }
  return value => {
    // If Document has changed
    const isDocumentChanged = !isEqual(nodeData, value);

    // If the value is initial value
    const isNewValueInitial = isEqual(initialValue, value);

    // If New Value is Empty
    const isNewValueEmpty = isNewValueInitial && !isEmpty(nodeData) && isDocumentChanged;

    // If New Value Has Changes
    const isNewValueChanged = !isNewValueInitial && (!nodeData || isDocumentChanged);

    if (isNewValueEmpty || isNewValueChanged) {
      node.setData(value);
    }

    if (onChange) {
      onChange(value);
    }
  };
};

// Create the value prop (gets current editor value from state).
const useValue: TUseValue = () => {
  const { node } = useNode<Data>();
  return toJS(node.data);
};

const useNodeStateHandlers: TUseNodeStateHandlers = ({
  initialValue,
  onChange,
}) => {
  const key = useUUID();
  return ({
    value: useValue({
      initialValue,
      key,
    }),
    onChange: useOnChange({
      onChange,
      key,
      initialValue,
    }),
  });
};
export default useNodeStateHandlers;
