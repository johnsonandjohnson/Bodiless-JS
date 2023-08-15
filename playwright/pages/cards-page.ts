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
// cards-page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class CardsPage extends BasePage {
  readonly page: Page;

  readonly pagePath: string;

  readonly title: string;

  readonly description: string;

  readonly ctaLabel: string;

  readonly cardUrl: string;

  readonly normalizedUrl: string;

  readonly imageAltText: string;

  readonly editedPostfix: string;

  readonly titleXpath: string;

  readonly descriptionXpath: string;

  readonly ctaLabelXpath: string;

  readonly imagePlaceholderXpath: string;

  readonly urlFieldCTAXpath: string;

  readonly linkIconCTAXpath: string;

  readonly checkmarkIconLinkCTAFormXpath: string;

  readonly altFieldXpath: string;

  readonly checkmarkIconImageFormXpath: string;

  readonly imageIconXpath: string;

  readonly ctaButtonXpath: string;

  readonly imageLinkXpath: string;

  readonly imageOrigPathRegex: RegExp;

  readonly imageUpdPathRegex: RegExp;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pagePath = '/cards/';
    this.title = 'AT - Title 1 -';
    this.description = 'AT - Description 1 -';
    this.ctaLabel = 'AT - CTA Link 1 -';
    this.cardUrl = 'AT-cardUrl1';
    this.normalizedUrl = `/${this.cardUrl}/`;
    this.imageAltText = 'AT-1stCardAltText';
    this.editedPostfix = 'edited';
    this.titleXpath = '//*[@id="card-horizontal"]//*[@data-card-element="title"]//div[@data-slate-editor="true"]';
    this.descriptionXpath = '//*[@id="card-horizontal"]//*[@data-card-element="body"]//div[@data-slate-editor="true"]';
    this.ctaLabelXpath = '//*[@id="card-horizontal"]//*[@data-card-element="link"]//div[@data-slate-editor="true"]';
    this.imagePlaceholderXpath = '//*[@id="card-horizontal"]//img[@data-card-element="image"]';
    this.urlFieldCTAXpath = '//form[@aria-label="Context Menu Edit CTA Form"]//input[@id="link-href"]';
    this.linkIconCTAXpath = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Edit CTA"]';
    this.checkmarkIconLinkCTAFormXpath = '//form[@aria-label="Context Menu Edit CTA Form"]//button[@aria-label="Submit"]';
    this.altFieldXpath = '//form[@aria-label="Context Menu Select Image Form"]//input[@id="image-alt"]';
    this.checkmarkIconImageFormXpath = '//form[@aria-label="Context Menu Select Image Form"]//button[@aria-label="Submit"]';
    this.imageIconXpath = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Select Image"]';
    this.ctaButtonXpath = '//*[@id="card-horizontal"]//a[@data-card-element="link"]';
    this.imageLinkXpath = '//div[@id="card-horizontal"]//a[@data-card-element="image-link"]';
    // tslint:disable-next-line:prefer-template
    this.imageOrigPathRegex = new RegExp(`images\\/pages${this.pagePath}[a-zA-Z0-9]+\\/${this.imageOneName}`, '');
    // tslint:disable-next-line:prefer-template
    this.imageUpdPathRegex = new RegExp(`images\\/pages${this.pagePath}[a-zA-Z0-9]+\\/${this.imageTwoName}`, '');
  }
}
