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
// accordion-page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class AccordionPage extends BasePage {
  readonly page: Page;

  readonly title: string;

  readonly body: string;

  readonly editedPostfix: string;

  readonly titleFirstXpath: string;

  readonly bodyFirstXpath: string;

  readonly plusIconFirstXpath: string;

  readonly minusIconFirstXpath: string;

  readonly bodySecondXpath: string;

  readonly plusIconSecondXpath: string;

  readonly minusIconSecondXpath: string;

  readonly accordionBodyRequest: string;

  readonly accordionTitleRequest: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.title = 'AT-Title1';
    this.body = 'AT-Description1';
    this.editedPostfix = ' - edited';
    this.titleFirstXpath = '//*[@id="accordion-4"]//*[@data-accordion-element="accordion-title"]//*[@data-slate-editor="true"]';
    this.bodyFirstXpath = '//*[@id="accordion-4"]//*[@data-accordion-element="accordion-body"]//*[@data-slate-editor="true"]';
    this.plusIconFirstXpath = '//*[@id="accordion-4"]//*[@data-accordion-icon="expand"]';
    this.minusIconFirstXpath = '//*[@id="accordion-4"]//*[@data-accordion-icon="collapse"]';
    this.bodySecondXpath = '//*[@id="accordion-5"]//*[@data-accordion-element="accordion-body"]';
    this.plusIconSecondXpath = '//*[@id="accordion-5"]//*[@data-accordion-icon="expand"]';
    this.minusIconSecondXpath = '//*[@id="accordion-5"]//*[@data-accordion-icon="collapse"]';
    this.accordionTitleRequest = 'accordion-expanded$title';
    this.accordionBodyRequest = 'accordion-expanded$body';
  }
}
