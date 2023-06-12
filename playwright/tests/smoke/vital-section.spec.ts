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
import { expect, test } from '@playwright/test';
import { VitalSectionPage } from '../../pages/vital-section';

test.describe.configure({ mode: 'parallel' });

test.describe('Vital Section', () => {
  const sectionPage: VitalSectionPage = new VitalSectionPage();

  sectionPage.vitalSections.filter((section) => section.hasLink).forEach((section) => {
    test(`Should click on link in ${section.id} section`, async ({ page }) => {
      await sectionPage.open(page);
      const element = page.getByTestId(section.id)
        .locator(sectionPage.sectionLinkSelector);
      await element.click({ noWaitAfter: false });
      expect(page.url().endsWith('#')).toBeTruthy();
    });
  });
});
