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

import React, {
  FC, ComponentType, useRef, useLayoutEffect, PropsWithChildren
} from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  FloatingPortal,
  FloatingArrow,
  arrow,
} from '@floating-ui/react';

import { observer } from '../mobx.bl-edit';
import { useEditContext } from '../hooks';
import type { PageEditContextInterface } from '../PageEditContext/types';

const findContextMenuElement = (context?: PageEditContextInterface): Element|null => {
  if (!context) return null;
  const { id = 'unknown'} = context;
  const ref = document.querySelector(`[data-context-menu-id="${id}"]`);
  if (ref) return ref;
  if (context.parent) return findContextMenuElement(context.parent);
  return null;
};

/*
 * Wraps its children in a tooltip which is positioned below
 * the innermost context to which a local context menu has been assigned.
 */
const LocalContextMenuPopup: FC<PropsWithChildren> = ({ children }) => {
  const { activeContext, localContextMenuKey } = useEditContext();
  const key = localContextMenuKey ? localContextMenuKey.getTime() : 'local-context-menu';
  const ref = findContextMenuElement(activeContext);
  const arrowRef = useRef(null);
  const open = Boolean(ref);

  const {
    x, y, refs, strategy, context
  } = useFloating({
    open,
    // onOpenChange: setOpen,
    placement: 'bottom-start',
    // Make sure the tooltip stays on the screen
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip({
        fallbackAxisSideDirection: 'start',
        crossAxis: false
      }),
      shift(),
      arrow({
        element: arrowRef,
      }),
    ]
  });

  useLayoutEffect(() => refs.setReference(ref), [ref, refs]);

  // Role props for screen readers
  // const role = useRole(context, { role: "tooltip" });
  // Merge all the interactions into prop getters
  // const { getReferenceProps, getFloatingProps } = useInteractions([
  //   role
  // ]);

  return (
    <FloatingPortal key={key}>
      {open && (
      <div
        ref={refs.setFloating}
        style={{
          position: strategy,
          top: y ?? 0,
          left: x ?? 0,
          zIndex: 1000,
        }}
        // {...getFloatingProps()}
      >
        <FloatingArrow ref={arrowRef} context={context} />
        {children}
      </div>
      )}
    </FloatingPortal>
  );
};

export default observer(LocalContextMenuPopup) as ComponentType<PropsWithChildren>;
