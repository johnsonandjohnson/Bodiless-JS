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
import { Locator, expect, test } from '@playwright/test';
import { VitalLinkPage } from '../../pages/vital-link';

test.describe('Vital Link', () => {
  const linkPage: VitalLinkPage = new VitalLinkPage();

  test('Should not be able to click on disabled link', async ({ page }) => {
    await linkPage.open(page);
    const linkElement: Locator = page.getByTestId(linkPage.disabledLink)
      .locator('[href="/test/"]');
    const url: string = page.url();
    await linkElement.click({ force: true });
    expect(page.url()).toBe(url);
  });

  test('Should be able to click on link', async ({ page }) => {
    await linkPage.open(page);
    const linkElement: Locator = page.getByTestId(linkPage.link)
      .locator('[href="/test/"]');
    await linkElement.click();
    expect(page.url().endsWith('/test/')).toBeTruthy();
  });
});
