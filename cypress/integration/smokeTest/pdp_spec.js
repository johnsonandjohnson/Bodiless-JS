describe('PDP (Product Details Page) smoke tests', function () {

  before(function () {
    cy.visit('/products/');
    cy.clickEdit();
  })

  after(function() {
    cy.togglePreviewMode();
  })

  const random = Math.floor(Math.random() * 10000)
  const pdpURL = 'pdp-autotest' + random.toString()
  const title = 'AT - PDD title'
  const accordionBody = 'AT - Overview'
  const imageName = 'images/img_615x500.jpg'
  const addPageIconXpath = '//*[@aria-label="Page"]'
  const fieldAddPageFormXpath = '//*[@aria-label="Context Menu Page Form"]//input[@id="new-page-path"]'
  const newPageLinkXpath = '//*[@id="new-page-link"]'
  const checkmarkIconAddPageFormXpath = '//*[@aria-label="Context Menu Page Form"]//*[@aria-label="Submit"]'
  const titleXpath = '//*[@data-product-element="title"]'
  const accordionOverviewBodyXpath = '//*[@data-accordion-element="accordion"][@aria-label="Overview"]//*[@data-accordion-element="accordion-body"]//*[@data-slate-editor="true"]'
  const accordionDirectionsExpandXpath = '//*[@data-accordion-element="accordion"][@aria-label="Directions"]//*[@data-accordion-icon="expand"]'
  const accordionDirectionsBodyExpandedXpath = '//*[@data-accordion-element="accordion"][@aria-label="Directions"]//*[@data-accordion-element="accordion-body"]'
  const accordionDirectionsBodyPlaceholderXpath = '//*[@data-accordion-element="accordion"][@aria-label="Directions"]//*[@data-accordion-element="accordion-body"]//*[text()="Enter Product Information"]'
  const bvTextXpath = '//*[@data-product-element="ratings-summary"][text()="Please hover and click to enter Bazaarvoice Product External ID: "]'
  const editBVIconXpath = '//*[@aria-label="Local Context Menu"]/*[@aria-label="Settings"]'
  const closeBVFormXpath = '//*[@aria-label="Context Menu Settings Form"]/*[@aria-label="Cancel"]'
  const imagePlaceholderXpath = '//*[@data-product-element="image"]'
  const imageIconXpath = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Image"]'
  const checkmarkIconImageFormXpath = '//form[@aria-label="Context Menu Image Form"]//button[@aria-label="Submit"]'
  const flexboxXpath = '//*[@data-product-element="flow-container"]'
  const addComponentIconXpath = '//button[@aria-label="Add"]'


  it('PDP: 1 - creating a page from /products/', () => {
    cy.xpath(addPageIconXpath)
      .click();
    cy.xpath(fieldAddPageFormXpath)
      .type(pdpURL);
    cy.xpath(checkmarkIconAddPageFormXpath)
      .click();
    cy.xpath(newPageLinkXpathcommits-list.test.tsx,{ timeout: 10000 } ).click();
    cy.url().should('eq', Cypress.config().baseUrl + '/products/' + pdpURL);
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
    cy.xpath(accordionDirectionsBodyPlaceholderXpath);
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


  it('PDP: 6 - checking a click in FlowContainer area', () => {
    cy.xpath(flexboxXpath)
      .click({ force: true });
    cy.xpath(addComponentIconXpath)
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
  })


  it('PDP: 8 - checking that the data still present in Edit Mode', () => {
    cy.clickEdit();
    cy.xpath(titleXpath, { timeout: 10000 })
      .should('have.text', title);
    cy.xpath(accordionOverviewBodyXpath)
      .should('have.text', accordionBody);
    cy.xpath(imagePlaceholderXpath)
      .should('have.attr', 'src', '/' + imageName);
    cy.xpath(flexboxXpath)
      .should('be.visible');
  })
})
