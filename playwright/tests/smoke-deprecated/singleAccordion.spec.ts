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
// singleAccordion.spec.ts
/* eslint-disable max-len */
import { expect, Page, test } from '@playwright/test';
import { AccordionPage } from '../../pages/accordion-page';

test.describe('Single Accordion smoke tests', () => {
  let page: Page;
  let accordionPage: AccordionPage;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    accordionPage = new AccordionPage(page);
    await page.goto('/accordion/');
  });

  test('accordions: 1 - filling in Title in 1st accordion', async () => {
    await accordionPage.toggleEditMode();
    await accordionPage.typeText(accordionPage.titleFirstXpath, accordionPage.title, accordionPage.accordionTitleRequest);
    expect(await page.locator(accordionPage.titleFirstXpath).innerText()).toEqual(accordionPage.title);
  });

  test('accordions: 2 - filling in Body in 1st accordion', async () => {
    await accordionPage.typeText(accordionPage.bodyFirstXpath, accordionPage.body, accordionPage.accordionBodyRequest);
    expect(await page.locator(accordionPage.bodyFirstXpath).innerText()).toEqual(accordionPage.body);
  });

  test('accordions: 3 - collapsing the 1st accordion', async () => {
    await page.click(accordionPage.minusIconFirstXpath);
    expect(await page.locator(accordionPage.bodyFirstXpath).isVisible()).toBeFalsy();
  });

  test('accordions: 4 - expanding the 1st accordion', async () => {
    await page.click(accordionPage.plusIconFirstXpath);
    expect(await page.locator(accordionPage.bodyFirstXpath).isVisible()).toBeTruthy();
  });

  test('accordions: 5 - expanding an empty accordion', async () => {
    await page.click(accordionPage.plusIconSecondXpath);
    expect(await page.locator(accordionPage.bodySecondXpath).isVisible()).toBeTruthy();
  });

  test('accordions: 6 - collapsing an empty accordion', async () => {
    await page.click(accordionPage.minusIconSecondXpath);
    expect(await page.locator(accordionPage.bodySecondXpath).isVisible()).toBeFalsy();
  });

  test('accordions: 7 - checking the accordions in Preview Mode', async () => {
    await accordionPage.togglePreviewMode();
    expect(await page.locator(accordionPage.titleFirstXpath).innerText()).toEqual(accordionPage.title);
    expect(await page.locator(accordionPage.bodyFirstXpath).innerText()).toEqual(accordionPage.body);
    await page.click(accordionPage.titleFirstXpath);
    expect(await page.locator(accordionPage.bodyFirstXpath).isVisible()).toBeFalsy();
    await page.click(accordionPage.plusIconFirstXpath);
    expect(await page.locator(accordionPage.bodyFirstXpath).isVisible()).toBeTruthy();
    await page.click(accordionPage.minusIconFirstXpath);
    expect(await page.locator(accordionPage.bodyFirstXpath).isVisible()).toBeFalsy();
    await page.click(accordionPage.titleFirstXpath);
    expect(await page.locator(accordionPage.bodyFirstXpath).isVisible()).toBeTruthy();
  });

  test('accordions: 8 - checking that data is still present in Edit Mode', async () => {
    await accordionPage.toggleEditMode();
    expect(await page.locator(accordionPage.titleFirstXpath).innerText()).toEqual(accordionPage.title);
    expect(await page.locator(accordionPage.bodyFirstXpath).innerText()).toEqual(accordionPage.body);
    await page.click(accordionPage.minusIconFirstXpath);
    expect(await page.locator(accordionPage.bodyFirstXpath).isVisible()).toBeFalsy();
    await page.click(accordionPage.plusIconFirstXpath);
    expect(await page.locator(accordionPage.bodyFirstXpath).isVisible()).toBeTruthy();
  });

  test('accordions: 9 - editing Title in the 1st accordion', async () => {
    await accordionPage.typeText(accordionPage.titleFirstXpath, accordionPage.editedPostfix, accordionPage.accordionTitleRequest);
    expect(await page.locator(accordionPage.titleFirstXpath).innerText()).toEqual(accordionPage.title + accordionPage.editedPostfix);
  });

  test('accordions: 10 - editing Body in the 1st accordion', async () => {
    await accordionPage.typeText(accordionPage.bodyFirstXpath, accordionPage.editedPostfix, accordionPage.accordionBodyRequest);
    expect(await page.locator(accordionPage.bodyFirstXpath).innerText()).toEqual(accordionPage.body + accordionPage.editedPostfix);
  });

  test('accordions: 11 - collapsing the 1st accordion', async () => {
    await page.click(accordionPage.minusIconFirstXpath);
    expect(await page.locator(accordionPage.bodyFirstXpath).isVisible()).toBeFalsy();
  });

  test('accordions: 12 - expanding the 1st accordion', async () => {
    await page.click(accordionPage.plusIconFirstXpath);
    expect(await page.locator(accordionPage.bodyFirstXpath).isVisible()).toBeTruthy();
  });

  test('accordions: 13 - checking the edited data in Preview Mode', async () => {
    await accordionPage.togglePreviewMode();
    expect(await page.locator(accordionPage.titleFirstXpath).innerText()).toEqual(accordionPage.title + accordionPage.editedPostfix);
    expect(await page.locator(accordionPage.bodyFirstXpath).innerText()).toEqual(accordionPage.body + accordionPage.editedPostfix);
    await page.click(accordionPage.minusIconFirstXpath);
    expect(await page.locator(accordionPage.bodyFirstXpath).isVisible()).toBeFalsy();
    await page.click(accordionPage.titleFirstXpath);
    expect(await page.locator(accordionPage.bodyFirstXpath).isVisible()).toBeTruthy();
    await page.click(accordionPage.titleFirstXpath);
    expect(await page.locator(accordionPage.bodyFirstXpath).isVisible()).toBeFalsy();
    await page.click(accordionPage.plusIconFirstXpath);
    expect(await page.locator(accordionPage.bodyFirstXpath).isVisible()).toBeTruthy();
  });

  test('accordions: 14 - checking that the edited data is still present in Edit Mode', async () => {
    await accordionPage.toggleEditMode();
    expect(await page.locator(accordionPage.titleFirstXpath).innerText()).toEqual(accordionPage.title + accordionPage.editedPostfix);
    expect(await page.locator(accordionPage.bodyFirstXpath).innerText()).toEqual(accordionPage.body + accordionPage.editedPostfix);
  });
});
