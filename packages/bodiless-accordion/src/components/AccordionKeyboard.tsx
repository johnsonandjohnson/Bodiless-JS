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

import {
  KeyboardEvent,
} from 'react';
import {
  AccordionContextType,
} from './types';

/**
 * AccordionKeyPressHandler handles enter/space key press events to
 * provide accessibility support for accordions expanding and collapsing behaviors
 */
const AccordionKeyPressHandler = (event: KeyboardEvent, context: AccordionContextType) => {
  const { isExpanded, setExpanded } = context;

  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault();
      setExpanded(!isExpanded);
      break;

    default:
      break;
  }
};

export default AccordionKeyPressHandler;
