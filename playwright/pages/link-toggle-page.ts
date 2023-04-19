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
// link-toggle-page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LinkTogglePage extends BasePage {
  readonly page: Page;

  readonly label: string;

  readonly url: string;

  readonly normalizedUrl: string;

  readonly editedPostfix: string;

  readonly labelXpath: string;

  readonly labelPreviewXpath: string;

  readonly linkXpath: string;

  readonly linkIconAddXpath: string;

  readonly urlFieldAddXpath: string;

  readonly linkIconEditXpath: string;

  readonly removeLinkXpath: string;

  readonly linkTextRequest: string;

  readonly linkToggleRequest: string;

  readonly linkRequest: string;

  readonly checkmarkIconLinkAddFormXpath: string;

  readonly urlFieldEditXpath: string;

  readonly checkmarkIconLinkEditFormXpath: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.linkTextRequest = 'linktoggle1$text';
    this.linkToggleRequest = 'linktoggle1$link-toggle';
    this.linkRequest = 'linktoggle1$link';
    this.label = 'AT - Label -';
    this.url = 'AT-Url';
    this.normalizedUrl = `/${this.url}/`;
    this.editedPostfix = 'edited';
    this.labelXpath = '//*[@data-linktoggle-element="link-toggle"]//*[@data-test-id="bodiless-inline-editable"]';
    this.labelPreviewXpath = '//*[@data-linktoggle-element="link-toggle"]//span';
    this.linkXpath = '//*[@data-linktoggle-element="link-toggle"]//a';
    this.linkIconAddXpath = '//*[@aria-label="Local Context Menu"]//*[@aria-label="Add Link"]';
    this.urlFieldAddXpath = '//form[@aria-label="Context Menu Add Link Form"]//input[@id="link-href"]';
    this.checkmarkIconLinkAddFormXpath = '//form[@aria-label="Context Menu Add Link Form"]//button[@aria-label="Submit"]';
    this.linkIconEditXpath = '//*[@aria-label="Local Context Menu"]//*[@aria-label="Edit Link"]';
    this.urlFieldEditXpath = '//form[@aria-label="Context Menu Edit Link Form"]//input[@id="link-href"]';
    this.checkmarkIconLinkEditFormXpath = '//form[@aria-label="Context Menu Edit Link Form"]//button[@aria-label="Submit"]';
    this.removeLinkXpath = '//form[@aria-label="Context Menu Edit Link Form"]//button[text()="Remove Link"]';
  }
}
