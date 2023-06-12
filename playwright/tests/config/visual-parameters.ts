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
import { Region } from '@applitools/eyes-playwright';
import {
  VitalCardsPage, VitalTypographyPage, VitalButtonsPage, VitalAccordionPage, VitalVideoPage,
  VitalLayoutPage, VitalProductPage, VitalGenericTemplatePage, VitalPage, VitalSectionPage,
} from '../../pages';

export const visualParameters: VisualParameters[] = [
  {
    suite: 'Section',
    page: new VitalSectionPage(),
    switchToItemContent: true,
  },
  {
    suite: 'Cards',
    page: new VitalCardsPage(),
    switchToItemContent: true,
  },
  {
    suite: 'Typography',
    page: new VitalTypographyPage(),
    switchToItemContent: true,
  },
  {
    suite: 'Buttons',
    page: new VitalButtonsPage(),
    switchToItemContent: true,
  },
  {
    suite: 'Accordions',
    page: new VitalAccordionPage(),
    switchToItemContent: true,
  },
  {
    suite: 'Video',
    page: new VitalVideoPage(),
    /**
     * Animated YouTube icon, it's not affected by resizing on different devices and so always
     * located by the same coordinates.
     */
    ignoreRegion: new Region(7, 7, 50, 50),
    switchToItemContent: true
  },
  {
    suite: 'Layout',
    page: new VitalLayoutPage(),
    switchToItemContent: false,
  },
  {
    suite: 'Product',
    page: new VitalProductPage(),
    switchToItemContent: false,
  },
  {
    suite: 'Generic Template',
    page: new VitalGenericTemplatePage(),
    switchToItemContent: false,
  }
];

export type VisualParameters = {
  suite: string,
  page: VitalPage,
  ignoreRegion?: Region,
  switchToItemContent: boolean
};
