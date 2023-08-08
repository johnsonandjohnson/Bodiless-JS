/**
 * Copyright © 2022 Johnson & Johnson
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

import { asAccordionToken } from '@bodiless/vital-accordion';
import { addProps } from '@bodiless/fclasses';
import { vitalAccordionBase } from '@bodiless/vital-accordion/lib/base';
import { withoutHydration } from '@bodiless/hydration';

const Default = asAccordionToken(vitalAccordionBase.Default, {
  Core: {
    /**
     * To address the performance issues we disabled the hydration for the menus.
     * @TODO: address by converting js functionality to css only.
     */
    _: withoutHydration(),
  },
  Behavior: {
    Wrapper: addProps({ 'data-shadowed-by': 'vital-demo:Accordion' }),
  },
});

export default {
  ...vitalAccordionBase,
  Default,
};
