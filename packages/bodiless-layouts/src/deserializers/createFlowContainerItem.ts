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

import MD5 from 'crypto-js/md5';

export type FlowContainerItem = {
  uuid: string,
  wrapperProps: { [key: string]: string; },
  type: string,
};

export type CreateFlowContainerItemArgs = {
  type: string,
  element: Element | Element[],
  elementIndex: number,
};
export type CreateFlowContainerItem = (args: CreateFlowContainerItemArgs) => FlowContainerItem;

export const generateUuid = (
  content: string,
  index: number,
) => MD5(JSON.stringify({ content, index }))
  .toString();

export const createFlowContainerItem: CreateFlowContainerItem = ({
  type,
  element,
  elementIndex,
}) => ({
  uuid: generateUuid(
    Array.isArray(element) ? element.map(element$ => element$.outerHTML).join('') : element.outerHTML,
    elementIndex,
  ),
  wrapperProps: {
    className: 'w-full',
  },
  type,
});
