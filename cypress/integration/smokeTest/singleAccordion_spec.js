describe('Single Accordion smoke tests', function () {

  before(function () {
    cy.visit('/accordion/')
    cy.clickEdit()
  })

  const title = 'AT - Title 1'
  const description = 'AT - Description 1'
  const editedPostfix = ' - edited'
  const titleFirstXpath = '//div[contains(@class,"p-1 w-full")][1]//h2[contains(@class,"text-2xl w-full")]'
  const descriptionFirstXpath = '//div[contains(@class,"p-1 w-full")][1]//div[contains(@class,"overflow-hidden")]//div[contains(@data-slate-editor,"true")]'
  const plusIconFirstXpath = '//div[contains(@class,"p-1 w-full")][1]//span[contains(text(),"add")]'
  const minusIconFirstXpath = '//div[contains(@class,"p-1 w-full")][1]//span[contains(text(),"remove")]'
  const descriptionSecondXpath = '//div[contains(@class,"p-1 w-full")][2]//div[contains(@class,"overflow-hidden")]//div[contains(@data-slate-editor,"true")]'
  const plusIconSecondXpath = '//div[contains(@class,"p-1 w-full")][2]//span[contains(text(),"add")]'
  const minusIconSecondXpath = '//div[contains(@class,"p-1 w-full")][2]//span[contains(text(),"remove")]'


  it('accordions: 1 - filling in Title in 1st accordion', () => {
    cy.xpath(titleFirstXpath)
      .type(title)
      .should('have.text', title)
  })


  it('accordions: 2 - filling in Description in 1st accordion', () => {
    cy.xpath(descriptionFirstXpath)
      .click()
      .type(description)
      .should('have.text', description)
  })


  it('accordions: 3 - collapsing the 1st accordion', () => {
    cy.xpath(minusIconFirstXpath)
      .click()
    cy.xpath(descriptionFirstXpath)
      .should('be.hidden')
  })


  it('accordions: 4 - expanding the 1st accordion', () => {
    cy.xpath(plusIconFirstXpath)
      .click()
    cy.xpath(descriptionFirstXpath)
      .should('be.visible')
  })


  it('accordions: 5 - expanding an empty accordion', () => {
    cy.xpath(plusIconSecondXpath)
      .click()
    cy.xpath(descriptionSecondXpath)
      .should('be.visible')
  })


  it('accordions: 6 - collapsing an empty accordion', () => {
    cy.xpath(minusIconSecondXpath)
      .click()
    cy.xpath(descriptionSecondXpath)
      .should('be.hidden')
  })


  it('accordions: 7 - checking the accordions in Preview Mode', () => {
    cy.clickEdit()
    cy.xpath(titleFirstXpath)
      .should('have.text', title)
    cy.xpath(descriptionFirstXpath)
      .should('have.text', description)
    cy.xpath(titleFirstXpath)
      .click()
    cy.xpath(descriptionFirstXpath)
      .should('be.hidden')
    cy.xpath(plusIconFirstXpath)
      .click()
    cy.xpath(descriptionFirstXpath)
      .should('be.visible')
    cy.xpath(minusIconFirstXpath)
      .click()
    cy.xpath(descriptionFirstXpath)
      .should('be.hidden')
    cy.xpath(titleFirstXpath)
      .click()
    cy.xpath(descriptionFirstXpath)
      .should('be.visible')
  })


  it('accordions: 8 - checking that data is still present in Edit Mode', () => {
    cy.clickEdit()
    cy.xpath(titleFirstXpath)
      .should('have.text', title)
    cy.xpath(descriptionFirstXpath)
      .should('have.text', description)
    cy.xpath(minusIconFirstXpath)
      .click()
    cy.xpath(descriptionFirstXpath)
      .should('be.hidden')
    cy.xpath(plusIconFirstXpath)
      .click()
    cy.xpath(descriptionFirstXpath)
      .should('be.visible')
  })


  it('accordions: 9 - editing Title in the 1st accordion', () => {
    cy.xpath(titleFirstXpath)
      .type(editedPostfix)
      .should('have.text', title + editedPostfix)
  })


  it('accordions: 10 - editing Description in the 1st accordion', () => {
    cy.xpath(descriptionFirstXpath)
      .click()
      .type(editedPostfix)
      .should('have.text', description + editedPostfix)
  })


  it('accordions: 11 - collapsing the 1st accordion', () => {
    cy.xpath(minusIconFirstXpath)
      .click()
    cy.xpath(descriptionFirstXpath)
      .should('be.hidden')
  })


  it('accordions: 12 - expanding the 1st accordion', () => {
    cy.xpath(plusIconFirstXpath)
      .click()
    cy.xpath(descriptionFirstXpath)
      .should('be.visible')
  })


  it('accordions: 13 - checking the edited data in Preview Mode', () => {
    cy.clickEdit()
    cy.xpath(titleFirstXpath)
      .should('have.text', title + editedPostfix)
    cy.xpath(descriptionFirstXpath)
      .should('have.text', description + editedPostfix)
    cy.xpath(minusIconFirstXpath)
      .click()
    cy.xpath(descriptionFirstXpath)
      .should('be.hidden')
    cy.xpath(titleFirstXpath)
      .click()
    cy.xpath(descriptionFirstXpath)
      .should('be.visible')
    cy.xpath(titleFirstXpath)
      .click()
    cy.xpath(descriptionFirstXpath)
      .should('be.hidden')
    cy.xpath(plusIconFirstXpath)
      .click()
    cy.xpath(descriptionFirstXpath)
      .should('be.visible')
  })


  it('accordions: 14 - checking that the edited data is still present in Edit Mode', () => {
    cy.clickEdit()
    cy.xpath(titleFirstXpath)
      .should('have.text', title + editedPostfix)
    cy.xpath(descriptionFirstXpath)
      .should('have.text', description + editedPostfix)
  })


})   