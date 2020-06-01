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

import { useContext, useRef, EventHandler } from 'react';
import { v1 } from 'uuid';
import PageEditContext from './PageEditContext';

export const useEditContext = () => useContext(PageEditContext.context);

export const useUUID = () => useRef(v1()).current;

export const useContextActivator = (
  event = 'onClick',
  handler?: EventHandler<any>,
) => {
  const context = useEditContext();
  // Don't attach the handler when not in edit mode.
  // @TODO: Find a better way to keep the outermost context active even when not editing. AESQ-537
  if (!context.isEdit && context.name !== 'page') {
    return {
      [event]: handler,
    };
  }
  const handler$1 = (e: React.SyntheticEvent<any>) => {
    const preventDefault = e && e.currentTarget && e.currentTarget.getAttribute('bl-prevent') !== 'false';
    if (handler) handler(e);
    context.activate();
    context.toggleLocalTooltipsDisabled(false);
    if (e && e.stopPropagation) e.stopPropagation();
    // @TODO: We may want to remove next line entirely and do a Regression Testing
    if (preventDefault && e && e.preventDefault && context.name !== 'page') e.preventDefault();
  };
  return {
    [event]: handler$1,
  };
};
