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
import { asHelmetToken } from '@bodiless/vital-layout';
import { vitalHelmetBase } from '@bodiless/vital-layout/lib/base';
import { withLangDirProps } from '@bodiless/i18n';
import { as, addProps } from '@bodiless/fclasses';

const Default = asHelmetToken(vitalHelmetBase.Default, {
  Core: {
    LanguageHelmet: as(
      addProps({ 'data-shadowed-by': 'vitalExamplesHelmet' }),
      withLangDirProps,
    ),
  },
});

export default {
  ...vitalHelmetBase,
  Default,
};
