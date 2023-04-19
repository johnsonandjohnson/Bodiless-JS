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
// pdp.spec.ts
/* eslint-disable max-len */
/* eslint-disable jest/expect-expect */
import { expect, Page, test } from '@playwright/test';
import { PdpPage } from '../../pages/pdp-page';

test.describe('PDP (Product Details Page) smoke tests', () => {
  let page: Page;
  let pdpPage: PdpPage;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    pdpPage = new PdpPage(page);
    await page.goto('/products/');
  });

  test('PDP: 1 - creating a page from /products/', async ({ baseURL }) => {
    await pdpPage.toggleEditMode();
    await page.click(pdpPage.pageIconXpath);
    await page.click(pdpPage.newPageIconXpath);
    await pdpPage.typeText(pdpPage.fieldAddPageFormXpath, pdpPage.pdpURL, 'page-data', pdpPage.checkmarkIconAddPageFormXpath);
    await page.click(pdpPage.newPageLinkXpath);
    expect.soft(page.url()).toEqual(baseURL + pdpPage.pdpPagePath);
  });

  test('PDP: 2 - filling in Title', async () => {
    await pdpPage.typeText(pdpPage.titleXpath, pdpPage.title, 'product_title');
    expect.soft(await page.locator(pdpPage.titleXpath).innerText()).toEqual(pdpPage.title);
  });

  test('PDP: 3 - filling in Accordion item', async () => {
    await pdpPage.typeText(pdpPage.accordionOverviewBodyXpath, pdpPage.accordionBody, 'accordion');
    expect.soft(await page.locator(pdpPage.accordionOverviewBodyXpath).innerText()).toEqual(pdpPage.accordionBody);
    await page.click(pdpPage.accordionDirectionsExpandXpath);
    expect.soft(await page.locator(pdpPage.accordionDirectionsBodyExpandedXpath).isVisible()).toBeTruthy();
    expect.soft(await page.locator(pdpPage.accordionDirectionsBodyPlaceholderXpath).isVisible()).toBeTruthy();
    expect.soft(await page.locator(pdpPage.accordionOverviewBodyXpath).innerText()).toEqual(pdpPage.accordionBody);
  });

  test('PDP: 4 - checking opening BazaarVoice form', async () => {
    await page.click(pdpPage.bvTextXpath);
    await page.click(pdpPage.editBVIconXpath);
    await page.click(pdpPage.closeBVFormXpath);
  });

  test('PDP: 5 - checking uploading an image', async () => {
    await page.click(pdpPage.imagePlaceholderXpath);
    await page.click(pdpPage.imageIconXpath);
    const imagePath = `${pdpPage.pathToImages}/${pdpPage.imageOneName}`;
    await page.setInputFiles('input[type=file]', imagePath);
    await Promise.all([
      page.waitForResponse(response => response.url()
        .includes('product_image') && response.status() === 200),
      page.click(pdpPage.checkmarkIconImageFormXpath),
    ]);
    expect.soft(await page.locator(pdpPage.imagePlaceholderXpath).getAttribute('src')).toMatch(pdpPage.imagePathRegex);
    await pdpPage.isImageVisible(pdpPage.imagePlaceholderXpath);
  });

  test('PDP: 6 - checking a click in FlowContainer area', async () => {
    await page.click(pdpPage.flexboxXpath);
    expect.soft(await page.locator(pdpPage.addComponentIconXpath).isVisible()).toBeTruthy();
  });

  test('PDP: 7 - checking the page in Preview Mode', async () => {
    await pdpPage.togglePreviewMode();
    await page.waitForSelector(pdpPage.titleXpath, { timeout: 10000 });
    expect.soft(await page.locator(pdpPage.titleXpath).innerText()).toEqual(pdpPage.title);
    expect.soft(await page.locator(pdpPage.accordionOverviewBodyXpath).innerText()).toEqual(pdpPage.accordionBody);
    expect.soft(await page.locator(pdpPage.imagePlaceholderXpath).getAttribute('src')).toMatch(pdpPage.imagePathRegex);
    await pdpPage.isImageVisible(pdpPage.imagePlaceholderXpath);
  });

  test('PDP: 8 - checking that the data still present in Edit Mode', async () => {
    await pdpPage.toggleEditMode();
    await page.waitForSelector(pdpPage.titleXpath, { timeout: 10000 });
    expect.soft(await page.locator(pdpPage.accordionOverviewBodyXpath).innerText()).toEqual(pdpPage.accordionBody);
    expect.soft(await page.locator(pdpPage.titleXpath).innerText()).toEqual(pdpPage.title);
    expect.soft(await page.locator(pdpPage.imagePlaceholderXpath).getAttribute('src')).toMatch(pdpPage.imagePathRegex);
    await pdpPage.isImageVisible(pdpPage.imagePlaceholderXpath);
    expect.soft(await page.locator(pdpPage.flexboxXpath).isVisible()).toBeTruthy();
  });
});
