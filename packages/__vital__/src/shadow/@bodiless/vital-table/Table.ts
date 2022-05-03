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

import { vitalTableBase } from '@bodiless/vital-table';
import { asFluidToken } from '@bodiless/vital-elements';
import { addProps } from '@bodiless/fclasses';

const Default = asFluidToken({
  ...vitalTableBase.Default,
  Components: {
    ...vitalTableBase.Default.Components,
    Wrapper: addProps({ 'data-shadowed-by': '__vitalstarter_:Table' }),
  },
  /* The following is an example that overrides full width and uses
   * fixed widths for columns. The width of the first row will set the
   * column widths for the whole table.  Data of cells will be centered.
   *
  Theme: {
    Table: 'table-fixed',
    Cell: 'text-center',
  },
  */

});

export default {
  ...vitalTableBase,
  Default,
};
