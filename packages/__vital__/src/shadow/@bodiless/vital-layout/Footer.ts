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
import { asFluidToken } from '@bodiless/vital-elements';
import { vitalFooterBase } from '@bodiless/vital-layout';
import {
  addProps, as
} from '@bodiless/fclasses';
import { withLanguageNode } from '@bodiless/i18n';

const Default = asFluidToken({
  ...vitalFooterBase.Default,
  Core: {
    ...vitalFooterBase.Default.Core,
    _: addProps({ 'data-shadowed-by': '__vital__Footer' }),
  },
  Schema: {
    ...vitalFooterBase.Default.Schema,
    FooterMenu: as(
      withLanguageNode,
      vitalFooterBase.Default.Schema.FooterMenu
    ),
    Copyright: as(
      withLanguageNode,
      vitalFooterBase.Default.Schema.Copyright,
    ),
  },
});

export default {
  ...vitalFooterBase,
  Default,
};
