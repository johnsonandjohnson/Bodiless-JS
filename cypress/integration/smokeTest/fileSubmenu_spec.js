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

describe('File Submenu Smoke Tests', function () {

  before(function () {
    cy.visit('/')
  })

  after(function () {
    cy.togglePreviewMode()
  })


  // File Form
  const fileForm = '//*[@aria-label="Context Submenu File form"]'
  const fileFormButton = '//button[@aria-label="File"]'
  const fileFormCloseButton = '//*[@aria-label="Context Submenu File form"]//*[@aria-label="Cancel"]'

  // File Form Submenu Buttons
  const historyButton = '//*[@aria-label="Submenu"]//button[@aria-label="History"]'
  const pushButton = '//*[@aria-label="Submenu"]//button[@aria-label="Push"]'
  const pullButton = '//*[@aria-label="Submenu"]//button[@aria-label="Pull"]'
  const revertButton = '//*[@aria-label="Submenu"]//button[@aria-label="Revert"]'

  // History Form
  const historyFormTitle = '//*[@aria-label="Context Submenu Form"]//h3[text()="Latest Commits"]'
  const historyFormItems = '//*[@aria-label="Context Submenu Form"]//input[@type="radio"][@name="commits"]'
  const historyFormSubmitButton = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Submit"]'
  const historyFormCloseButton = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Cancel"]'

  // Revert Form
  const revertFormTitle = '//*[@aria-label="Context Submenu Form"]//h3[text()="Revert to saved"]'
  const revertFormDescription = '//*[@aria-label="Context Submenu Form"]//label[text()="Discard local changes"]'
  const revertFormSubmitButton = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Submit"]'
  const revertFormCloseButton = '//*[@aria-label="Context Submenu Form"]//*[@aria-label="Cancel"]'


  // Preview Mode
  it('File Submenu: 1 - Checking file submenu buttons in preview mode', () => {
    cy.togglePreviewMode()
    checkFileSubMenuButtonsPreviewMode()
  })

  it('File Submenu: 2 - Checking History button in Preview Mode (left)', () => {
    openFileForm()
    checkHistoryForm()
    isFileFormOpen()
    closeFileForm()
  })

  it('File Submenu: 3 - Checking History button in Preview Mode (right)', () => {
    cy.toggleMenuRight()
    openFileForm()
    checkHistoryForm()
    isFileFormOpen()
    closeFileForm()
    cy.toggleMenuLeft()
  })


  // Edit Mode
  it('File Submenu: 4 - Checking file submenu buttons in Edit Mode', () => {
    cy.toggleEditMode()
    checkFileSubMenuButtonsEditMode()
  })


  it('File Submenu: 5 - Checking History button in Edit Mode (left)', () => {
    openFileForm()
    checkHistoryForm()
    isFileFormOpen()
  })


  it('File Submenu: 6 - Checking Revert button in Edit Mode (left)', () => {
    checkRevertForm()
    isFileFormOpen()
    closeFileForm()
  })


  it('File Submenu: 7 - Checking Revert button in Edit Mode (right)', () => {
    cy.toggleMenuRight()
    openFileForm()
    checkRevertForm()
    isFileFormOpen()
  })


  it('File Submenu: 8 - Checking History button in Edit Mode (right)', () => {
    checkHistoryForm()
    isFileFormOpen()
    closeFileForm()
    cy.toggleMenuLeft()
  })


  function openFileForm() {
    cy.xpath(fileFormButton)
      .click()
  }

  function closeFileForm() {
    cy.xpath(fileFormCloseButton)
      .click()
  }

  function isFileFormOpen() {
    cy.xpath(fileForm)
      .should('be.visible')
  }

  function checkFileSubMenuButtonsEditMode() {
    openFileForm()

    cy.xpath(historyButton)
      .should('be.visible')
    cy.xpath(pushButton)
      .should('be.visible')
    cy.xpath(pullButton)
      .should('be.visible')
    cy.xpath(revertButton)
      .should('be.visible')
    
    closeFileForm()
  }

  function checkFileSubMenuButtonsPreviewMode() {
    openFileForm()

    cy.xpath(historyButton)
      .should('be.visible')
    cy.xpath(pushButton)
      .should('be.visible')
    cy.xpath(pullButton)
      .should('be.visible')
    cy.xpath(revertButton)
      .should('not.exist')
    
    closeFileForm()
  }

  function checkHistoryForm() {
    cy.xpath(historyButton)
      .click()
    cy.xpath(historyFormTitle)
    cy.xpath(historyFormItems)
      .its('length')
      .should('be.gt', 3)
    cy.xpath(historyFormSubmitButton)
    cy.xpath(historyFormCloseButton)
      .click()
  }

  function checkRevertForm() {
    cy.xpath(revertButton)
      .click()
    cy.xpath(revertFormTitle)
    cy.xpath(revertFormDescription)
    cy.xpath(revertFormSubmitButton)
    cy.xpath(revertFormCloseButton)
      .click()
  }
})
