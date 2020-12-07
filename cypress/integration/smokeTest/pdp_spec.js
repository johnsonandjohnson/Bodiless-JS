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

describe('PDP (Product Details Page) smoke tests', function () {

  before(function () {
    cy.visit(pagePath);
    cy.clickEdit();
  })

  after(function () {
    cy.togglePreviewMode();
  })

  const pagePath = '/products/';
  const pdpURL = 'pdp-autotest' + Math.floor(Math.random() * 10000).toString();
  const pdpPagePath = pagePath + pdpURL;
  const title = 'AT - PDD title';
  const accordionBody = 'AT - Overview';
  const imagesFolderPath = "images";
  const imageName = 'img_615x500.jpg';
  const addPageIconXpath = '//*[@aria-label="Page"]'; 
  const fieldAddPageFormXpath = '//*[@aria-label="Context Menu Page Form"]//input[@id="new-page-path"]';
  const checkmarkIconAddPageFormXpath = '//*[@aria-label="Context Menu Page Form"]//*[@aria-label="Submit"]';
  const newPageLinkXpath = '//*[@id="new-page-link"]';
  const titleXpath = '//*[@data-product-element="title"]';
  const accordionOverviewBodyXpath = '//*[@data-accordion-element="accordion"][@aria-label="Overview"]//*[@data-accordion-element="accordion-body"]//*[@data-slate-editor="true"]';
  const accordionDirectionsExpandXpath = '//*[@data-accordion-element="accordion"][@aria-label="Directions"]//*[@data-accordion-icon="expand"]';
  const accordionDirectionsBodyExpandedXpath = '//*[@data-accordion-element="accordion"][@aria-label="Directions"]//*[@data-accordion-element="accordion-body"]';
  const accordionDirectionsBodyPlaceholderXpath = '//*[@data-accordion-element="accordion"][@aria-label="Directions"]//*[@data-accordion-element="accordion-body"]//*[text()="Enter Product Information"]';
  const bvTextXpath = '//*[@data-product-element="ratings-summary"][text()="Please hover and click to enter Bazaarvoice Product External ID: "]';
  const editBVIconXpath = '//*[@aria-label="Local Context Menu"]//*[@aria-label="Settings Reviews"]';
  const closeBVFormXpath = '//*[@aria-label="Context Menu Settings Reviews Form"]//*[@aria-label="Cancel"]';
  const imagePlaceholderXpath = '//*[@data-product-element="image"]';
  const imageIconXpath = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Select Image"]';
  const checkmarkIconImageFormXpath = '//form[@aria-label="Context Menu Select Image Form"]//button[@aria-label="Submit"]';
  const flexboxXpath = '//*[@data-product-element="flow-container"]';
  const addComponentIconXpath = '//button[@aria-label="Add Flow Container"]';
  const imagePathRegex = new RegExp("images\/pages" + pdpPagePath + "\/[a-zA-Z0-9]+\/" + imageName, "");


  it('PDP: 1 - creating a page from /products/', () => {
    cy.xpath(addPageIconXpath)
      .click();
    cy.xpath(fieldAddPageFormXpath)
      .type(pdpURL);
    cy.xpath(checkmarkIconAddPageFormXpath)
      .click();
    cy.xpath(newPageLinkXpath, { timeout: 10000 }).click();
    cy.url().should('eq', Cypress.config().baseUrl + pdpPagePath);
  })


  it('PDP: 2 - filling in Title', () => {
    cy.xpath(titleXpath)
      .type(title)
      .should('have.text', title);
  })


  it('PDP: 3 - filling in Accordion item', () => {
    cy.xpath(accordionOverviewBodyXpath)
      .type(accordionBody)
      .should('have.text', accordionBody);
    cy.xpath(accordionDirectionsExpandXpath)
      .click({ force: true });
    cy.xpath(accordionDirectionsBodyExpandedXpath)
      .should('be.visible');
    cy.xpath(accordionDirectionsBodyPlaceholderXpath);
    cy.xpath(accordionOverviewBodyXpath)
      .should('have.text', accordionBody);
  })


  it('PDP: 4 - checking opening BazaarVoice form', () => {
    cy.xpath(bvTextXpath)
      .click({ force: true });
    cy.xpath(editBVIconXpath)
      .click();
    cy.xpath(closeBVFormXpath)
      .click();
  })


  it('PDP: 5 - checking uploading an image', () => {
    cy.xpath(imagePlaceholderXpath)
      .click();
    cy.xpath(imageIconXpath)
      .click();
    const imagePath = `${imagesFolderPath}/${imageName}`;
    cy.fixture(imagePath).then(fileContent => {
      cy.get('input[type=file]').upload({ fileContent, fileName: imageName, mimeType: "image/jpeg" });
    })
    cy.wait(3000);
    cy.xpath(checkmarkIconImageFormXpath)
      .click();
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'src')
      .and('match', imagePathRegex);
    cy.isImageVisible(imagePlaceholderXpath);
  })


  it('PDP: 6 - checking a click in FlowContainer area', () => {
    cy.xpath(flexboxXpath)
      .click({ force: true });
    cy.xpath(addComponentIconXpath)
      .should('be.visible');
  })


  it('PDP: 7 - checking the page in Preview Mode', () => {
    cy.wait(2000);
    cy.clickEdit();
    cy.xpath(titleXpath)
      .should('have.text', title);
    cy.xpath(accordionOverviewBodyXpath)
      .should('have.text', accordionBody);
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'src')
      .and('match', imagePathRegex);
    cy.isImageVisible(imagePlaceholderXpath);
  })


  it('PDP: 8 - checking that the data still present in Edit Mode', () => {
    cy.clickEdit();
    cy.xpath(titleXpath, { timeout: 10000 })
      .should('have.text', title);
    cy.xpath(accordionOverviewBodyXpath)
      .should('have.text', accordionBody);
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'src')
      .and('match', imagePathRegex);
    cy.isImageVisible(imagePlaceholderXpath);
    cy.xpath(flexboxXpath)
      .should('be.visible');
  })
})