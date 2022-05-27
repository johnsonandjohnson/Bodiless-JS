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
// flow-container-page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class FlowContainerPage extends BasePage {
  readonly page: Page;
  readonly flowContainerDefault:string;
  readonly flowContainerLibrary:string;
  readonly flowContainer50And100:string;
  readonly flowContainer100Only:string;
  readonly flowContainer1Item:string;
  readonly flowContainer25Width:string;
  readonly flowContainer33Width:string;
  readonly flowContainer50Width:string;
  readonly flowContainer66Width:string;
  readonly flowContainer75Width:string;
  readonly flowContainerContentful:string;
  readonly flowContainerLimitedFlow:string;
  readonly flowContainerNestedFlow:string;
  readonly addFlowContainerButton:string;
  readonly imagesCheckbox:string;
  readonly squareImageButton:string;
  readonly squareImageButtonInsideContainer: string;
  readonly selectImageButton: string;
  readonly swapComponentButton: string;
  readonly deleteComponentButton: string;
  readonly accordionCheckbox: string;
  readonly accordionTitle: string;
  readonly accordionInPicker: string;
  readonly accordionPlusButton: string;
  readonly accordionBody: string;
  readonly accordionMinusButton: string;
  readonly contentfulCheckbox: string;
  readonly addComponentButton: string;
  readonly editImageButton: string;
  readonly imageAlt: string;
  readonly altText: string;
  readonly accordionBodyText: string;
  readonly landscapeLinkableImage: string;
  readonly accordionText: string;
  readonly accordionBodyPreview: string;
  readonly accordionTitlePreview: string;
  readonly elementInside33Width: string;
  readonly imageLinkField: string;
  readonly imageLinkText: string;
  readonly imageLink: string;
  readonly flowContainerImage: string;
  readonly imagePathRegex: RegExp;
  readonly pagePath: string;
  readonly imageName: string;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.flowContainerDefault = '#flowContainer';
    this.flowContainerLibrary = '#flowContainerWithLibrary';
    this.flowContainer50And100 = '#constrained_widths';
    this.flowContainer100Only = '#constrained_full_width';
    this.flowContainer1Item = '#restricted';
    this.flowContainer25Width = '#width_25';
    this.flowContainer33Width = '#width_33';
    this.flowContainer50Width = '#width_50';
    this.flowContainer66Width = '#width_66';
    this.flowContainer75Width = '#width_75';
    this.elementInside33Width = '#width_33 > div > div';
    this.imageLinkField = '#link-href';
    this.imageLinkText = 'new_link';
    this.flowContainerContentful = '#contentfulFlowContainer > div:nth-child(1)';
    this.flowContainerLimitedFlow = '#flowContainerLimited > div';
    this.flowContainerNestedFlow = '#regionContainer > div:nth-child(1)';
    this.addFlowContainerButton = 'button[aria-label="Add Flow Container"]';
    this.addComponentButton = 'button[aria-label="Add Component"]';
    this.imagesCheckbox = '#Image';
    this.accordionCheckbox = '#Accordion';
    this.swapComponentButton = 'button[aria-label="Swap Component"]';
    this.deleteComponentButton = 'button[aria-label="Delete Component"]';
    this.selectImageButton = 'button[aria-label="Select Image"]';
    this.editImageButton = 'button[aria-label="Edit Image"]';
    this.squareImageButton = 'div[data-item-id="SquareImage"] button';
    this.accordionInPicker = 'button[type="Submit"]';
    this.accordionPlusButton = 'span[aria-label="Expand Accordion"]';
    this.accordionMinusButton = 'span[aria-label="Collapse Accordion"]';
    this.contentfulCheckbox = '#Contentful';
    this.accordionBody = 'div[data-bl-design-key="AccordionBody:Content"] div[role="textbox"]';
    this.accordionBodyPreview = 'div[data-bl-design-key="AccordionBody:Content"]';
    this.accordionTitle = 'div[aria-label="Filter"] div[role="textbox"]';
    this.accordionTitlePreview = 'div[data-bl-design-key="AccordionTitle:Label"]';
    this.squareImageButtonInsideContainer = '#flowContainer > div > img';
    this.altText = 'alt-test';
    this.imageAlt = '#image-alt';
    this.accordionBodyText = 'accordion-body-text';
    this.landscapeLinkableImage = 'div[data-item-id="LandscapeLinkableImage"]';
    this.accordionText = 'text_to_check';
    this.imageLink = '#flowContainer > div a';
    this.flowContainerImage = '#flowContainer > div a >> img';
    this.pagePath = '/flow-container/';
    this.imageName = 'img_615x502.jpg';
    // tslint:disable-next-line:prefer-template
    this.imagePathRegex = new RegExp('images\\/pages' + this.pagePath + '[a-zA-Z0-9]+\\/' + this.imageName, '');
  }
}
