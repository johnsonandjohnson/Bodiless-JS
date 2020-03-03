describe('Editor Menu (left)', function () {

   before(function () {
      cy.visit('/')
   })

   const menuBarLeftXpath = '//*[@aria-label="Global Context Menu Left"]'
   const menuBarRightXpath = '//*[@aria-label="Global Context Menu Right"]'

   const switcherIconXpath = '//*[@aria-label="switcher"]'
   const docsIconXpath = '//*[@aria-label="Docs"]'
   const editIconXpath = '//*[@aria-label="Edit"]'
   const addPageIconXpath = '//*[@aria-label="Page"]'
   const latestCommitsIconXpath = '//*[@aria-label="listCommits"]'
   const pushIconXpath = '//*[@aria-label="savechanges"]'
   const revertIconXpath = '//*[@aria-label="resetchanges"]'

   const headerAddPageFormXpath = '//*[@aria-label="Context Menu Page Form"]//h3[text()="Add a New Page"]'
   const fieldAddPageFormXpath = '//*[@aria-label="Context Menu Page Form"]//input[@id="new-page-path"]'
   const closeIconAddPageFormXpath = '//*[@aria-label="Context Menu Page Form"]//*[@aria-label="Cancel"]'
   const checkmarkIconAddPageFormXpath = '//*[@aria-label="Context Menu Page Form"]//*[@aria-label="Submit"]'

   const headerLatestCommitsFormXpath = '//*[@aria-label="Context Menu listCommits Form"]//h3[text()="Latest Commits"]'
   const itemLatestCommitsFormXpath = '//*[@aria-label="Context Menu listCommits Form"]//input[@type="radio"][@name="commits"]'
   const checkmarkIconLatestCommitsFormXpath = '//*[@aria-label="Context Menu listCommits Form"]//*[@aria-label="Submit"]'
   const closeIconLatestCommitsFormXpath = '//*[@aria-label="Context Menu listCommits Form"]//*[@aria-label="Cancel"]'

   const headerRevertFormXpath = '//*[@aria-label="Context Menu resetchanges Form"]//h3[text()="Revert to saved"]'
   const descrRevertFormXpath = '//*[@aria-label="Context Menu resetchanges Form"]//label[text()="Discard local changes"]'
   const checkmarkIconRevertFormXpath = '//*[@aria-label="Context Menu resetchanges Form"]//*[@aria-label="Submit"]'
   const closeIconRevertFormXpath = '//*[@aria-label="Context Menu resetchanges Form"]//*[@aria-label="Cancel"]'


   it('editorMenu: 1 - checking presence of Menu buttons in Preview Mode (left)', () => {
      cy.xpath(switcherIconXpath)
         .should('be.visible')
      cy.xpath(docsIconXpath)
         .should('be.visible')
      cy.xpath(editIconXpath)
         .should('be.visible')
      cy.xpath(latestCommitsIconXpath)
         .should('be.visible')
      cy.xpath(addPageIconXpath)
         .should('not.exist')
      cy.xpath(pushIconXpath)
         .should('not.exist')
      cy.xpath(revertIconXpath)
         .should('not.exist')
   })

   it('editorMenu: 2 - checking Switcher button in Preview Mode (left and right)', () => {
      cy.xpath(switcherIconXpath)
         .click()
      cy.window().its('sessionStorage')
         .its('isPositionToggled')
         .should('equal', 'true')
      cy.xpath(menuBarRightXpath)
         .should('have.css', 'right', '0px')
      cy.xpath(switcherIconXpath)
         .click()
      cy.window().its('sessionStorage')
         .its('isPositionToggled')
         .should('equal', 'false')
      cy.xpath(menuBarLeftXpath)
         .should('have.css', 'left', '0px')
   })


   it('editorMenu: 3 - checking Latest Commits button in Preview Mode (left)', () => {
      cy.xpath(latestCommitsIconXpath)
         .click()
      cy.xpath(headerLatestCommitsFormXpath)
      cy.xpath(itemLatestCommitsFormXpath)
         .its('length')
         .should('be.gt', 3)
      cy.xpath(checkmarkIconLatestCommitsFormXpath)
      cy.xpath(closeIconLatestCommitsFormXpath)
         .click()
      cy.xpath(itemLatestCommitsFormXpath)
         .should('have.length', 0)
   })


   it('editorMenu: 4 - checking Menu buttons in Edit Mode (left)', () => {
      cy.clickEdit()
      cy.xpath(switcherIconXpath)
         .should('be.visible')
      cy.xpath(docsIconXpath)
         .should('be.visible')
      cy.xpath(editIconXpath)
         .should('be.visible')
      cy.xpath(addPageIconXpath)
         .should('be.visible')
      cy.xpath(latestCommitsIconXpath)
         .should('be.visible')
      cy.xpath(pushIconXpath)
         .should('be.visible')
      cy.xpath(revertIconXpath)
         .should('be.visible')
   })


   it('editorMenu: 5 - checking Switcher button in Edit Mode (left and right)', () => {
      cy.xpath(switcherIconXpath)
         .click()
      cy.window().its('sessionStorage')
         .its('isPositionToggled')
         .should('equal', 'true')
      cy.xpath(menuBarRightXpath)
         .should('have.css', 'right', '0px')
      cy.xpath(switcherIconXpath)
         .click()
      cy.window().its('sessionStorage')
         .its('isPositionToggled')
         .should('equal', 'false')
      cy.xpath(menuBarLeftXpath)
         .should('have.css', 'left', '0px')
   })


   it('editorMenu: 6 - checking Add a New Page button in Edit Mode (left)', () => {
      cy.xpath(addPageIconXpath)
         .click()
      cy.xpath(headerAddPageFormXpath)
      cy.xpath(fieldAddPageFormXpath)
      cy.xpath(checkmarkIconAddPageFormXpath)
      cy.xpath(closeIconAddPageFormXpath)
         .click()
   })


   it('editorMenu: 7 - checking Latest Commits button in Edit Mode (left)', () => {
      cy.xpath(latestCommitsIconXpath)
         .click()
      cy.xpath(headerLatestCommitsFormXpath)
      cy.xpath(itemLatestCommitsFormXpath)
         .its('length')
         .should('be.gt', 3)
      cy.xpath(checkmarkIconLatestCommitsFormXpath)
      cy.xpath(closeIconLatestCommitsFormXpath)
         .click()
      cy.xpath(itemLatestCommitsFormXpath)
         .should('have.length', 0)
   })


   it('editorMenu: 8 - checking Revert button in Edit Mode (left)', () => {
      cy.xpath(revertIconXpath)
         .click()
      cy.xpath(headerRevertFormXpath)
      cy.xpath(descrRevertFormXpath)
      cy.xpath(checkmarkIconRevertFormXpath)
      cy.xpath(closeIconRevertFormXpath)
         .click();
   })

   // 'Cypress does not and may never have multi-tab support' - a quote from Cypress documentation
   //  Docs icon that opens Docs app in a new tab cannot be fully tested within the current implementation
   //  Adding a test that directly checks Docs app Home page, without clicking on Docs icon
   it('editorMenu: 9 - Check Docs page', () => {
      cy.visit('/___docs')
      cy.contains('Bodiless-JS')
         .click()
      cy.url().should('include', '/___docs/#/?id=bodiless-js')
   })


})