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
// pdp-page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class PdpPage extends BasePage {
  readonly page: Page;

  readonly pagePath: string;

  readonly pdpURL: string;

  readonly pdpPagePath: string;

  readonly title: string;

  readonly accordionBody: string;

  readonly pageIconXpath: string;

  readonly newPageIconXpath: string;

  readonly fieldAddPageFormXpath: string;

  readonly checkmarkIconAddPageFormXpath: string;

  readonly newPageLinkXpath: string;

  readonly titleXpath: string;

  readonly accordionOverviewBodyXpath: string;

  readonly accordionDirectionsExpandXpath: string;

  readonly accordionDirectionsBodyExpandedXpath: string;

  readonly accordionDirectionsBodyPlaceholderXpath: string;

  readonly bvTextXpath: string;

  readonly editBVIconXpath: string;

  readonly closeBVFormXpath: string;

  readonly imagePlaceholderXpath: string;

  readonly imageIconXpath: string;

  readonly checkmarkIconImageFormXpath: string;

  readonly flexboxXpath: string;

  readonly addComponentIconXpath: string;

  readonly imagePathRegex: RegExp;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.pagePath = '/products/';
    this.pdpURL = `pdp-autotest${Math.floor(Math.random() * 10000).toString()}`;
    this.pdpPagePath = this.pagePath + this.pdpURL;
    this.title = 'AT - PDP title';
    this.accordionBody = 'AT - Overview';
    this.pageIconXpath = '//*[@aria-label="Page"]';
    this.newPageIconXpath = '//*[@aria-label="New"]';
    this.fieldAddPageFormXpath = '//*[@aria-label="Context Submenu Form"]//input[@name="new-page-path"]';
    this.checkmarkIconAddPageFormXpath = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Submit"]';
    this.newPageLinkXpath = '//*[@id="new-page-link"]';
    this.titleXpath = '//*[@data-product-element="title"]//*[@data-slate-editor="true"]';
    this.accordionOverviewBodyXpath = '//*[@data-accordion-element="accordion"][@aria-label="Overview"]//*[@data-accordion-element="accordion-body"]//*[@data-slate-editor="true"]';
    this.accordionDirectionsExpandXpath = '//*[@data-accordion-element="accordion"][@aria-label="Directions"]//*[@data-accordion-icon="expand"]';
    this.accordionDirectionsBodyExpandedXpath = '//*[@data-accordion-element="accordion"][@aria-label="Directions"]//*[@data-accordion-element="accordion-body"]';
    this.accordionDirectionsBodyPlaceholderXpath = '//*[@data-accordion-element="accordion"][@aria-label="Directions"]//*[@data-accordion-element="accordion-body"]//*[text()="Enter Product Information"]';
    this.bvTextXpath = '//*[@data-product-element="ratings-summary"][text()="Please hover and click to enter Bazaarvoice Product External ID: "]';
    this.editBVIconXpath = '//*[@aria-label="Local Context Menu"]//*[@aria-label="Settings Reviews"]';
    this.closeBVFormXpath = '//*[@aria-label="Context Menu Settings Reviews Form"]//*[@aria-label="Cancel"]';
    this.imagePlaceholderXpath = '//*[@data-product-element="image"]';
    this.imageIconXpath = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Select Image"]';
    this.checkmarkIconImageFormXpath = '//form[@aria-label="Context Menu Select Image Form"]//button[@aria-label="Submit"]';
    this.flexboxXpath = '//*[@data-product-element="flow-container"]';
    this.addComponentIconXpath = '//button[@aria-label="Add Flow Container"]';
    this.imagePathRegex = new RegExp(`images/pages${this.pdpPagePath}/[a-zA-Z0-9]+/${this.imageOneName}`, '');
  }
}
