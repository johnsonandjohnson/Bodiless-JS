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
// base-page.ts
import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly switcherIcon: string;
  readonly editIcon: string;
  readonly pathToImages: string;
  readonly imageOneName: string;
  readonly imageTwoName: string;
  readonly menuBarLeft: string;
  readonly menuBarRight: string;
  readonly docsIcon: string;
  readonly pageIcon: string;
  readonly newPageIcon: string;
  readonly headerAddPageForm: string;
  readonly fieldAddPageForm: string;
  readonly closeIconAddPageForm: string;
  readonly checkmarkIconAddPageForm: string;
  readonly commitHistoryPanel: string;

  constructor(page: Page) {
    this.page = page;
    this.switcherIcon = '//*[@aria-label="switcher"]';
    this.editIcon = '//*[@aria-label="Edit"]';
    this.pathToImages = './playwright/images/';
    this.commitHistoryPanel = '#global-tooltip-container > div > div > div > div > div.rc-tooltip-inner';
    this.imageOneName = 'img_615x500.jpg';
    this.imageTwoName = 'img_615x502.jpg';
    this.menuBarLeft = '//*[@aria-label="Global Context Menu Left"]';
    this.menuBarRight = '//*[@aria-label="Global Context Menu Right"]';
    this.docsIcon = '//*[@aria-label="Docs"]';
    this.pageIcon = '//*[@aria-label="Page"]';
    this.newPageIcon = '//*[@aria-label="New"]';
    this.headerAddPageForm = '//*[@aria-label="Context Submenu Form"]//h3[text()="Add a Blank Page"]';
    this.fieldAddPageForm = '//*[@aria-label="Context Submenu Form"]//input[@name="new-page-path"]';
    this.closeIconAddPageForm = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Cancel"]';
    this.checkmarkIconAddPageForm = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Submit"]';
  }

  async typeText(locator:string, text:string, request:string, confirmButton?:string) {
    if (typeof confirmButton !== 'undefined') {
      await this.page.click(locator);
      await this.page.waitForTimeout(300);
      await this.page.keyboard.press('ArrowDown');
      await this.page.type(locator, text);
      await Promise.all([
        this.page.waitForResponse(response => response.url()
          .includes(request) && response.status() === 200),
        this.page.click(confirmButton),
      ]);
    } else {
      await this.page.click(locator);
      await this.page.waitForTimeout(300);
      await this.page.keyboard.press('ArrowDown');
      await Promise.all([
        this.page.waitForResponse(response => response.url()
          .includes(request) && response.status() === 200),
        this.page.type(locator, text),
      ]);
    }
  }

  async toggleMenuRight() {
    const session = await this.page.evaluate(() => window.sessionStorage);
    if (session.isPositionToggled === undefined || session.isPositionToggled === 'false') {
      await this.page.click(this.switcherIcon);
    }
  }

  async toggleMenuLeft() {
    const session = await this.page.evaluate(() => window.sessionStorage);
    if (session.isPositionToggled === 'true') {
      await this.page.click(this.switcherIcon);
    }
  }

  async toggleEditMode() {
    const session = await this.page.evaluate(() => window.sessionStorage);
    if (session.isEdit === undefined || session.isEdit === 'false') {
      await this.page.click(this.editIcon);
    }
  }

  async togglePreviewMode() {
    const session = await this.page.evaluate(() => window.sessionStorage);
    if (session.isEdit === 'true') {
      await this.page.click(this.editIcon);
    }
  }
}
