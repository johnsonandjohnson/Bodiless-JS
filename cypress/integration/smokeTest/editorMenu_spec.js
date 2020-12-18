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

describe('Editor Menu (left and right)', function () {

   before(function () {
      cy.visit('/')
   })


   const menuBarLeft = '//*[@aria-label="Global Context Menu Left"]'
   const menuBarRight = '//*[@aria-label="Global Context Menu Right"]'

   const switcherIcon = '//*[@aria-label="switcher"]'
   const docsIcon = '//*[@aria-label="Docs"]'
   const docsTitle = '//*[@data-id="bodilessjs"]'
   const editIcon = '//*[@aria-label="Edit"]'
   const addPageIcon = '//*[@aria-label="Page"]'

   const headerAddPageForm = '//*[@aria-label="Context Menu Page Form"]//h3[text()="Add a Blank Page"]'
   const fieldAddPageForm = '//*[@aria-label="Context Menu Page Form"]//input[@name="new-page-path"]'
   const closeIconAddPageForm = '//*[@aria-label="Context Menu Page Form"]//*[@aria-label="Cancel"]'
   const checkmarkIconAddPageForm = '//*[@aria-label="Context Menu Page Form"]//*[@aria-label="Submit"]'


   // Preview Mode
   it('editorMenu: 1 - checking Switcher button in Preview Mode (left and right)', () => {
      cy.toggleMenuRight()
      checkMenuRight()
      cy.toggleMenuLeft()
      checkMenuLeft()
   })


   it('editorMenu: 2 - checking presence of Menu buttons in Preview Mode (left)', () => {
      cy.togglePreviewMode()
      checkEditorMenuButtonsPreviewMode()
   })


   it('editorMenu: 3 - checking presence of Menu buttons in Preview Mode (right)', () => {
      cy.toggleMenuRight()
      checkEditorMenuButtonsPreviewMode()
      cy.toggleMenuLeft()
   })


   // Edit Mode
   it('editorMenu: 4 - checking Switcher button in Edit Mode (left and right)', () => {
      cy.toggleEditMode()
      cy.toggleMenuRight()
      checkMenuRight()
      cy.toggleMenuLeft()
      checkMenuLeft()
   })


   it('editorMenu: 5 - checking Menu buttons in Edit Mode (left)', () => {
      checkEditorMenuButtonsEditMode()
   })


   it('editorMenu: 6 - checking Menu buttons in Edit Mode (right)', () => {
      cy.toggleMenuRight()
      checkEditorMenuButtonsEditMode()
      cy.toggleMenuLeft()
   })


   it('editorMenu: 7 - checking Add a New Page button in Edit Mode (left)', () => {
      checkAddNewPageButton()
   })


   it('editorMenu: 8 - checking Add a New Page button in Edit Mode (right)', () => {
      cy.toggleMenuRight()
      checkAddNewPageButton()
      cy.toggleMenuLeft()
   })


   // 'Cypress does not and may never have multi-tab support' - a quote from Cypress documentation
   //  Docs icon that opens Docs app in a new tab cannot be fully tested within the current implementation
   //  Adding a test that directly checks Docs app Home page, without clicking on Docs icon
   it('editorMenu: 9 - Check Docs page', () => {
      cy.visit('/___docs')
      cy.xpath(docsTitle)
         .click()
      cy.url().should('include', '/___docs/#/?id=bodilessjs')
   })


   function checkEditorMenuButtonsPreviewMode() {
      cy.xpath(switcherIcon)
         .should('be.visible')
      cy.xpath(docsIcon)
         .should('be.visible')
      cy.xpath(editIcon)
         .should('be.visible')
      cy.xpath(addPageIcon)
         .should('not.exist')
   }

   function checkEditorMenuButtonsEditMode() {
      cy.xpath(switcherIcon)
         .should('be.visible')
      cy.xpath(docsIcon)
         .should('be.visible')
      cy.xpath(editIcon)
         .should('be.visible')
      cy.xpath(addPageIcon)
         .should('be.visible')
   }

   function checkMenuRight() {
      cy.window().its('sessionStorage')
         .its('isPositionToggled')
         .should('equal', 'true')
      cy.xpath(menuBarRight)
         .should('have.css', 'right', '0px')
   }

   function checkMenuLeft() {
      cy.window().its('sessionStorage')
         .its('isPositionToggled')
         .should('equal', 'false')
      cy.xpath(menuBarLeft)
         .should('have.css', 'left', '0px')
   }

   function checkAddNewPageButton() {
      cy.xpath(addPageIcon)
         .click()
      cy.xpath(headerAddPageForm)
      cy.xpath(fieldAddPageForm)
      cy.xpath(checkmarkIconAddPageForm)
      cy.xpath(closeIconAddPageForm)
         .click()
   }
})