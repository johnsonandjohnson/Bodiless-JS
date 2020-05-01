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

import { asTaggableItem, withFilterByTags } from '@bodiless/components';
import { Span, addClasses, Button } from '@bodiless/fclasses';
import { flow } from 'lodash';

const TagSpan = addClasses('px-2 mb-2 mr-2')(Span);
const TagButton = addClasses('px-2 mb-2 mr-2 border border-gray-600')(Button);
const TaggableFilterableItem = flow(
  withFilterByTags,
  asTaggableItem(),
)(TagSpan);
export { TagButton };
export default TaggableFilterableItem;
