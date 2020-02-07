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

import React from 'react';
import { Value, ValueJSON } from 'slate';
import isEqual from 'react-fast-compare';
import { useNode } from '@bodiless/core';
import { Change } from './Type';
import MobxStateContainer from './MobxStateContainer';

type Data = {
  document: object;
};

type InitialValue = ValueJSON;
type TOnChange = Function; // (change: Change) => void;
type TUseOnChangeParams = {
  onChange?: TOnChange;
};
type TUseOnChange = (params: TUseOnChangeParams) => (change: Change) => void;
type TUseValueParam = {
  initialValue: InitialValue;
};
type TUseValue = (params: TUseValueParam) => Value;
type TUseNodeStateHandlersParams = TUseOnChangeParams & TUseValueParam;
type TUseNodeStateHandlers = (
  params: TUseNodeStateHandlersParams,
) => {
  value: Value;
  onChange: TOnChange;
};

const stateContainer = React.createContext<MobxStateContainer>(
  new MobxStateContainer(),
);

function useStateContainer() {
  return React.useContext(stateContainer);
}

const preserveAll = {
  preserveSelection: true,
  preserveData: true,
  preserveDecorations: true,
};

// Create the onChange prop.
// @TODO Should be memoized with useCallback.
const useOnChange: TUseOnChange = ({ onChange }) => {
  const { setState } = useStateContainer();
  const { node } = useNode<Data>();

  return change => {
    const { value } = change;
    const jsonValue = value.toJSON();
    const key = (node.path as string[]).join('$');
    // Set the editor state.  We use the node path as a key.
    const newState = {
      [key]: value,
    };
    if (
      !node.data.document
      || !isEqual(node.data.document, jsonValue.document)
    ) {
      node.setData({ document: jsonValue.document! });
    }
    if (onChange) {
      onChange(change);
    }
    setState(newState);
  };
};

// Create the value prop (gets current editor value from state).
const useValue: TUseValue = ({ initialValue }) => {
  const { get: getValue } = useStateContainer();
  const { node } = useNode<Data>();
  const key = (node.path as string[]).join('$');
  let oldValue = getValue(key);
  if (!oldValue) {
    oldValue = Value.fromJSON(
      node.data.document ? { document: node.data.document } : initialValue,
    );
  }
  if (!node.data.document) return oldValue;

  // Inject the document from the content node (if one exists);
  // We need to be sure to serialize the value with all "preserve" options.
  // tslint:disable-next-line:max-line-length
  // @see https://github.com/ianstormtaylor/slate/blob/6d8df18f016df75da0d49d6b753cecb333dca078/packages/slate/src/models/value.js#L803
  const jsonValue = oldValue.toJSON(preserveAll);
  if (isEqual(jsonValue.document, node.data.document)) return oldValue;
  // jsonValue.document = node.data.document;
  return Value.fromJSON(jsonValue);
};

const useNodeStateHandlers: TUseNodeStateHandlers = ({
  initialValue,
  onChange,
}) => ({
  value: useValue({
    initialValue,
  }),
  onChange: useOnChange({
    onChange,
  }),
});
export default useNodeStateHandlers;
