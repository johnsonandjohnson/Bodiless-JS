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

describe('Card testing', function () {

  before(function () {
    cy.visit(pagePath);
    cy.clickEdit();
  })

  const pagePath = '/cards/';
  const title = 'AT - Title 1 -';
  const description = 'AT - Description 1 -';
  const ctaLabel = 'AT - CTA Link 1 -';
  const cardUrl = 'AT-cardUrl1';
  const normilizedUrl = '/' + cardUrl + '/';
  const imageAltText = 'AT-1stCardAltText';
  const editedPostfix = 'edited';
  const imagesFolderPath = "images";
  const imageNameOriginal = 'img_615x500.jpg';
  const imageNameUpdated = 'img_615x502.jpg';
  const titleXpath = '//*[@id="card-horizontal"]//*[@data-card-element="title"]//div[@data-slate-editor="true"]';
  const descriptionXpath = '//*[@id="card-horizontal"]//*[@data-card-element="body"]//div[@data-slate-editor="true"]';
  const ctaLabelXpath = '//*[@id="card-horizontal"]//*[@data-card-element="link"]//div[@data-slate-editor="true"]';
  const imagePlaceholderXpath = '//*[@id="card-horizontal"]//img[@data-card-element="image"]';
  const urlFieldCTAXpath = '//form[@aria-label="Context Menu Edit CTA Form"]//input[@id="link-href"]';
  const linkIconCTAXpath = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Edit CTA"]';
  const checkmarkIconLinkCTAFormXpath = '//form[@aria-label="Context Menu Edit CTA Form"]//button[@aria-label="Submit"]';
  const altFieldXpath = '//form[@aria-label="Context Menu Select Image Form"]//input[@id="image-alt"]';
  const checkmarkIconImageFormXpath = '//form[@aria-label="Context Menu Select Image Form"]//button[@aria-label="Submit"]';
  const imageIconXpath = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Select Image"]';
  const ctaButtonXpath = '//*[@id="card-horizontal"]//a[@data-card-element="link"]';
  const imageLinkXpath = '//div[@id="card-horizontal"]//a[@data-card-element="image-link"]';
  const imageOrigPathRegex = new RegExp("images\/pages"+ pagePath + "[a-zA-Z0-9]+\/" + imageNameOriginal, "");
  const imageUpdPathRegex = new RegExp("images\/pages" + pagePath + "[a-zA-Z0-9]+\/" + imageNameUpdated, "");

  it('cards: 1 - filling in Title', () => {
    cy.getEditor(titleXpath)
      .typeInSlate(title)
    cy.getEditor(titleXpath)
      .should('have.text', title);
  })


  it('cards: 2 - filling in Body', () => {
    cy.getEditor(descriptionXpath)
      .typeInSlate(description)
    cy.getEditor(descriptionXpath)
      .should('have.text', description);
  })


  it('cards: 3 - filling in CTA text', () => {
    cy.getEditor(ctaLabelXpath)
      .typeInSlate(ctaLabel)
    cy.getEditor(ctaLabelXpath)
      .should('have.text', ctaLabel);
  })


  it('cards: 4 - filling in CTA url', () => {
    cy.xpath(linkIconCTAXpath)
      .click();
    cy.xpath(urlFieldCTAXpath)
      .type(cardUrl);
    cy.xpath(checkmarkIconLinkCTAFormXpath)
      .click();
  })


  it('cards: 5 - uploading an image', () => {
    cy.xpath(imagePlaceholderXpath)
      .click();
    cy.xpath(imageIconXpath)
      .click();
    const imagePath = `${imagesFolderPath}/${imageNameOriginal}`;
    cy.fixture(imagePath).then(fileContent => {
      cy.get('input[type=file]').upload({ fileContent, fileName: imageNameOriginal, mimeType: "image/jpeg" });
    })
    cy.wait(3000);
    cy.xpath(checkmarkIconImageFormXpath)
      .click();
  })


  it('cards: 6 - filling an image alt text', () => {
    cy.xpath(imagePlaceholderXpath)
      .click();
    cy.xpath(imageIconXpath)
      .click();
    cy.xpath(altFieldXpath).clear().type(imageAltText);
    cy.xpath(checkmarkIconImageFormXpath)
      .click();
  })


  it('cards: 7 - checking data in Preview Mode', () => {
    cy.wait(3000);
    cy.clickEdit();
    cy.xpath(titleXpath)
      .should('have.text', title);
    cy.xpath(descriptionXpath)
      .should('have.text', description);
    cy.xpath(ctaLabelXpath)
      .should('have.text', ctaLabel);
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'src')
      .and('match', imageOrigPathRegex);
    cy.isImageVisible(imagePlaceholderXpath);
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'alt', imageAltText);
    cy.xpath(imageLinkXpath)
      .should('have.attr', 'href', normilizedUrl);
    cy.xpath(ctaButtonXpath)
      .click();
    cy.url().should('eq', Cypress.config().baseUrl + normilizedUrl);
    cy.visit(pagePath);
  })


  it('cards: 8 - checking that the data still present in Edit Mode after switching back from Preview Mode', () => {
    cy.clickEdit();
    cy.xpath(titleXpath)
      .should('have.text', title);
    cy.xpath(descriptionXpath)
      .should('have.text', description);
    cy.xpath(ctaLabelXpath)
      .should('have.text', ctaLabel);
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'src')
      .and('match', imageOrigPathRegex);
    cy.isImageVisible(imagePlaceholderXpath);
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'alt', imageAltText);
    cy.xpath(imageLinkXpath)
      .should('have.attr', 'href', normilizedUrl);
  })


  it('cards: 9 - editing Title', () => {
    cy.getEditor(titleXpath)
      .typeInSlate(editedPostfix)
    cy.getEditor(titleXpath)
      .should('have.text', title + editedPostfix);
  })


  it('cards: 10 - editing Description', () => {
    cy.getEditor(descriptionXpath)
      .typeInSlate(editedPostfix)
    cy.getEditor(descriptionXpath)
      .should('have.text', description + editedPostfix);
  })


  it('cards: 11 - editing CTA label', () => {
    cy.getEditor(ctaLabelXpath)
      .typeInSlate(editedPostfix)
    cy.getEditor(ctaLabelXpath)
      .should('have.text', ctaLabel + editedPostfix);
  })


  it('cards: 12 - editing CTA url', () => {
    cy.xpath(linkIconCTAXpath)
      .click();
    cy.xpath(urlFieldCTAXpath)
      .type(editedPostfix);
    cy.xpath(checkmarkIconLinkCTAFormXpath)
      .click();
  })


  it('cards: 13 - uploading a new image and editing an image alt text', () => {
    cy.xpath(imagePlaceholderXpath)
      .click();
    cy.xpath(imageIconXpath)
      .click();
    cy.xpath(altFieldXpath)
      .type(editedPostfix);
    const imagePath = `${imagesFolderPath}/${imageNameUpdated}`;
    cy.fixture(imagePath).then(fileContent => {
      cy.get('input[type=file]').upload({ fileContent, fileName: imageNameUpdated, mimeType: "image/jpeg" });
    })
    cy.wait(3000);
    cy.xpath(checkmarkIconImageFormXpath)
      .click();
  })


  it('cards: 14 - checking edited data in Preview Mode', () => {
    cy.wait(3000);
    cy.clickEdit();
    cy.xpath(titleXpath)
      .should('have.text', title + editedPostfix);;
    cy.xpath(descriptionXpath)
      .should('have.text', description + editedPostfix);
    cy.xpath(ctaLabelXpath)
      .should('have.text', ctaLabel + editedPostfix);
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'src')
      .and('match', imageUpdPathRegex);
    cy.isImageVisible(imagePlaceholderXpath);
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'alt', imageAltText + editedPostfix);
    cy.xpath(ctaButtonXpath)
      .should('have.attr', 'href', normilizedUrl + editedPostfix + '/');
    cy.xpath(imagePlaceholderXpath)
      .click();
    cy.url().should('eq', Cypress.config().baseUrl + normilizedUrl + editedPostfix + '/');
    cy.visit(pagePath);
  })


  it('cards: 15 - checking the edited data still present in Edit Mode', () => {
    cy.clickEdit();
    cy.xpath(titleXpath)
      .should('have.text', title + editedPostfix);
    cy.xpath(descriptionXpath)
      .should('have.text', description + editedPostfix);
    cy.xpath(ctaLabelXpath)
      .should('have.text', ctaLabel + editedPostfix);
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'src')
      .and('match', imageUpdPathRegex);
    cy.isImageVisible(imagePlaceholderXpath);
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'alt', imageAltText + editedPostfix);
    cy.xpath(imageLinkXpath)
      .should('have.attr', 'href', normilizedUrl + editedPostfix + '/');
  })
})