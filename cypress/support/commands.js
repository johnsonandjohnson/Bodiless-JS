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

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload'

const menuSwitcherButton = '//*[@aria-label="switcher"]'


Cypress.Commands.add("revertChanges", () => {
  cy.xpath('//*[@aria-label="Revert"]')
    .click()
  cy.xpath('//*[@aria-label="Submit"]')
    .click()
})


Cypress.Commands.add("clickEdit", () => {
  cy.xpath('//*[contains(@aria-label,"Global Context Menu")]//*[@aria-label="Edit"]')
    .click()
})

Cypress.Commands.add("toggleEditMode", () => {
  cy.window().then(win => {
    const isEdit = win.sessionStorage.getItem('isEdit')
    if (isEdit !== true) cy.clickEdit()
  });
})

Cypress.Commands.add("togglePreviewMode", () => {
  cy.window().then(win => {
    const isEdit = win.sessionStorage.getItem('isEdit')
    if (isEdit && isEdit !== false) cy.clickEdit()
  });
})

Cypress.Commands.add("toggleMenuRight", () => {
  cy.window().then(win => {
    const isPositionToggled = win.sessionStorage.getItem('isPositionToggled')
    if (isPositionToggled !== true) {
      cy.xpath(menuSwitcherButton)
         .click()
    }
  });
})

Cypress.Commands.add("toggleMenuLeft", () => {
  cy.window().then(win => {
    const isPositionToggled = win.sessionStorage.getItem('isPositionToggled')
    if (isPositionToggled && isPositionToggled !== false) {
      cy.xpath(menuSwitcherButton)
         .click()
    }
  });
})

Cypress.Commands.add("isImageVisible", (imageXpath) => {
  cy.xpath(imageXpath)
    .should('be.visible')
    .and(($img) => {
      // "naturalWidth" and "naturalHeight" are set when the image loads
      expect($img[0].naturalWidth).to.be.greaterThan(0)
    })
})

Cypress.Commands.add("hideContextMenu", () => {
  cy.xpath('//h1')
    .click()
})