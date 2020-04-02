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

import { withDefaultContent } from '@bodiless/core';
import { withDesign } from '@bodiless/fclasses';
import { flow } from 'lodash';
import { withToutNodeKeys } from '../Tout';
import withCTAContent, { CTAContent } from './withCTAContent';

export type ToutContent = {
  Image: object;
  ImageLink: object;
  Title: object;
  Body: object;
  Link: CTAContent;
};

const asContentfulTout = (content: Partial<ToutContent>) => {
  const { Link: ctaContent, ...rest } = content;
  return flow(
    withDesign(
      Object.keys(rest).reduce(
        (acc, key) => ({
          ...acc,
          [key]: flow(
            withDefaultContent(content[key]),
          ),
        }),
        {},
      ),
    ),
    withCTAContent(ctaContent),
    withToutNodeKeys,
  );
};

export default asContentfulTout;
