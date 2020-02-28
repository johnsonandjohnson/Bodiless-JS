describe('Link Toggle smoke tests', function () {

  before(function () {
    cy.visit('/link-toggle/')
    cy.clickEdit()
  })


  const label = 'AT - Label'
  const url = 'AT-Url'
  const editedLabelPostfix = ' - edited'
  const editedUrlPostfix = '-edited'

  const labelXpath = '//*[@class="my-3"]//*[@class="bodiless-inline-editable"]'
  const labelPreviewXpath = '//*[@class="my-3"]//span'

  const linkIconXpath = '//*[@aria-label="Local Context Menu"]//*[@aria-label="Link"]'
  const urlFieldXpath = '//form[@aria-label="Context Menu Link Form"]//input[@id="link-href"]'
  const checkmarkIconLinkFormXpath = '//form[@aria-label="Context Menu Link Form"]//button[@aria-label="Submit"]'
  const removeLinkXpath = '//form[@aria-label="Context Menu Link Form"]//button[text()="Remove Link"]'
  const linkXpath = '//*[@class="my-3"]/a'


  it('link toggle: 1 - filling in the label', () => {
    cy.xpath(labelXpath)
      .type(label)
      .should('have.text', label)
  })


  it('link toggle: 2 - checking the label in Preview mode', () => {
    cy.wait(1000)
    cy.clickEdit()
    cy.xpath(labelPreviewXpath)
      .should('have.text', label)
    cy.xpath(linkXpath)
      .should('not.exist')
  })


  it('link toggle: 3 - adding a url value', () => {
    cy.clickEdit()
    cy.xpath(labelXpath)
      .click()
    cy.xpath(linkIconXpath)
      .click()
    cy.xpath(urlFieldXpath)
      .type(url)
    cy.xpath(checkmarkIconLinkFormXpath)
      .click()
  })


  it('link toggle: 4 - checking the link in Edit mode', () => {
    cy.xpath(labelXpath)
      .should('have.text', label)
    cy.xpath(linkXpath)
      .should('have.attr', 'href', '#' + url)
  })


  it('link toggle: 5 - checking the link in Preview mode', () => {
    cy.wait(1000)
    cy.clickEdit()
    cy.xpath(labelPreviewXpath)
      .should('have.text', label)
    cy.xpath(linkXpath)
      .should('have.attr', 'href', '#' + url)
  })


  it('link toggle: 6 - editing the label', () => {
    cy.clickEdit()
    cy.xpath(labelXpath)
      .type(editedLabelPostfix)
      .should('have.text', label + editedLabelPostfix)
  })


  it('link toggle: 7 - editing the url value', () => {
    cy.xpath(labelXpath)
      .click()
    cy.xpath(linkIconXpath)
      .click()
    cy.xpath(urlFieldXpath)
      .type(editedUrlPostfix)
    cy.xpath(checkmarkIconLinkFormXpath)
      .click()
  })


  it('link toggle: 8 - checking the edited link in Preview mode', () => {
    cy.wait(1000)
    cy.clickEdit()
    cy.xpath(labelPreviewXpath)
      .should('have.text', label + editedLabelPostfix)
    cy.xpath(linkXpath)
      .should('have.attr', 'href', '#' + url + editedUrlPostfix)
  })

  it('link toggle: 9 - clicking the link in Preview mode', () => {
    cy.xpath(linkXpath)
      .click()
    cy.url().should('include', url + editedUrlPostfix)
  })


  it('link toggle: 10 - checking Remove Link feature', () => {
    cy.clickEdit()
    cy.xpath(labelXpath)
      .click()
    cy.xpath(linkIconXpath)
      .click()
    cy.xpath(removeLinkXpath)
      .click()
    cy.xpath(linkXpath)
      .should('not.exist')
    cy.xpath(labelXpath)
      .should('have.text', label + editedLabelPostfix)
  })


  it('link toggle: 11 - checking that Link is removed in Preview mode', () => {
    cy.wait(1000)
    cy.clickEdit()
    cy.xpath(linkXpath)
      .should('not.exist')
    cy.xpath(labelPreviewXpath)
      .should('have.text', label + editedLabelPostfix)
    cy.visit('/link-toggle/')
    cy.xpath(labelPreviewXpath)
      .click()
    cy.url().should('eq', Cypress.config().baseUrl + '/link-toggle/')
  })

})