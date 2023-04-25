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
/* eslint-disable max-len */
/* eslint-disable jest/no-standalone-expect */
import {expect, Page} from '@playwright/test';

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

  readonly addMainMenuItemButton: string;

  readonly firstMenuItem: string;

  readonly editMenuLinkButton: string;

  readonly linkInput: string;

  readonly submitButton: string;

  readonly firstMenuTitle: string;

  readonly secondMenuTitle: string;

  readonly addSubMenuItem: string;

  readonly addSubMenuListItem: string;

  readonly docsPath: string;

  readonly docsTitle: string;

  readonly bodilessDocUrl: string;

  constructor(page: Page) {
    this.page = page;
    this.docsPath = '/___docs/';
    this.docsTitle = '//*[@data-id="bodilessjs"]';
    this.switcherIcon = '//*[@aria-label="switcher"]';
    this.editIcon = '//*[@aria-label="Edit"]';
    this.pathToImages = './playwright/images/';
    this.commitHistoryPanel = 'div[class="rc-tooltip-inner"]';
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
    this.editMenuLinkButton = 'button[aria-label="Edit Menu Link"]';
    this.linkInput = '#link-href';
    this.firstMenuTitle = 'Menu1';
    this.secondMenuTitle = 'Menu2';
    this.submitButton = 'button[aria-label="Submit"]';
    this.addMainMenuItemButton = 'button[aria-label="Add Main Menu Item"]';
    this.firstMenuItem = '#content-wrapper > div:nth-child(5) > nav > ul > li:nth-child(1) > a > span';
    this.addSubMenuItem = 'button[aria-label="Sub Main Menu Item"]';
    this.addSubMenuListItem = '#bl-component-form-chameleon-radio-List';
    this.bodilessDocUrl = '/___docs/#/?id=bodilessjs';
  }

  async typeText(locator:string, text:string, request?:string, confirmButton?:string) {
    if (typeof request !== 'undefined') {
      if (typeof confirmButton !== 'undefined') {
        await this.page.click(locator);
        await this.page.keyboard.press('ArrowDown');
        await this.page.type(locator, text);
        await Promise.all([
          this.page.waitForResponse((response) => response.url()
            .includes(request) && response.status() === 200),
          this.page.click(confirmButton),
        ]);
      } else {
        await this.page.click(locator);
        await this.page.keyboard.press('ArrowDown');
        await Promise.all([
          this.page.waitForResponse((response) => response.url()
            .includes(request) && response.status() === 200),
          this.page.type(locator, text),
        ]);
      }
    } else {
      await this.page.click(locator);
      await this.page.waitForTimeout(300);
      await this.page.keyboard.press('ArrowDown');
      await this.page.type(locator, text);
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

  async isImageVisible(imageXpath: string) {
    expect(await this.page.locator(imageXpath).isVisible()).toBeTruthy();
    const imageDimensions = await this.page.locator(imageXpath).boundingBox();
    expect(imageDimensions!.width).toBeGreaterThan(0);
    expect(imageDimensions!.height).toBeGreaterThan(0);
  }
}
