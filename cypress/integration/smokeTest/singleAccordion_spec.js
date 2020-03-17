describe('Single Accordion smoke tests', function () {

  before(function () {
    cy.visit('/accordion/')
    cy.clickEdit()
  })

  const title = 'AT - Title 1'
  const body = 'AT - Description 1'
  const editedPostfix = ' - edited'
  const titleFirstXpath = '//*[@id="accordion-1"]//*[@data-accordion-element="accordion-title"]'
  const bodyFirstXpath = '//*[@id="accordion-1"]//*[@data-accordion-element="accordion-body"]'
  const plusIconFirstXpath = '//*[@id="accordion-1"]//*[@data-accordion-icon="expand"]'
  const minusIconFirstXpath = '//*[@id="accordion-1"]//*[@data-accordion-icon="collapse"]'
  const bodySecondXpath = '//*[@id="accordion-2"]//*[@data-accordion-element="accordion-body"]'
  const plusIconSecondXpath = '//*[@id="accordion-2"]//*[@data-accordion-icon="expand"]'
  const minusIconSecondXpath = '//*[@id="accordion-2"]//*[@data-accordion-icon="collapse"]'


  it('accordions: 1 - filling in Title in 1st accordion', () => {
    cy.xpath(titleFirstXpath)
      .type(title)
      .should('have.text', title)
  })


  it('accordions: 2 - filling in Body in 1st accordion', () => {
    cy.xpath(bodyFirstXpath)
      .click()
      .type(body)
      .should('have.text', body)
  })


  it('accordions: 3 - collapsing the 1st accordion', () => {
    cy.xpath(minusIconFirstXpath)
      .click()
    cy.xpath(bodyFirstXpath)
      .should('be.hidden')
  })


  it('accordions: 4 - expanding the 1st accordion', () => {
    cy.xpath(plusIconFirstXpath)
      .click()
    cy.xpath(bodyFirstXpath)
      .should('be.visible')
  })


  it('accordions: 5 - expanding an empty accordion', () => {
    cy.xpath(plusIconSecondXpath)
      .click()
    cy.xpath(bodySecondXpath)
      .should('be.visible')
  })


  it('accordions: 6 - collapsing an empty accordion', () => {
    cy.xpath(minusIconSecondXpath)
      .click()
    cy.xpath(bodySecondXpath)
      .should('be.hidden')
  })


  it('accordions: 7 - checking the accordions in Preview Mode', () => {
    cy.clickEdit()
    cy.xpath(titleFirstXpath)
      .should('have.text', title)
    cy.xpath(bodyFirstXpath)
      .should('have.text', body)
    cy.xpath(titleFirstXpath)
      .click()
    cy.xpath(bodyFirstXpath)
      .should('be.hidden')
    cy.xpath(plusIconFirstXpath)
      .click()
    cy.xpath(bodyFirstXpath)
      .should('be.visible')
    cy.xpath(minusIconFirstXpath)
      .click()
    cy.xpath(bodyFirstXpath)
      .should('be.hidden')
    cy.xpath(titleFirstXpath)
      .click()
    cy.xpath(bodyFirstXpath)
      .should('be.visible')
  })


  it('accordions: 8 - checking that data is still present in Edit Mode', () => {
    cy.clickEdit()
    cy.xpath(titleFirstXpath)
      .should('have.text', title)
    cy.xpath(bodyFirstXpath)
      .should('have.text', body)
    cy.xpath(minusIconFirstXpath)
      .click()
    cy.xpath(bodyFirstXpath)
      .should('be.hidden')
    cy.xpath(plusIconFirstXpath)
      .click()
    cy.xpath(bodyFirstXpath)
      .should('be.visible')
  })


  it('accordions: 9 - editing Title in the 1st accordion', () => {
    cy.xpath(titleFirstXpath)
      .type(editedPostfix)
      .should('have.text', title + editedPostfix)
  })


  it('accordions: 10 - editing Body in the 1st accordion', () => {
    cy.xpath(bodyFirstXpath)
      .click()
      .type(editedPostfix)
      .should('have.text', body + editedPostfix)
  })


  it('accordions: 11 - collapsing the 1st accordion', () => {
    cy.xpath(minusIconFirstXpath)
      .click()
    cy.xpath(bodyFirstXpath)
      .should('be.hidden')
  })


  it('accordions: 12 - expanding the 1st accordion', () => {
    cy.xpath(plusIconFirstXpath)
      .click()
    cy.xpath(bodyFirstXpath)
      .should('be.visible')
  })


  it('accordions: 13 - checking the edited data in Preview Mode', () => {
    cy.clickEdit()
    cy.xpath(titleFirstXpath)
      .should('have.text', title + editedPostfix)
    cy.xpath(bodyFirstXpath)
      .should('have.text', body + editedPostfix)
    cy.xpath(minusIconFirstXpath)
      .click()
    cy.xpath(bodyFirstXpath)
      .should('be.hidden')
    cy.xpath(titleFirstXpath)
      .click()
    cy.xpath(bodyFirstXpath)
      .should('be.visible')
    cy.xpath(titleFirstXpath)
      .click()
    cy.xpath(bodyFirstXpath)
      .should('be.hidden')
    cy.xpath(plusIconFirstXpath)
      .click()
    cy.xpath(bodyFirstXpath)
      .should('be.visible')
  })


  it('accordions: 14 - checking that the edited data is still present in Edit Mode', () => {
    cy.clickEdit()
    cy.xpath(titleFirstXpath)
      .should('have.text', title + editedPostfix)
    cy.xpath(bodyFirstXpath)
      .should('have.text', body + editedPostfix)
  })
})   