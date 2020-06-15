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

describe('Tout testing', function () {

  before(function () {
    cy.visit('/touts/')
    cy.clickEdit()
  })

  const title = 'AT - Title 1'
  const description = 'AT - Description 1'
  const ctaLabel = 'AT - CTA Link 1'
  const toutUrl = 'AT-toutUrl1'
  const imageAltText = 'AT-1stToutAltText'
  const editedPostfix = ' - edited'
  const editedToutUrl = '-edited'
  const imageOriginal = 'images/img_615x500.jpg'
  const imageUpdated = 'images/img_615x502.jpg'
  const titleXpath = '//*[@id="tout-horizontal"]//*[@data-tout-element="title"]//div[@data-slate-editor="true"]'
  const descriptionXpath = '//*[@id="tout-horizontal"]//*[@data-tout-element="body"]//div[@data-slate-editor="true"]'
  const ctaLabelXpath = '//*[@id="tout-horizontal"]//*[@data-tout-element="link"]//div[@data-slate-editor="true"]'
  const imagePlaceholderXpath = '//*[@id="tout-horizontal"]//img[@data-tout-element="image"]'
  const urlFieldXpath = '//form[@aria-label="Context Menu Link Form"]//input[@id="link-href"]'
  const linkIconXpath = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Link"]'
  const checkmarkIconLinkFormXpath = '//form[@aria-label="Context Menu Link Form"]//button[@aria-label="Submit"]'
  const altFieldXpath = '//form[@aria-label="Context Menu Image Form"]//input[@id="image-alt"]'
  const checkmarkIconImageFormXpath = '//form[@aria-label="Context Menu Image Form"]//button[@aria-label="Submit"]'
  const imageIconXpath = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Image"]'
  const ctaButtonXpath = '//*[@id="tout-horizontal"]//a[@data-tout-element="link"]'
  const imageLinkXpath = '//div[@id="tout-horizontal"]//a[@data-tout-element="image-link"]'


  it('touts: 1 - filling in Title', () => {
    cy.xpath(titleXpath)
      .type(title)
      .should('have.text', title)
  })


  it('touts: 2 - filling in Body', () => {
    cy.xpath(descriptionXpath)
      .click()
      .type(description)
      .should('have.text', description);
  })


  it('touts: 3 - filling in CTA text', () => {
    cy.xpath(ctaLabelXpath)
      .type(ctaLabel)
      .should('have.text', ctaLabel)
  })


  it('touts: 4 - filling in CTA url', () => {
    cy.xpath(linkIconXpath)
      .click()
    cy.xpath(urlFieldXpath)
      .type(toutUrl)
    cy.xpath(checkmarkIconLinkFormXpath)
      .click()
  })


  it('touts: 5 - uploading an image', () => {
    cy.xpath(imagePlaceholderXpath)
      .click()
    cy.xpath(imageIconXpath)
      .click()
    const fileName = imageOriginal
    cy.fixture(fileName).then(fileContent => {
      cy.get('input[type=file]').upload({ fileContent, fileName, mimeType: "image/jpeg" });
    })
    cy.wait(3000)
    cy.xpath(checkmarkIconImageFormXpath)
      .click()
  })


  it('touts: 6 - filling an image alt text', () => {
    cy.xpath(imagePlaceholderXpath)
      .click()
    cy.xpath(imageIconXpath)
      .click()
    cy.xpath(altFieldXpath).clear().type(imageAltText)
    cy.xpath(checkmarkIconImageFormXpath)
      .click()
  })


  it('touts: 7 - checking data in Preview Mode', () => {
    cy.wait(3000)
    cy.clickEdit()
    cy.xpath(titleXpath)
      .should('have.text', title)
    cy.xpath(descriptionXpath)
      .should('have.text', description);
    cy.xpath(ctaLabelXpath)
      .should('have.text', ctaLabel)
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'src', '/' + imageOriginal)
      .and('have.attr', 'alt', imageAltText)
    cy.xpath(imageLinkXpath)
      .should('have.attr', 'href', toutUrl)
    cy.xpath(ctaButtonXpath)
      .click()
    cy.url().should('include', toutUrl)
    cy.visit('/touts/');
  })


  it('touts: 8 - checking that the data still present in Edit Mode after switching back from Preview Mode', () => {
    cy.clickEdit()
    cy.xpath(titleXpath)
      .should('have.text', title)
    cy.xpath(descriptionXpath)
      .should('have.text', description);
    cy.xpath(ctaLabelXpath)
      .should('have.text', ctaLabel)
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'src', '/' + imageOriginal)
      .and('have.attr', 'alt', imageAltText)
    cy.xpath(imageLinkXpath)
      .should('have.attr', 'href', toutUrl)
  })

  it('touts: 9 - editing Title', () => {
    cy.xpath(titleXpath)
      .type(editedPostfix)
      .should('have.text', title + editedPostfix)
  })


  it('touts: 10 - editing Description', () => {
    cy.xpath(descriptionXpath)
      .click()
      .type(editedPostfix)
      .should('have.text', description + editedPostfix)
  })

  it('touts: 11 - editing CTA label', () => {
    cy.xpath(ctaLabelXpath)
      .type(editedPostfix)
      .should('have.text', ctaLabel + editedPostfix)
  })

  it('touts: 12 - editing CTA url', () => {
    cy.xpath(linkIconXpath)
      .click()
    cy.xpath(urlFieldXpath)
      .type(editedToutUrl)
    cy.xpath(checkmarkIconLinkFormXpath)
      .click()
  })


  it('touts: 13 - uploading a new image and editing an image alt text', () => {
    cy.xpath(imagePlaceholderXpath)
      .click()
    cy.xpath(imageIconXpath)
      .click()
    cy.xpath(altFieldXpath)
      .type(editedPostfix)
    const fileName = imageUpdated
    cy.fixture(fileName).then(fileContent => {
      cy.get('input[type=file]').upload({ fileContent, fileName, mimeType: "image/jpeg" });
    })
    cy.wait(3000)
    cy.xpath(checkmarkIconImageFormXpath)
      .click()
  })


  it('touts: 14 - checking edited data in Preview Mode', () => {
    cy.wait(3000)
    cy.clickEdit()
    cy.xpath(titleXpath)
      .should('have.text', title + editedPostfix)
    cy.xpath(descriptionXpath)
      .should('have.text', description + editedPostfix);
    cy.xpath(ctaLabelXpath)
      .should('have.text', ctaLabel + editedPostfix)
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'src', '/' + imageUpdated)
      .and('have.attr', 'alt', imageAltText + editedPostfix)
    cy.xpath(ctaButtonXpath)
      .should('have.attr', 'href', toutUrl + editedToutUrl)
    cy.xpath(imagePlaceholderXpath)
      .click()
    cy.url().should('include', toutUrl + editedToutUrl)
    cy.visit('/touts/');
  })


  it('touts: 15 - checking the edited data still present in Edit Mode', () => {
    cy.clickEdit()
    cy.xpath(titleXpath)
      .should('have.text', title + editedPostfix)
    cy.xpath(descriptionXpath)
      .should('have.text', description + editedPostfix);
    cy.xpath(ctaLabelXpath)
      .should('have.text', ctaLabel + editedPostfix)
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'src', '/' + imageUpdated)
      .and('have.attr', 'alt', imageAltText + editedPostfix)
    cy.xpath(imageLinkXpath)
      .should('have.attr', 'href', toutUrl + editedToutUrl)
  })
})
