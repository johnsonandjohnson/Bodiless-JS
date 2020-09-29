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
import { flow } from 'lodash';
import { Search as SearchClean } from '@bodiless/components';
import {
  addClasses,
} from '@bodiless/fclasses';

const asRedText = addClasses('text-red-300');
const asPrimaryHeader = addClasses('font-bold text-3xl');

const Search = flow(
  asPrimaryHeader,
  asRedText,
)(SearchClean);

export default Search;
