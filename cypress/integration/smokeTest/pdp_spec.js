describe('PDP (Product Details Page) smoke tests', function () {

  before(function () {
    cy.visit('/products/')
    cy.clickEdit();
  })


  const random = Math.floor(Math.random() * 10000)
  const pdpURL = 'pdp-autotest' + random.toString()
  const title = 'AT - PDD title'
  const accordionBody = 'AT - Overview'
  const imageName = 'images/img_615x500.jpg'
  const addPageIconXpath = '//*[@aria-label="Page"]'
  const fieldAddPageFormXpath = '//*[@aria-label="Context Menu Page Form"]//input[@id="new-page-path"]'
  const checkmarkIconAddPageFormXpath = '//*[@aria-label="Context Menu Page Form"]//*[@aria-label="Submit"]'
  const titleXpath = '//h1'
  const accordionOverviewBodyXpath = '//h2[text()="Overview"]//parent::*//following-sibling::*//*[@data-slate-editor="true"]'
  const accordionDirectionsExpandXpath = '//h2[text()="Directions"]//following-sibling::span[@data-accordion-icon="expand"]'
  const accordionDirectionsBodyExpandedXpath = '//div[contains(@class,"expanded")][2]//div[@class="overflow-hidden"]'
  const accordionDirectionsBodyXpath = '//h2[text()="Directions"]//parent::*//following-sibling::*//*[text()="Enter Product Information"]'
  const bvTextXpath = '//div[@class="my-2"][2]/div[text()="Please hover and click to enter Bazaarvoice Product External ID: "]'
  const editBVIconXpath = '//*[@aria-label="Local Context Menu"]/*[@aria-label="Edit"]'
  const closeBVFormXpath = '//*[@aria-label="Context Menu Edit Form"]/*[@aria-label="Cancel"]'
  const imagePlaceholderXpath = '//img[@class=" w-full"]'
  const imageIconXpath = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Image"]'
  const checkmarkIconImageFormXpath = '//form[@aria-label="Context Menu Image Form"]//button[@aria-label="Submit"]'
  const flexboxXpath = '//div[contains(@class,"bl-flex-wrap")][text()="Empty FlowContainer"]'
  const addComponentIconXpath = '//button[@aria-label="add"]'
  const horToutinSelectorXpath = '//div[@class="bl-p-grid-2"][1]'
  const horToutinFlexboxXpath = '//div[@data-tout-element="wrapper"]'


  it('PDP: 1 - creating a page from /products/', () => {
    cy.xpath(addPageIconXpath)
      .click();
    cy.xpath(fieldAddPageFormXpath)
      .type(pdpURL);
    cy.xpath(checkmarkIconAddPageFormXpath)
      .click();
    // commented until #251 is fixed
    // cy.url({ timeout: 10000 }).should('eq', Cypress.config().baseUrl + '/products/' + pdpURL + '/');
    cy.url({ timeout: 10000 }).should('eq', Cypress.config().baseUrl + '/products/' + pdpURL);
  })


  it('PDP: 2 - filling in Title', () => {
    cy.xpath(titleXpath)
      .type(title)
      .should('have.text', title);
  })


  it('PDP: 3 - filling in Accordion item', () => {
    cy.xpath(accordionOverviewBodyXpath)
      .type(accordionBody)
      .should('have.text', accordionBody);
    cy.xpath(accordionDirectionsExpandXpath)
      .click({ force: true });
    cy.xpath(accordionDirectionsBodyExpandedXpath)
      .should('be.visible');
    cy.xpath(accordionDirectionsBodyXpath);
    cy.xpath(accordionOverviewBodyXpath)
      .should('have.text', accordionBody);
  })


  it('PDP: 4 - checking opening BazaarVoice form', () => {
    cy.xpath(bvTextXpath)
      .click({ force: true });
    cy.xpath(editBVIconXpath)
      .click();
    cy.xpath(closeBVFormXpath)
      .click();
  })


  it('PDP: 5 - checking uploading an image', () => {
    cy.xpath(imagePlaceholderXpath)
      .click();
    cy.xpath(imageIconXpath)
      .click();
    const fileName = imageName
    cy.fixture(fileName).then(fileContent => {
      cy.get('input[type=file]').upload({ fileContent, fileName, mimeType: "image/jpeg" });
    })
    cy.wait(3000);
    cy.xpath(checkmarkIconImageFormXpath)
      .click();
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'src', '/' + imageName);
  })


  it('PDP: 6 - checking adding a tout in Flexbox area', () => {
    cy.xpath(flexboxXpath)
      .click({ force: true });
    cy.xpath(addComponentIconXpath)
      .click();
    cy.xpath(horToutinSelectorXpath)
      .click();
    cy.xpath(horToutinFlexboxXpath)
      .should('be.visible');
  })


  it('PDP: 7 - checking the page in Preview Mode', () => {
    cy.wait(2000);
    cy.clickEdit();
    cy.xpath(titleXpath)
      .should('have.text', title);
    cy.xpath(accordionOverviewBodyXpath)
      .should('have.text', accordionBody);
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'src', '/' + imageName);
    cy.xpath(horToutinFlexboxXpath)
      .should('be.visible');
  })


  it('PDP: 8 - checking that the data still present in Edit Mode', () => {
    cy.clickEdit();
    cy.xpath(titleXpath, { timeout: 10000 })
      .should('have.text', title);
    cy.xpath(accordionOverviewBodyXpath)
      .should('have.text', accordionBody);
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'src', '/' + imageName);
    cy.xpath(horToutinFlexboxXpath)
      .should('be.visible');
  })
})   