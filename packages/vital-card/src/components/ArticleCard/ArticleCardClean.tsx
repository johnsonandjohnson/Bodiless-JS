/**
 * Copyright © 2023 Johnson & Johnson
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

import { Fragment } from 'react';
import { as, designable } from '@bodiless/fclasses';
import { withNode } from '@bodiless/data';
import {
  cardComponentStart, CardBase, asCardToken, CardStatic,
} from '../Card/CardClean';

const articleCardComponentStart = {
  ...cardComponentStart,
  EyebrowWrapper: Fragment,
  Eyebrow: Fragment,
  Description: Fragment,
};

const ArticleCardClean = as(
  designable(articleCardComponentStart, 'ArticleCard'),
  withNode,
)(CardBase);

/**
 * A token creator that respects the ArticleCard slots.
 *
 * @category Token Collection
 */
export const asArticleCardToken = asCardToken;

export const ArticleCardStatic = CardStatic;

export default ArticleCardClean;
