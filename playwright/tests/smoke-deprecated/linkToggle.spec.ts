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
// linkToggle.spec.ts
import { expect, Page, test } from '@playwright/test';
import { LinkTogglePage } from '../../pages/link-toggle-page';

test.describe('Link Toggle smoke tests', () => {
  let page: Page;
  let linkTogglePage: LinkTogglePage;
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    linkTogglePage = new LinkTogglePage(page);
    await page.goto('/link-toggle/');
  });

  test('link toggle: 1 - checking the label without a url', async () => {
    await linkTogglePage.toggleEditMode();
    await linkTogglePage.typeText(linkTogglePage.labelXpath, linkTogglePage.label, 'linktoggle');
    expect(await page.locator(linkTogglePage.labelXpath).innerText()).toEqual(linkTogglePage.label);
  });

  test('link toggle: 2 - checking the label without a url in Preview Mode', async () => {
    await linkTogglePage.togglePreviewMode();
    expect(await page.locator(linkTogglePage.labelPreviewXpath).innerText()).toEqual(linkTogglePage.label);
    expect(await page.locator(linkTogglePage.linkXpath).isVisible()).toBeFalsy();
  });

  test('link toggle: 3 - checking the label with a url value', async () => {
    await linkTogglePage.toggleEditMode();
    await page.click(linkTogglePage.labelXpath);
    await page.click(linkTogglePage.linkIconAddXpath);
    await linkTogglePage.typeText(linkTogglePage.urlFieldAddXpath, linkTogglePage.url, 'linktoggle', linkTogglePage.checkmarkIconLinkAddFormXpath);
    expect(await page.locator(linkTogglePage.labelXpath).innerText()).toEqual(linkTogglePage.label);
    expect(await page.locator(linkTogglePage.linkXpath).getAttribute('href')).toEqual(linkTogglePage.normalizedUrl);
  });

  test('link toggle: 4 - checking the label with a url value in Preview Mode', async () => {
    await linkTogglePage.togglePreviewMode();
    expect(await page.locator(linkTogglePage.labelPreviewXpath).innerText()).toEqual(linkTogglePage.label);
    expect(await page.locator(linkTogglePage.linkXpath).getAttribute('href')).toEqual(linkTogglePage.normalizedUrl);
  });

  test('link toggle: 5 - checking the label with a url value can be edited', async () => {
    await linkTogglePage.toggleEditMode();
    await linkTogglePage.typeText(linkTogglePage.labelXpath, linkTogglePage.editedPostfix, 'linktoggle');
    expect(await page.locator(linkTogglePage.labelXpath).innerText()).toEqual(linkTogglePage.label + linkTogglePage.editedPostfix);
    expect(await page.locator(linkTogglePage.linkXpath).getAttribute('href')).toEqual(linkTogglePage.normalizedUrl);
  });

  test('link toggle: 6 - checking that a url value can be edited', async () => {
    await page.click(linkTogglePage.labelXpath);
    await page.click(linkTogglePage.linkIconEditXpath);
    await linkTogglePage.typeText(linkTogglePage.urlFieldEditXpath, linkTogglePage.editedPostfix, 'linktoggle', linkTogglePage.checkmarkIconLinkEditFormXpath);
    expect(await page.locator(linkTogglePage.labelXpath).innerText()).toEqual(linkTogglePage.label + linkTogglePage.editedPostfix);
    expect(await page.locator(linkTogglePage.linkXpath).getAttribute('href')).toEqual(linkTogglePage.normalizedUrl + linkTogglePage.editedPostfix + '/');
  });

  test('link toggle: 7 - checking the edited link in Preview mode', async () => {
    await linkTogglePage.togglePreviewMode();
    expect(await page.locator(linkTogglePage.labelPreviewXpath).innerText()).toEqual(linkTogglePage.label + linkTogglePage.editedPostfix);
    expect(await page.locator(linkTogglePage.linkXpath).getAttribute('href')).toEqual(linkTogglePage.normalizedUrl + linkTogglePage.editedPostfix + '/');
  });

  test('link toggle: 8 - checking clicking the link in Preview mode', async ({ baseURL }) => {
    await page.click(linkTogglePage.linkXpath);
    expect(page.url()).toEqual(baseURL + linkTogglePage.normalizedUrl + linkTogglePage.editedPostfix + '/');
    await page.goto('/link-toggle/');
  });

  test('link toggle: 9 - checking Remove Link feature in Edit Mode', async () => {
    await linkTogglePage.toggleEditMode();
    await page.click(linkTogglePage.labelXpath);
    await page.click(linkTogglePage.linkIconEditXpath);
    await page.click(linkTogglePage.removeLinkXpath);
    expect.soft(await page.locator(linkTogglePage.linkXpath).isVisible()).toBeFalsy();
    expect.soft(await page.locator(linkTogglePage.labelXpath).innerText()).toEqual(linkTogglePage.label + linkTogglePage.editedPostfix);
  });

  test('link toggle: 10 - checking that Remove Link removes a link in Preview mode', async ({ baseURL }) => {
    await linkTogglePage.togglePreviewMode();
    expect(await page.locator(linkTogglePage.linkXpath).isVisible()).toBeFalsy();
    expect(await page.locator(linkTogglePage.labelPreviewXpath).innerText()).toEqual(linkTogglePage.label + linkTogglePage.editedPostfix);
    await page.click(linkTogglePage.labelPreviewXpath);
    expect(page.url()).toEqual(baseURL + '/link-toggle/');
  });
});
