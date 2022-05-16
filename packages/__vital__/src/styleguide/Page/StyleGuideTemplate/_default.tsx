/**
 * Copyright © 2022 Johnson & Johnson
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

import { vitalTypography } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import {
  flowHoc, H2, replaceWith, as, P, Ul,
} from '@bodiless/fclasses';
import React from 'react';

const Subtitle = as(vitalTypography.H2, 'pt-8')(H2);
const Para = as('pt-4')(P);
const List = as('pt-4')(Ul);

const Examples = () => (
  <>
    <Para>
      To create a new styleguide page, use the &quot;New&quot; button
      on the &quot;Page&quot; toolbar menu, and then select the component
      to demo from the &quot;Templates&quot; button on the &quot;Page&quot; toolbar
      menu on the new page.
    </Para>
    <Subtitle>Global Elements</Subtitle>
    <List>
      <li><a href="./layout">Layout</a></li>
      <li><a href="./header">Header</a></li>
      <li><a href="./footer">Footer</a></li>
      <li><a href="./editors">Editors</a></li>
      <li><a href="./editors-monofont">Editors with MonoFont</a></li>
      <li><a href="./typography">Typography</a></li>
    </List>
    <Subtitle>Components</Subtitle>
    <List>
      <li><a href="./flow-container">Flow Container</a></li>
      <li><a href="./images">Images</a></li>
      <li><a href="./video">Video</a></li>
      <li><a href="./list">List</a></li>
      <li><a href="./card">Card</a></li>
      <li><a href="./table">Table</a></li>
    </List>
    <Subtitle>Templates</Subtitle>
    <List>
      <li><a href="./generic-template">Generic Template</a></li>
    </List>
  </>
);

export const _default = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Editors'),
  Content: {
    Title: replaceWith(() => <>Style Guide</>),
    Description: replaceWith(() => null),
    Examples: replaceWith(Examples),
  },
});
