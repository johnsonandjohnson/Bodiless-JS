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

export const MARK_TYPE = 'custom_mark';

export const activeValue = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'rich',
        [MARK_TYPE]: true,
      },
    ],
  },
];

export const inactiveValueWithMark = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'rich',
        [MARK_TYPE]: true,
      },
      {
        text: 'text',
      },
    ],
  },
];

export const inactiveValueWithoutMark = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'rich',
      },
    ],
  },
];
