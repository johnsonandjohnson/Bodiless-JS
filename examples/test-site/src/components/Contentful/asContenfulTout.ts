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

import { withResetButton } from '@bodiless/core';
import { withDefaultContent } from '@bodiless/core';
import { withDesign } from '@bodiless/fclasses';
import { flow } from 'lodash';
import { withToutNodeKeys } from '../Tout';
import withCTAContent, { CTAContent } from './withCTAContent';
import { asEditableImage, asEditableLink } from '../Elements.token';
import { asEditorBasic, asEditorSimple } from '../Editors';

type ToutContent = {
  Image: object;
  ImageLink: object;
  Title: object;
  Body: object;
  Link: CTAContent;
};

const withToutResetButton = (content: Partial<ToutContent>) => withDesign({
  ...(content.Image || content.ImageLink ? { ImageLink: withResetButton } : {}),
  ...(content.Title ? { Title: withResetButton } : {}),
  ...(content.Body ? { Body: withResetButton } : {}),
  ...(content.Link ? { Link: withResetButton } : {}),
});

const asContentfulTout = (content: Partial<ToutContent>) => {
  const { Link: linkContent, ...rest } = content;
  return flow(
    withDesign({
      Image: asEditableImage(),
      ImageLink: asEditableLink(),
      Title: asEditorSimple(undefined, 'Tout Title Text'),
      Body: asEditorBasic(undefined, 'Tout Body Text'),
    }),
    withCTAContent(linkContent),
    withToutResetButton(content),
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
    withToutNodeKeys,
  );
};

export default asContentfulTout;
