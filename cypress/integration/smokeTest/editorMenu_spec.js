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
   const editIcon = '//*[@aria-label="Edit"]'
   const addPageIcon = '//*[@aria-label="Page"]'
   const historyIcon = '//*[@aria-label="History"]'
   const pushIcon = '//*[@aria-label="Push"]'
   const revertIcon = '//*[@aria-label="Revert"]'

   const headerAddPageForm = '//*[@aria-label="Context Menu Page Form"]//h3[text()="Add a New Page"]'
   const fieldAddPageForm = '//*[@aria-label="Context Menu Page Form"]//input[@id="new-page-path"]'
   const closeIconAddPageForm = '//*[@aria-label="Context Menu Page Form"]//*[@aria-label="Cancel"]'
   const checkmarkIconAddPageForm = '//*[@aria-label="Context Menu Page Form"]//*[@aria-label="Submit"]'

   const headerLatestCommitsForm = '//*[@aria-label="Context Menu History Form"]//h3[text()="Latest Commits"]'
   const itemLatestCommitsForm = '//*[@aria-label="Context Menu History Form"]//input[@type="radio"][@name="commits"]'
   const checkmarkIconLatestCommitsForm = '//*[@aria-label="Context Menu History Form"]//*[@aria-label="Submit"]'
   const closeIconLatestCommitsForm = '//*[@aria-label="Context Menu History Form"]//*[@aria-label="Cancel"]'

   const headerRevertForm = '//*[@aria-label="Context Menu Revert Form"]//h3[text()="Revert to saved"]'
   const descrRevertForm = '//*[@aria-label="Context Menu Revert Form"]//label[text()="Discard local changes"]'
   const checkmarkIconRevertForm = '//*[@aria-label="Context Menu Revert Form"]//*[@aria-label="Submit"]'
   const closeIconRevertForm = '//*[@aria-label="Context Menu Revert Form"]//*[@aria-label="Cancel"]'



   it('editorMenu: 1 - checking presence of Menu buttons in Preview Mode (left)', () => {
      checkEditorMenuButtonsPreviewMode()
   })


   it('editorMenu: 2 - checking Switcher button in Preview Mode (left and right)', () => {
      cy.xpath(switcherIcon)
         .click()
      checkMenuRight()
      cy.xpath(switcherIcon)
         .click()
      checkMenuLeft()
   })


   it('editorMenu: 3 - checking Latest Commits button in Preview Mode (left)', () => {
      checkLatestCommitsButton()
   })


   it('editorMenu: 4 - checking Menu buttons in Edit Mode (left)', () => {
      cy.clickEdit()
      checkEditorMenuButtonsEditMode()
   })


   it('editorMenu: 5 - checking Switcher button in Edit Mode (left and right)', () => {
      cy.xpath(switcherIcon)
         .click()
      checkMenuRight()
      cy.xpath(switcherIcon)
         .click()
      checkMenuLeft()
   })


   it('editorMenu: 6 - checking Add a New Page button in Edit Mode (left)', () => {
      checkAddNewPageButton()
   })


   it('editorMenu: 7 - checking Latest Commits button in Edit Mode (left)', () => {
      checkLatestCommitsButton()
   })


   it('editorMenu: 8 - checking Revert button in Edit Mode (left)', () => {
      checkRevertChangesButton()
   })


   it('editorMenu: 9 - checking presence of Menu buttons in Preview Mode (right)', () => {
      cy.clickEdit()
      cy.xpath(switcherIcon)
         .click()
      checkEditorMenuButtonsPreviewMode()
   })


   it('editorMenu: 10 - checking Switcher button in Preview Mode (right and left)', () => {
      cy.xpath(switcherIcon)
         .click()
      checkMenuLeft()
      cy.xpath(switcherIcon)
         .click()
      checkMenuRight()
   })


   // skipping until #158 is fixed
   it.skip('editorMenu: 11 - checking Latest Commits button in Preview Mode (right)', () => {
      checkLatestCommitsButton()
   })


   it('editorMenu: 12 - checking Menu buttons in Edit Mode (right)', () => {
      cy.clickEdit()
      checkEditorMenuButtonsEditMode()
   })


   it('editorMenu: 13 - checking Switcher button in Edit Mode (right anf left)', () => {
      cy.xpath(switcherIcon)
         .click()
      checkMenuLeft()
      cy.xpath(switcherIcon)
         .click()
      checkMenuRight()
   })


   it('editorMenu: 14 - checking Add a New Page button in Edit Mode (right)', () => {
      checkAddNewPageButton()
   })

   // skipping until #158 is fixed
   it.skip('editorMenu: 15 - checking Latest Commits button in Edit Mode (right)', () => {
      checkLatestCommitsButton()
   })


   it('editorMenu: 16 - checking Revert button in Edit Mode (right)', () => {
      checkRevertChangesButton()
   })


   // 'Cypress does not and may never have multi-tab support' - a quote from Cypress documentation
   //  Docs icon that opens Docs app in a new tab cannot be fully tested within the current implementation
   //  Adding a test that directly checks Docs app Home page, without clicking on Docs icon
   it('editorMenu: 17 - Check Docs page', () => {
      cy.visit('/___docs')
      cy.contains('Bodiless-JS')
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
      cy.xpath(historyIcon)
         .should('be.visible')
      cy.xpath(addPageIcon)
         .should('not.exist')
      cy.xpath(pushIcon)
         .should('be.visible')
      cy.xpath(revertIcon)
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
      cy.xpath(historyIcon)
         .should('be.visible')
      cy.xpath(pushIcon)
         .should('be.visible')
      cy.xpath(revertIcon)
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

   function checkLatestCommitsButton() {
      cy.xpath(historyIcon)
         .click()
      cy.xpath(headerLatestCommitsForm)
      cy.xpath(itemLatestCommitsForm)
         .its('length')
         .should('be.gt', 3)
      cy.xpath(checkmarkIconLatestCommitsForm)
      cy.xpath(closeIconLatestCommitsForm)
         .click()
      cy.xpath(itemLatestCommitsForm)
         .should('have.length', 0)
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

   function checkRevertChangesButton() {
      cy.xpath(revertIcon)
         .click()
      cy.xpath(headerRevertForm)
      cy.xpath(descrRevertForm)
      cy.xpath(checkmarkIconRevertForm)
      cy.xpath(closeIconRevertForm)
         .click()
   }
})