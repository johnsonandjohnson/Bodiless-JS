/**
 * Copyright © 2020 Johnson & Johnson
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

import identity from 'lodash/identity';
import { FormBodyRenderer } from './contextMenuForm.bl-edit';

/**
 * A collection of form fields (with initial values and submit handler) which can be rendered
 * as part of a compound form.
 */
export type Snippet<D> = {
  /**
   * A unique identifier for this snippet
   */
  id: string,
  /**
   * The function which will render the actual form fields
   */
  render: FormBodyRenderer<D>,
  /**
   * The initial values for each form field. Note that you
   * *must* include a key for each field in the form.
   */
  initialValues?: any,
  /**
   * The submit handler.  Will be invoked with form values
   * whose field names match the keys of the specified initialValues.
   */
  submitValues?: (values: any) => void,
};

const withCompoundForm = identity;

export default withCompoundForm;

export const useRegisterSnippet = () => {};
