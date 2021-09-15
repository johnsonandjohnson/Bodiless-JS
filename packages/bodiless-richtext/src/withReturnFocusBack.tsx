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

import React, {
  useRef,
  useEffect,
  ComponentType,
  MouseEvent,
  HTMLProps,
} from 'react';
import { Token } from '@bodiless/fclasses';

type ReturnFocusItem = string | null;
let RETURN_FOCUS_ITEM: ReturnFocusItem = null;

const setReturnFocusItem = (item: ReturnFocusItem) => { RETURN_FOCUS_ITEM = item; };
const getReturnFocusItem = () => RETURN_FOCUS_ITEM;

type Props = HTMLProps<HTMLElement> & {
  forwardRef?: React.Ref<any>;
};

const withReturnFocusBackOnEffect = (itemId: string) => (
  Component: ComponentType<Props>,
) => (props: Props) => {
  const itemRef = useRef<HTMLElement>();
  useEffect(() => {
    if (RETURN_FOCUS_ITEM === itemId) {
      if (itemRef !== undefined && itemRef.current !== undefined) {
        setReturnFocusItem(null);
        itemRef.current.focus();
      }
    }
  });
  return (
    <Component
      {...props}
      forwardRef={itemRef}
    />
  );
};

const withReturnFocusBackOnClick = (itemId: string): Token<Props> => Component => (props: any) => {
  const itemRef = useRef<HTMLButtonElement>();
  useEffect(() => {
    if (RETURN_FOCUS_ITEM === itemId) {
      if (itemRef !== undefined && itemRef.current !== undefined) {
        setReturnFocusItem(null);
        itemRef.current.focus();
      }
    }
  });
  return (
    <Component
      {...props}
      onMouseDown={(event: MouseEvent<HTMLButtonElement>) => {
        setReturnFocusItem(itemId);
        if (props.onMouseDown) props.onMouseDown(event);
      }}
      onMouseUp={(event: MouseEvent<HTMLButtonElement>) => {
        setReturnFocusItem(null);
        if (props.onMouseUp) props.onMouseUp(event);
      }}
      forwardRef={itemRef}
    />
  );
};

const useReturnFocusBackOnEffect = (itemId: string) => {
  const shouldReturnFocus = useRef<boolean>(false);
  useEffect(() => {
    if (shouldReturnFocus.current) {
      setReturnFocusItem(itemId);
      shouldReturnFocus.current = false;
    }
  });
  return {
    returnFocusBack: () => { shouldReturnFocus.current = true; },
  };
};

export {
  getReturnFocusItem,
  setReturnFocusItem,
  withReturnFocusBackOnClick,
  withReturnFocusBackOnEffect,
  useReturnFocusBackOnEffect,
};
