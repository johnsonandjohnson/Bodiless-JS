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
// editorMenu.spec.ts
/* eslint-disable jest/expect-expect */
import { expect, Page, test } from '@playwright/test';
import { EditorMenuPage } from '../../pages/editor-menu-page';

async function checkEditorMenuButtons(page: Page, editorMenuPage: EditorMenuPage) {
  expect.soft(await page.locator(editorMenuPage.switcherIcon).isVisible).toBeTruthy();
  expect.soft(await page.locator(editorMenuPage.docsIcon).isVisible).toBeTruthy();
  expect.soft(await page.locator(editorMenuPage.editIcon).isVisible).toBeTruthy();
  expect.soft(await page.locator(editorMenuPage.pageIcon).isVisible).toBeTruthy();
}

async function checkAddNewPageButton(page: Page, editorMenuPage: EditorMenuPage) {
  await page.click(editorMenuPage.pageIcon);
  await page.click(editorMenuPage.newPageIcon);
  expect(await page.locator(editorMenuPage.headerAddPageForm).isVisible()).toBeTruthy();
  expect(await page.locator(editorMenuPage.fieldAddPageForm).isVisible()).toBeTruthy();
  expect(await page.locator(editorMenuPage.checkmarkIconAddPageForm).isVisible()).toBeTruthy();
  await page.click(editorMenuPage.closeIconAddPageForm);
}

test.describe('Editor Menu (left and right)', () => {
  let page: Page;
  let context:any;
  let editorMenuPage: EditorMenuPage;
  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    editorMenuPage = new EditorMenuPage(page);
    await page.goto('/');
  });

  test('editorMenu: 1 - checking Switcher button in Preview Mode (left and right)', async () => {
    await editorMenuPage.toggleMenuRight();
    expect(await editorMenuPage.checkMenu('right')).toEqual('0px');
    await editorMenuPage.toggleMenuLeft();
    expect(await editorMenuPage.checkMenu('left')).toEqual('0px');
  });

  test('editorMenu: 2 - checking presence of Menu buttons in Preview Mode (left)', async () => {
    await editorMenuPage.togglePreviewMode();
    await checkEditorMenuButtons(page, editorMenuPage);
  });

  test('editorMenu: 3 - checking presence of Menu buttons in Preview Mode (right)', async () => {
    await editorMenuPage.toggleMenuRight();
    await checkEditorMenuButtons(page, editorMenuPage);
    await editorMenuPage.toggleMenuLeft();
  });

  test('editorMenu: 4 - checking Switcher button in Edit Mode (left and right)', async () => {
    await editorMenuPage.toggleEditMode();
    await editorMenuPage.toggleMenuRight();
    expect(await editorMenuPage.checkMenu('right')).toEqual('0px');
    await editorMenuPage.toggleMenuLeft();
    expect(await editorMenuPage.checkMenu('left')).toEqual('0px');
  });

  test('editorMenu: 5 - checking Menu buttons in Edit Mode (left)', async () => {
    await checkEditorMenuButtons(page, editorMenuPage);
  });

  test('editorMenu: 6 - checking Menu buttons in Edit Mode (right)', async () => {
    await editorMenuPage.toggleMenuRight();
    await checkEditorMenuButtons(page, editorMenuPage);
    await editorMenuPage.toggleMenuLeft();
  });

  test('editorMenu: 7 - checking Add a New Page button in Edit Mode (left)', async () => {
    await checkAddNewPageButton(page, editorMenuPage);
  });

  test('editorMenu: 8 - checking Add a New Page button in Edit Mode (right)', async () => {
    await editorMenuPage.toggleMenuRight();
    await checkAddNewPageButton(page, editorMenuPage);
    await editorMenuPage.toggleMenuLeft();
  });

  test('editorMenu: 9 - Check Docs page', async ({ baseURL }) => {
    const newPagePromise = new Promise(resolve => context.once('page', resolve));
    await page.click(editorMenuPage.docsIcon);
    const newPage = await newPagePromise;
    expect.soft(editorMenuPage.docsTitle);
    // @ts-ignore
    await newPage.click(editorMenuPage.docsTitle);
    // @ts-ignore
    expect.soft(newPage.url()).toEqual(baseURL + editorMenuPage.bodilessDocUrl);
  });
});
