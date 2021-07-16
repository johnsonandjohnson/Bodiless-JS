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

describe('Flow Container smoke tests', function () {

   before(function () {
      cy.visit(pagePath);
      cy.clickEdit();
   })

   const pagePath = '/flow-container/';
   const imagesFolderPath = "images";
   const imageName = 'img_615x500.jpg';
   const title = 'AT - Title 1';
   const body = 'AT - Description 1';
   const linkUrl = '/touts/';
   const imageAltText = 'AT-ImageAltText';
   const imagePathRegex = new RegExp("images\/pages" + pagePath + "[a-zA-Z0-9]+\/" + imageName, "");
   const flowContainer = '//*[text()="Empty FlowContainer"]';
   const h2_default = '//h2[text()="Default FlowContainer"]';
   const h2_50_100 = '//h2[text()="FlowContainer with constrained widths of 50% & 100% only"]';
   const h2_restr_1 = '//h2[text()="FlowContainer restricted to 1 item"]';
   const h2_25 = '//h2[text()="Default Width of 25%"]';
   const h2_33 = '//h2[text()="Default Width of 33% (should round up to 33.33%)"]';
   const h2_50 = '//h2[text()="Default Width of 50%"]';
   const h2_66 = '//h2[text()="Default Width of 66.66% "]';
   const h2_75 = '//h2[text()="Default Width of 75%"]';
   const addComponentIconXpath = '//*[@aria-label="Add Flow Container"]';
   const addComponentIconItemXpath = '//*[@aria-label="Add Flow Container Item"]';  
   const copyComponentIconItemXpath = '//*[@aria-label="Copy Flow Container Item"]';
   const swapComponentIconItemXpath = '//*[@aria-label="Swap Flow Container Item"]';
   const deleteComponentIconItemXpath = '//*[@aria-label="Delete Flow Container Item"]';
   const checkmarkIconImageFormXpath = '//*[@aria-label="Context Menu Select Image Form"]//*[@aria-label="Submit"]';
   const imagePlaceholderEditXpath = '//section[1]//*[contains(@class,"w-full md:p-5")]//img';
   const imagePlaceholderPreviewXpath = '//*[contains(@class,"md:-m-5")][1]//img';
   const altFieldXpath = '//*[@aria-label="Context Menu Select Image Form"]//*[@id="image-alt"]';
   const titleAccordionXpath = '//*[@data-accordion-element="accordion-title"]';
   const bodyAccordionXpath = '//*[@data-accordion-element="accordion-body"]';
   const plusIconAccordionXpath = '//*[@data-accordion-icon="expand"]';
   const minusIconAccordionXpath = '//*[@data-accordion-icon="collapse"]';
   const itemInComponentPicker = '//*[@class="bl-p-grid-2"]';
   const titleInComponentPicker = '//h3[text()="Components"]';
   const imageIconXpath = '//*[@role="toolbar" and @aria-label="Local Context Menu"]//*[@aria-label="Select Image"]';
   const contentfulToutEdit = '//section[5]//*[@data-tout-element="wrapper"]';
   const contentfulToutLinkEdit = '//section[5]//a[@href="https://www.jnj.com/"][@data-tout-element="image-link"]';
   const contentfulToutPreview = '//*[contains(@class,"w-1/3")]//*[@data-tout-element="wrapper"]';
   const contentfulToutLinkPreview = '//*[contains(@class,"w-1/3")]//a[@href="https://www.jnj.com/"][@data-tout-element="image-link"]';
   const searchField = '//input[@id="Search"][@placeholder="Search"]';
   const linkIconXpath = '//*[@aria-label="Edit Image"]';
   const urlFieldXpath = '//*[@id="link-href"]';
   const checkmarkIconLinkFormXpath = '//*[@aria-label="Submit"]';
   const imageLinkXpath = '//*[contains(@class,"md:p-5")]//a';


   it('Flow Container: 1 - checking presence of all Flow Container sections', () => {
      [h2_default, h2_50_100, h2_restr_1, h2_25, h2_33, h2_50, h2_66, h2_75].forEach((element) => {
         cy.xpath(element);
      })
   })


   it('Flow Container: 2 - checking adding and filling in a Square Image in the Default Flow Container', () => {
      cy.xpath(flowContainer)
         .eq(0)
         .click({ force: true });
      cy.xpath(addComponentIconXpath)
         .click();
      cy.xpath(itemInComponentPicker + '[4]')
         .click();
      cy.xpath(titleInComponentPicker)
         .should('not.exist');
      cy.xpath(imagePlaceholderEditXpath)
         .click();
      cy.xpath(imageIconXpath)
         .click();
      cy.xpath(altFieldXpath)
         .clear()
         .type(imageAltText);
      const imagePath = `${imagesFolderPath}/${imageName}`;
      cy.fixture(imagePath).then(fileContent => {
         cy.get('input[type=file]').upload({ fileContent, fileName: imageName, mimeType: "image/jpeg" });
      })
      cy.wait(3000);
      cy.xpath(checkmarkIconImageFormXpath)
         .click();
      cy.xpath(imagePlaceholderEditXpath)
         .should('have.attr', 'src')
         .and('match', imagePathRegex);
      cy.isImageVisible(imagePlaceholderEditXpath);
      cy.xpath(imagePlaceholderEditXpath)
         .should('have.attr', 'alt', imageAltText);
      [addComponentIconItemXpath, copyComponentIconItemXpath, swapComponentIconItemXpath, deleteComponentIconItemXpath].forEach((element) => {
         cy.xpath(element);
      })
   })


   it('Flow Container: 3 - checking adding and filling in an Accordion in the Restricted to 1 item Flow Container', () => {
      cy.xpath(flowContainer)
         .eq(1)
         .click({ force: true });
      cy.xpath(addComponentIconXpath)
         .click();
         cy.xpath(searchField)
         .type('Single Accordion');
      cy.xpath(itemInComponentPicker + '[1]')
         .click();
      cy.xpath(titleAccordionXpath)
         .type(title)
         .should('have.text', title);
      cy.xpath(plusIconAccordionXpath)
         .click();
      cy.xpath(bodyAccordionXpath)
         .click()
         .type(body)
         .should('have.text', body);
      cy.xpath(minusIconAccordionXpath)
         .click();
      cy.xpath(bodyAccordionXpath)
         .should('be.hidden');
      cy.xpath(addComponentIconItemXpath)
         .should('not.exist');
      cy.xpath(swapComponentIconItemXpath);
      cy.xpath(deleteComponentIconItemXpath);
   })


   it('Flow Container: 4 - checking adding and filling in a Contentful Tout in Default Width of 33%', () => {
      cy.xpath(flowContainer)
         .eq(2)
         .click({ force: true });
      cy.xpath(addComponentIconXpath)
         .click();
      cy.xpath(searchField)
         .type('Giving Back To Community');
      cy.xpath(itemInComponentPicker + '[1]')
         .click();
      cy.xpath(contentfulToutEdit);
      cy.xpath(contentfulToutLinkEdit);
   })


   it('Flow Container: 5 - checking the added components in Preview Mode', () => {
      cy.wait(3000);
      cy.clickEdit();
      [addComponentIconItemXpath, swapComponentIconItemXpath, deleteComponentIconItemXpath].forEach((element) => {
         cy.xpath(element)
            .should('not.exist');
      })
      cy.xpath(imagePlaceholderPreviewXpath)
         .should('have.attr', 'src')
         .and('match', imagePathRegex);
      cy.isImageVisible(imagePlaceholderPreviewXpath);
      cy.xpath(imagePlaceholderPreviewXpath)
         .should('have.attr', 'alt', imageAltText);
      cy.xpath(titleAccordionXpath)
         .should('have.text', title);
      cy.xpath(bodyAccordionXpath)
         .should('be.hidden');
      cy.xpath(plusIconAccordionXpath)
         .click();
      cy.xpath(bodyAccordionXpath)
         .should('have.text', body);
      cy.xpath(contentfulToutPreview);
      cy.xpath(contentfulToutLinkPreview);
   })


   it('Flow Container: 6 - checking swaping a component (Square Image to Landscape Linkable Image)', () => {
      cy.clickEdit();
      cy.xpath(imagePlaceholderEditXpath + '[not(@data-tout-element)]')
         .click();
      cy.xpath(swapComponentIconItemXpath)
         .click();
      cy.xpath(searchField)
         .type('Landscape Linkable');
      cy.xpath(itemInComponentPicker + '[1]')
         .click();
      cy.xpath(imagePlaceholderEditXpath + '[not(@data-tout-element)]')
         .should('have.attr', 'src')
         .and('match', imagePathRegex);
      cy.isImageVisible(imagePlaceholderEditXpath + '[not(@data-tout-element)]');
      cy.xpath(imagePlaceholderEditXpath + '[not(@data-tout-element)]')
         .should('have.attr', 'alt', imageAltText);
      cy.xpath(imagePlaceholderEditXpath + '[not(@data-tout-element)]')
         .click();
      cy.xpath(linkIconXpath)
         .click();
      cy.xpath(urlFieldXpath)
         .type(linkUrl);
      cy.xpath(checkmarkIconLinkFormXpath)
         .click();
      cy.xpath(imageLinkXpath)
         .should('have.attr', 'href', linkUrl);
   })


   it('Flow Container: 7 - checking deleting a component (Accordion)', () => {
      cy.xpath(plusIconAccordionXpath)
         .click();
      cy.xpath(deleteComponentIconItemXpath)
         .click();
      [titleAccordionXpath, bodyAccordionXpath, plusIconAccordionXpath, minusIconAccordionXpath].forEach((element) => {
         cy.xpath(element)
            .should('not.exist');
      })
   })


   it('Flow Container: 8 - checking the swapped and deleted components in Preview Mode', () => {
      cy.wait(3000);
      cy.clickEdit();
      [titleAccordionXpath, bodyAccordionXpath, plusIconAccordionXpath, minusIconAccordionXpath].forEach((element) => {
         cy.xpath(element)
            .should('not.exist');
      })
      cy.xpath(imagePlaceholderPreviewXpath + '[not(@data-tout-element)]')
         .should('have.attr', 'src')
         .and('match', imagePathRegex);
      cy.xpath(imagePlaceholderPreviewXpath + '[not(@data-tout-element)]')
         .should('have.attr', 'alt', imageAltText);
      cy.xpath(imageLinkXpath)
         .should('have.attr', 'href', linkUrl);
      cy.xpath(imagePlaceholderPreviewXpath)
         .click();
      cy.url().should('eq', Cypress.config().baseUrl + linkUrl);
      cy.visit(pagePath);
   })
})