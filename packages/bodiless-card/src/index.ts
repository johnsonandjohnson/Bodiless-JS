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
import type { KnapsackBodilessSpec } from '@bodiless/knapsack-renderer';
import type { CardComponents, CardProps } from './components/Cards';
import * as cxCard from './components/Cards.tokens';
import { CardClean } from './components/Cards';

export { CardClean, asTestableCard } from './components/Cards';

export type { CardComponents, CardProps };

export {
  asCardHorizontal,
  asCardVertical,
  asCardNoTitle,
  asCardNoBody,
  asCardNoBodyNoTitle,
  asCardNoCta,
  asCardOverlayTitle,
  asCardOverlayCta,
} from './components/Cards.tokens';

export const cardSpec: KnapsackBodilessSpec<CardComponents> = {
  tokens: cxCard,
  tokensExportName: 'cxCard',
  component: CardClean,
  componentExportName: 'CardClean',
  slots: {
    Title: {
      title: 'Title',
      description: 'The title of the card',
      allowedPatternIds: ['element'],
    },
    Body: {
      title: 'Body',
      description: 'The body of the card',
      allowedPatternIds: ['element'],
    },
  },
};
