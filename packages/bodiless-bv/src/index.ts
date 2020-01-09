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

import asBVComponent, { asDesignableBVComponent } from './components/asBVComponent';
import { BVLoaderProvider, withBVLoader } from './components/BVLoader';
import { asBodilessBV } from './components/asBodilessBV';
import { asEditableBV } from './components/asEditableBV';
import BVRatingsSummaryV1, {
  BVRatingsSummaryBase as BVRatingsSummaryBaseV1,
} from './components/v1/BVRatingsSummary';
import BVReviewsV1, {
  BVReviewsBase as BVReviewsBaseV1,
} from './components/v1/BVReviews';
import BVInlineRatingsV1, {
  BVInlineRatingsBase as BVInlineRatingsBaseV1,
} from './components/v1/BVInlineRatings';
import BVRatingsSummary, {
  BVRatingsSummaryBase,
} from './components/v2/BVRatingsSummary';
import BVInlineRatings, {
  BVInlineRatingsBase,
} from './components/v2/BVInlineRatings';
import BVReviews, {
  BVReviewsBase,
} from './components/v2/BVReviews';

export {
  asBodilessBV,
  asBVComponent,
  asDesignableBVComponent,
  asEditableBV,
  BVLoaderProvider,
  withBVLoader,
  BVRatingsSummaryV1,
  BVRatingsSummaryBaseV1,
  BVReviewsV1,
  BVReviewsBaseV1,
  BVInlineRatingsV1,
  BVInlineRatingsBaseV1,
  BVRatingsSummary,
  BVRatingsSummaryBase,
  BVReviews,
  BVReviewsBase,
  BVInlineRatings,
  BVInlineRatingsBase,
};
