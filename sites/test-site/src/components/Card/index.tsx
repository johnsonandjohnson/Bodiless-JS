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

import {
  withContextActivator,
  withMenuOptions,
  withResetButton,
} from '@bodiless/core';
import {
  withDefaultContent,
  withSidecarNodes,
} from '@bodiless/data';
import {
  CardClean,
  asTestableCard,
} from '@bodiless/card';
import {
  withDesign, startWith, flowHoc, A,
} from '@bodiless/fclasses';
import {
  asEditable,
  asEditableLink,
} from '../Elements.token';
import { asEditableImage } from '../Image';
import {
  withEditorBasic,
  withEditorSimple,
} from '../Editors';

export const withCardEditors = flowHoc(
  withDesign({
    Image: asEditableImage('image'),
    ImageLink: flowHoc(
      withSidecarNodes(
        asEditableLink('link'),
      ),
      startWith(A),
    ),
    Title: withEditorSimple('title', 'Card Title Text'),
    Link: flowHoc(
      withEditorSimple('ctatext', 'CTA'),
      withSidecarNodes(
        asEditableLink('link', undefined, () => ({ groupLabel: 'CTA' })),
      ),
      startWith(A),
    ),
    Body: withEditorBasic('body', 'Card Body Text'),
  }),
);

export const withMenuCardsEditors = flowHoc(
  withDesign({
    Image: asEditableImage('image'),
    ImageLink: flowHoc(
      withSidecarNodes(
        asEditableLink('link'),
      ),
      startWith(A),
    ),
    Title: asEditable('text', 'Card Title'),
    Link: flowHoc(
      asEditable('ctatext', 'CTA'),
      withSidecarNodes(
        asEditableLink('link', undefined, () => ({ groupLabel: 'CTA' })),
      ),
      startWith(A),
    ),
    Body: withEditorBasic('body', 'Card Body'),
  }),
);

const withEmptyContext = (name: string) => flowHoc(
  withContextActivator('onClick'),
  withMenuOptions({
    name,
    useMenuOptions: () => ([{
      name, isHidden: true, global: false, local: true,
    }]),
  }),
);

export const withCardResetButtons = withDesign({
  ImageLink: withResetButton({ nodeKey: ['image', 'link'] }),
  Title: flowHoc(
    withEmptyContext('Title'),
    withResetButton({ nodeKey: 'title' }),
  ),
  Body: flowHoc(
    withEmptyContext('Body'),
    withResetButton({ nodeKey: 'body' }),
  ),
  Link: withResetButton({ nodeKey: ['link', 'ctatext'] }),
});

export const asEditableCard = flowHoc(
  withCardEditors,
  asTestableCard,
);

export const asContentfulCard = (content: object) => flowHoc(
  withCardEditors,
  withCardResetButtons,
  withDefaultContent(content),
  asTestableCard,
);

const Card = asEditableCard(CardClean);
export default Card;
export { asTestableCard };
