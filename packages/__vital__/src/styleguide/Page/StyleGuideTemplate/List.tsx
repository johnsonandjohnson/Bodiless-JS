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

import React from 'react';
import { withNodeKey } from '@bodiless/core';
import {
  flowHoc,
  as,
  replaceWith,
} from '@bodiless/fclasses';
import { vitalList, ListClean } from '@bodiless/vital-list';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';

const DefaultList = as(
  vitalList.Default,
  withNodeKey('defaultlist'),
)(ListClean);

const ListwithIndent = as(
  vitalList.Default,
  vitalList.WithIndent,
  withNodeKey('ListwithIndent'),
)(ListClean);

const ListwithBullets = as(
  vitalList.Default,
  vitalList.WithBullets,
  withNodeKey('ListwithBullets'),
)(ListClean);

const ListwithRichText = as(
  vitalList.Base,
  vitalList.WithRichTitle,
  withNodeKey('ListwithRichText'),
)(ListClean);

const ListwithPlainTitle = as(
  vitalList.Base,
  vitalList.WithPlainTitle,
  withNodeKey('ListwithPlainTitle'),
)(ListClean);

const ListwithInfographicTitle = as(
  vitalList.Base,
  vitalList.WithInfographicTitle,
  withNodeKey('ListwithInfographicTitle'),
)(ListClean);

const ListwithLinkedTitle = as(
  vitalList.Base,
  vitalList.WithLinkedTitle,
  withNodeKey('ListwithLinkedTitle'),
)(ListClean);

const ListwithNumbers = as(
  vitalList.Default,
  vitalList.WithNumbers,
  withNodeKey('ListwithNumbers'),
)(ListClean);

/* @todo
 * Rendered only the two types of images available in flow container as separate components.
 * To do is provide all variations we want tested individually.
 */
const Examples = (props: any) => (
  <>
    <hr className="my-4" />
    <DefaultList />
    <hr className="my-4" />
    <ListwithPlainTitle />
    <hr className="my-4" />
    <ListwithRichText />
    <hr className="my-4" />
    <ListwithLinkedTitle />
    <hr className="my-4" />
    <ListwithIndent />
    <hr className="my-4" />
    <ListwithBullets />
    <hr className="my-4" />
    <ListwithNumbers />
    <hr className="my-4" />
    <ListwithInfographicTitle />
  </>
);

export const List = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('List'),
  Content: {
    Title: replaceWith(() => <>List</>),
    Examples: replaceWith(Examples),
  },
});
