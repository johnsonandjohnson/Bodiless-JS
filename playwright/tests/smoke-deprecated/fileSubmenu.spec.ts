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
// fileSubmenu.spec.ts
import { expect, Page, test } from '@playwright/test';
import { FileSubmenuPage } from '../../pages/file-submenu-page';

async function checkFileSubMenuButtons(mode: 'preview' | 'edit', page: Page, fileSubmenuPage: FileSubmenuPage) {
  await page.click(fileSubmenuPage.fileFormButton);
  expect(await page.locator(fileSubmenuPage.historyButton).isVisible()).toBeTruthy();
  expect(await page.locator(fileSubmenuPage.pushButton).isVisible()).toBeTruthy();
  expect(await page.locator(fileSubmenuPage.pullButton).isVisible()).toBeTruthy();
  if (mode === 'preview') {
    expect(await page.locator(fileSubmenuPage.revertButton).isVisible()).toBeFalsy();
  }
  if (mode === 'edit') {
    expect(await page.locator(fileSubmenuPage.revertButton).isVisible()).toBeTruthy();
  }
  await page.click(fileSubmenuPage.fileFormCloseButton);
}

async function checkHistoryForm(page: Page, fileSubmenuPage: FileSubmenuPage) {
  await Promise.all([
    page.waitForResponse((response) => response.url()
      .includes('commits') && response.status() === 200),
    page.click(fileSubmenuPage.historyButton),
    page.waitForSelector(fileSubmenuPage.commitHistoryPanel),
  ]);
  expect(await page.locator(fileSubmenuPage.historyFormTitle).isVisible()).toBeTruthy();
  const historyItems = await page.$$(fileSubmenuPage.historyFormItems);
  expect(historyItems.length).toBeGreaterThanOrEqual(1);
  expect(await page.locator(fileSubmenuPage.historyFormSubmitButton).isVisible()).toBeFalsy();
  await page.click(fileSubmenuPage.historyFormCloseButton);
}

async function checkRevertForm(page: Page, fileSubmenuPage: FileSubmenuPage) {
  await page.click(fileSubmenuPage.revertButton);
  expect(await page.locator(fileSubmenuPage.revertFormTitle).isVisible()).toBeTruthy();
  expect(await page.locator(fileSubmenuPage.revertFormDescription).isVisible()).toBeTruthy();
  expect(await page.locator(fileSubmenuPage.revertFormSubmitButton).isVisible()).toBeTruthy();
  await page.click(fileSubmenuPage.revertFormCloseButton);
}

test.describe('File Submenu Smoke Tests', () => {
  let page: Page;
  let fileSubmenuPage: FileSubmenuPage;
  // tslint:disable-next-line:ter-arrow-parens
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    fileSubmenuPage = new FileSubmenuPage(page);
    await page.goto('/');
  });

  test('File Submenu: 1 - Checking file submenu buttons in preview mode', async () => {
    await fileSubmenuPage.togglePreviewMode();
    await checkFileSubMenuButtons('preview', page, fileSubmenuPage);
  });

  test('File Submenu: 2 - Checking History button in Preview Mode (left)', async () => {
    await page.click(fileSubmenuPage.fileFormButton);
    await checkHistoryForm(page, fileSubmenuPage);
    expect(await page.locator(fileSubmenuPage.fileForm).isVisible()).toBeTruthy();
    await page.click(fileSubmenuPage.fileFormCloseButton);
  });

  test('File Submenu: 3 - Checking History button in Preview Mode (right)', async () => {
    await fileSubmenuPage.toggleMenuRight();
    await page.click(fileSubmenuPage.fileFormButton);
    await checkHistoryForm(page, fileSubmenuPage);
    expect(await page.locator(fileSubmenuPage.fileForm).isVisible()).toBeTruthy();
    await page.click(fileSubmenuPage.fileFormCloseButton);
    await fileSubmenuPage.toggleMenuLeft();
  });

  test('File Submenu: 4 - Checking file submenu buttons in Edit Mode', async () => {
    await fileSubmenuPage.toggleEditMode();
    await checkFileSubMenuButtons('edit', page, fileSubmenuPage);
  });

  test('File Submenu: 5 - Checking History button in Edit Mode (left)', async () => {
    await page.click(fileSubmenuPage.fileFormButton);
    await checkHistoryForm(page, fileSubmenuPage);
    expect(await page.locator(fileSubmenuPage.fileForm).isVisible()).toBeTruthy();
    // await page.click(fileSubmenuPage.fileFormCloseButton);
  });

  test('File Submenu: 6 - Checking Revert button in Edit Mode (left)', async () => {
    // await page.click(fileSubmenuPage.fileFormButton);
    await checkRevertForm(page, fileSubmenuPage);
    expect(await page.locator(fileSubmenuPage.fileForm).isVisible()).toBeTruthy();
    await page.click(fileSubmenuPage.fileFormCloseButton);
  });

  test('File Submenu: 7 - Checking Revert button in Edit Mode (right)', async () => {
    await fileSubmenuPage.toggleMenuRight();
    await page.click(fileSubmenuPage.fileFormButton);
    await checkRevertForm(page, fileSubmenuPage);
    expect(await page.locator(fileSubmenuPage.fileForm).isVisible()).toBeTruthy();
    // await page.click(fileSubmenuPage.fileFormCloseButton);
  });

  test('File Submenu: 8 - Checking History button in Edit Mode (right)', async () => {
    await checkHistoryForm(page, fileSubmenuPage);
    expect(await page.locator(fileSubmenuPage.fileForm).isVisible()).toBeTruthy();
    await page.click(fileSubmenuPage.fileFormCloseButton);
    await fileSubmenuPage.toggleMenuLeft();
  });
});
