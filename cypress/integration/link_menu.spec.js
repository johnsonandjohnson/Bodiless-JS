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

/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */
// <reference types="Cypress" />

context('Link Context Menu', () => {
  let nodeKey = '';
  const backendPath = '/___backend/content/pages/context';

  beforeEach(() => {
    cy.visit('/context');
  });

  it('should retain submitted value when reopened', () => {
    // activate edit mode
    cy.clickEdit();
    cy.get('div.flex-1')
      .find('a')
      .first()
      .as('first-link')
      .click();

    cy.get('@first-link').dblclick();

    cy.get('div.rc-tooltip')
      .first()
      .as('first-tooltip')
      .find('span.material-icons')
      .first()
      .click();

    cy.get('div.rc-tooltip')
      .last()
      .as('form-popup');

    const someText = Math.random().toString();

    cy.get('@form-popup')
      .find('input#link-href')
      .as('link-href')
      .clear()
      .type(someText);

    cy.server();
    cy.route('POST', `${backendPath}/*`).as('backend');

    cy.get('@form-popup')
      .find('form')
      .submit();

    cy.wait('@backend').should(xhr => {
      expect(xhr.request.body).to.haveOwnProperty('href', someText);
      // @TODO: need a way to tie a component node-key to markup
      // e.g. <a href='...' data-node-key="linkit" >some link</a>
      // otherwise there is currently no way to validate if correct backend endpoint was hit
      [nodeKey] = xhr.url.split('/').slice(-1);
      console.log(xhr);
    });

    cy.get('@first-link')
      .should('have.attr', 'href')
      .and('equal', someText);

    cy.get('@first-tooltip')
      .find('span.material-icons')
      .first()
      .click();

    cy.get('@link-href').should('have.value', someText);
  });

  it('should not display updated value in context form if it is modified by another user', () => {
    cy.get('div.flex-1')
      .find('a')
      .first()
      .as('first-link')
      .click();

    cy.get('@first-link').dblclick();

    cy.get('div.rc-tooltip')
      .first()
      .as('first-tooltip')
      .find('span.material-icons')
      .first()
      .click();

    cy.get('div.rc-tooltip')
      .last()
      .as('form-popup');

    const someText = Math.random().toString();

    cy.get('@form-popup')
      .find('input#link-href')
      .as('link-href')
      .clear()
      .type(someText);

    const someOtherText = Math.random().toString();
    cy.server();
    cy.request('POST', `${backendPath}/${nodeKey}`, {
      href: someOtherText,
    }).should(response => {
      expect(response.status).to.equal(200);
    });

    cy.get('@first-link')
      .should('have.attr', 'href')
      .and('equal', someOtherText);

    cy.get('@link-href').should('have.value', someText);
  });
});