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
import { VitalMainPage } from '../../pages/vital-main';
import { vitalTestParameters } from '../config/vital-test-parameters';

test.describe.configure({ mode: 'parallel' });

/* eslint-disable jest/expect-expect */
test.describe('Google Analytics', () => {
  const mainPage: VitalMainPage = new VitalMainPage();

  test('Header contains data-layer-component', async ({page}) => {
    await mainPage.open(page);
    await checkAttribute(page, `#${mainPage.headerContentSelector}`, 'data-layer-component', 'Layout:Header');
  });

  test('Body contains data-layer-component', async ({page}) => {
    await mainPage.open(page);
    await checkAttribute(page, `#${mainPage.mainContentSelector}`, 'data-layer-component', 'Layout:Container');
  });

  test('Footer contains data-layer-component', async ({page}) => {
    await mainPage.open(page);
    await checkAttribute(page, mainPage.footerContentSelector, 'data-layer-component', 'Layout:Footer');
  });

  test('Header contains data-layer-region', async ({page}) => {
    await mainPage.open(page);
    await checkAttribute(page, `#${mainPage.headerContentSelector}`, 'data-layer-region', 'header');
  });

  test('Body contains data-layer-region', async ({page}) => {
    await mainPage.open(page);
    await checkAttribute(page, `#${mainPage.mainContentSelector}`, 'data-layer-region', 'body');
  });

  test('Footer contains data-layer-region', async ({page}) => {
    await mainPage.open(page);
    await checkAttribute(page, mainPage.footerContentSelector, 'data-layer-region', 'footer');
  });

  vitalTestParameters.forEach((params) => {
    test(`All components on ${params.suite} page should have data-layer-component`, async ({ page }) => {
      await params.page.open(page);
      const ids: string[] = params.page.getElements().map(e => e.id);

      await Promise.all(ids.map(async (id) => {
        expect(page.locator(`#${id}`, { has: page.locator('[data-layer-component]')})).toBeTruthy();
      }));
    });
  });
});

async function checkAttribute(page, selector, attribute, value) {
  await expect(page.locator(selector)).toHaveAttribute(attribute, value, {timeout: 1000});
}
