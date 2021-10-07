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

describe('Link Toggle smoke tests', function () {

  before(function () {
    cy.visit('/link-toggle/')
    cy.clickEdit()
  })


  const label = 'AT - Label -'
  const url = 'AT-Url'
  const normilizedUrl = '/' + url + '/'
  const editedPostfix = 'edited'
  const labelXpath = '//*[@data-linktoggle-element="link-toggle"]//*[@class="bodiless-inline-editable"]'
  const labelPreviewXpath = '//*[@data-linktoggle-element="link-toggle"]//span'
  const linkXpath = '//*[@data-linktoggle-element="link-toggle"]//a'
  const linkIconAddXpath = '//*[@aria-label="Local Context Menu"]//*[@aria-label="Add Link"]'
  const urlFieldAddXpath = '//form[@aria-label="Context Menu Add Link Form"]//input[@id="link-href"]'
  const checkmarkIconLinkAddFormXpath = '//form[@aria-label="Context Menu Add Link Form"]//button[@aria-label="Submit"]'
  const linkIconEditXpath = '//*[@aria-label="Local Context Menu"]//*[@aria-label="Edit Link"]'
  const urlFieldEditXpath = '//form[@aria-label="Context Menu Edit Link Form"]//input[@id="link-href"]'
  const checkmarkIconLinkEditFormXpath = '//form[@aria-label="Context Menu Edit Link Form"]//button[@aria-label="Submit"]'
  const removeLinkXpath = '//form[@aria-label="Context Menu Edit Link Form"]//button[text()="Remove Link"]'


  it('link toggle: 1 - checking the label without a url', () => {
    cy.xpath(labelXpath)
      .click()
      .type(label)
      .should('have.text', label);
  })


  it('link toggle: 2 - checking the label without a url in Preview Mode', () => {
    cy.wait(1000);
    cy.clickEdit();
    cy.xpath(labelPreviewXpath)
      .should('have.text', label);
    cy.xpath(linkXpath)
      .should('not.exist');
  })


  it('link toggle: 3 - checking the label with a url value', () => {
    cy.clickEdit();
    cy.xpath(labelXpath)
      .click();
    cy.xpath(linkIconAddXpath)
      .click();
    cy.xpath(urlFieldAddXpath)
      .type(url);
    cy.xpath(checkmarkIconLinkAddFormXpath)
      .click();
    cy.xpath(labelXpath)
      .should('have.text', label);
    cy.xpath(linkXpath)
      .should('have.attr', 'href', normilizedUrl);
  })


  it('link toggle: 4 - checking the label with a url value in Preview Mode', () => {
    cy.wait(1000);
    cy.clickEdit();
    cy.xpath(labelPreviewXpath)
      .should('have.text', label);
    cy.xpath(linkXpath)
      .should('have.attr', 'href', normilizedUrl);
  })


  it('link toggle: 5 - checking the label with a url value can be edited', () => {
    cy.clickEdit();
    cy.xpath(labelXpath)
      .type(editedPostfix)
      .should('have.text', label + editedPostfix);
    cy.xpath(linkXpath)
      .should('have.attr', 'href', normilizedUrl);
  })


  it('link toggle: 6 - checking that a url value can be edited', () => {
    cy.xpath(labelXpath)
      .click();
    cy.xpath(linkIconEditXpath)
      .click();
    cy.xpath(urlFieldEditXpath)
      .type(editedPostfix);
    cy.xpath(checkmarkIconLinkEditFormXpath)
      .click();
    cy.xpath(labelXpath)
      .should('have.text', label + editedPostfix);
    cy.xpath(linkXpath)
      .should('have.attr', 'href', normilizedUrl + editedPostfix + '/');
  })


  it('link toggle: 7 - checking the edited link in Preview mode', () => {
    cy.wait(1000);
    cy.clickEdit();
    cy.xpath(labelPreviewXpath)
      .should('have.text', label + editedPostfix);
    cy.xpath(linkXpath)
      .should('have.attr', 'href', normilizedUrl + editedPostfix + '/');
  })


  it('link toggle: 8 - checking clicking the link in Preview mode', () => {
    cy.xpath(linkXpath)
      .click();
    cy.url().should('eq', Cypress.config().baseUrl + normilizedUrl + editedPostfix + '/');
    cy.visit('/link-toggle/');
  })


  it('link toggle: 9 - checking Remove Link feature in Edit Mode', () => {
    cy.clickEdit();
    cy.xpath(labelXpath)
      .click();
    cy.xpath(linkIconEditXpath)
      .click();
    cy.xpath(removeLinkXpath)
      .click();
    cy.xpath(linkXpath)
      .should('not.exist');
    cy.xpath(labelXpath)
      .should('have.text', label + editedPostfix);
  })


  it('link toggle: 10 - checking that Remove Link removes a link in Preview mode', () => {
    cy.wait(1000);
    cy.clickEdit();
    cy.xpath(linkXpath)
      .should('not.exist');
    cy.xpath(labelPreviewXpath)
      .should('have.text', label + editedPostfix);
    cy.xpath(labelPreviewXpath)
      .click();
    cy.url().should('eq', Cypress.config().baseUrl + '/link-toggle/');
  })
})