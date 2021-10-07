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

import { useNode } from '@bodiless/core';
import type { LinkData, Props } from './types';

/**
 * hook that determines if the link data is empty
 * the hook validates the data in the current node and in the corresponding prop
 *
 * @param props - link based component props
 * @returns true when link data is empty, otherwise false
 */
const useEmptyLinkToggle = ({ href }: Props) => {
  const { node } = useNode<LinkData>();
  return (href === undefined || href === '#') && node.data.href === undefined;
};

export default useEmptyLinkToggle;
