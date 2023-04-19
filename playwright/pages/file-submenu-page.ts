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
// file-submenu-page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class FileSubmenuPage extends BasePage {
  readonly page: Page;

  readonly fileForm: string;

  readonly fileFormButton: string;

  readonly fileFormCloseButton: string;

  readonly historyButton: string;

  readonly pushButton: string;

  readonly pullButton: string;

  readonly revertButton: string;

  readonly historyFormTitle: string;

  readonly historyFormItems: string;

  readonly historyFormSubmitButton: string;

  readonly historyFormCloseButton: string;

  readonly revertFormTitle: string;

  readonly revertFormDescription: string;

  readonly revertFormSubmitButton: string;

  readonly revertFormCloseButton: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.fileForm = '//*[@aria-label="Context Submenu File form"]';
    this.fileFormButton = '//button[@aria-label="File"]';
    this.fileFormCloseButton = '//*[@aria-label="Context Submenu File form"]//*[@aria-label="Cancel"]';
    this.historyButton = '//*[@aria-label="Submenu"]//button[@aria-label="History"]';
    this.pushButton = '//*[@aria-label="Submenu"]//button[@aria-label="Push"]';
    this.pullButton = '//*[@aria-label="Submenu"]//button[@aria-label="Pull"]';
    this.revertButton = '//*[@aria-label="Submenu"]//button[@aria-label="Revert"]';
    this.historyFormTitle = '//*[@aria-label="Context Submenu Form"]//h3[text()="Latest Commits"]';
    this.historyFormItems = '//*[@aria-label="Context Submenu Form"]//input[@type="radio"][@name="commits"]';
    this.historyFormSubmitButton = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Submit"]';
    this.historyFormCloseButton = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Cancel"]';
    this.revertFormTitle = '//*[@aria-label="Context Submenu Form"]//h3[text()="Revert to saved"]';
    this.revertFormDescription = '//*[@aria-label="Context Submenu Form"]//label[text()="Discard local changes"]';
    this.revertFormSubmitButton = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Submit"]';
    this.revertFormCloseButton = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Cancel"]';
  }
}
