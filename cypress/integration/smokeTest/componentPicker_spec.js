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

describe('Component Picker smoke test', function () {

   before(function () {
      cy.visit(pagePath);
      cy.clickEdit();
   })

   const pagePath = '/flow-container/';
   const searchTerm = 'rich text';
   const flowContainer = '//*[text()="Empty FlowContainer"]';
   const addComponentIconXpath = '//*[@aria-label="Add"]';
   const itemInComponentPicker = '//*[@class="bl-p-grid-2"]';
   const accordionIteminComponentPicker = '//*[@class="bl-p-grid-2"]//*[text()="Accordion Title"]';
   const allCheckbox = '//*[@id="All"]';
   const allLabel = '//*[@for="All"]';
   const typeLabelArrow = '//*[text()="expand_less"]//following-sibling::label[text()="Type"]';
   const orientationExpandArrow = '//*[text()="expand_less"]//following-sibling::label[text()="Orientation"]';
   const orientationCollapseArrow = '//*[text()="expand_more"]//following-sibling::label[text()="Orientation"]';
   const imageLabelArrow = '//*[text()="expand_less"]//following-sibling::label[text()="Image"]';
   const toutLabelArrow = '//*[text()="expand_less"]//following-sibling::label[text()="Tout Structure"]';
   const arrowFilter = '//*[text()="expand_less"]';
   const richTextCheckbox = '//*[@id="Rich Text"]';
   const richTextLabel = '//*[@for="Rich Text"]';
   const imageCheckbox = '//*[@id="Image"]';
   const imageLabel = '//*[@for="Image"]';
   const toutCheckbox = '//*[@id="Tout"]';
   const toutLabel = '//*[@for="Tout"]';
   const contentfulCheckbox = '//*[@id="Contentful"]';
   const contentfulLabel = '//*[@for="Contentful"]';
   const accordionCheckbox = '//*[@id="Accordion"]';
   const accordionLabel = '//*[@for="Accordion"]';
   const naCheckbox = '//*[@id="N/A"]';
   const naLabel = '//*[@for="N/A"]';
   const horizCheckbox = '//*[@id="Horizontal"]';
   const horizLabel = '//*[@for="Horizontal"]';
   const vertCheckbox = '//*[@id="Vertical"]';
   const vertLabel = '//*[@for="Vertical"]';
   const searchField = '//*[@id="Search"][@placeholder="Search"]';
   const squareCheckbox = '//*[@id="Square"]';
   const squareLabel = '//*[@for="Square"]';
   const landscapeCheckbox = '//*[@id="Landscape"]';
   const landscapeLabel = '//*[@for="Landscape"]';
   const linkableCheckbox = '//*[@id="Linkable"]';
   const linkableLabel = '//*[@for="Linkable"]';
   const withTitleaBodyLabel = '//*[@for="With Title and Body"]';
   const withCTALabel = '//*[@for="With CTA"]';
   const noCTALabel = '//*[@for="No CTA"]';
   const noTitleLabel = '//*[@for="No Title"]';
   const noBodyLabel = '//*[@for="No Body"]';
   const noTitleaBodyLabel = '//*[@for="No Title and Body"]';
   const withTitleaBodyCheckbox = '//*[@id="With Title and Body"]';
   const withCTACheckbox = '//*[@id="With CTA"]';
   const noCTACheckbox = '//*[@id="No CTA"]';
   const noTitleCheckbox = '//*[@id="No Title"]';
   const noBodyCheckbox = '//*[@id="No Body"]';
   const noTitleaBodyCheckbox = '//*[@id="No Title and Body"]';
   const simpleRTEItem = '//*[text()="Simple Rich Text"]//following-sibling::*//*[text()="format_size"]';
   const basicRTEItem = '//*[text()="Basic Rich Text"]//following-sibling::*//*[text()="format_bold"]';
   const fullRTEItem = '//*[text()="Full Rich Text"]//following-sibling::*//*[text()="format_quote"]';
   const closeIcon = '//*[text()="cancel"]';
   const titleInComponentPicker = '//h3[text()="Components"]';


   it('Component Picker: 1 - checking presence of all components by amount', () => {
      cy.xpath(flowContainer)
         .eq(0)
         .click({ force: true });
      cy.xpath(addComponentIconXpath)
         .click();
      cy.xpath(itemInComponentPicker)
         .should('have.length', 24);
   })


   it('Component Picker: 2 - checking presence of the Filter and Search elements', () => {
      [allCheckbox + '[not(@disabled)]',
      richTextCheckbox + '[not(@disabled)]',
      imageCheckbox + '[not(@disabled)]',
      toutCheckbox + '[not(@disabled)]',
      contentfulCheckbox + '[not(@disabled)]',
      accordionCheckbox + '[not(@disabled)]',
      naCheckbox + '[not(@disabled)]',
      horizCheckbox + '[not(@disabled)]',
      vertCheckbox + '[not(@disabled)]',
         allLabel,
         typeLabelArrow,
         orientationExpandArrow,
         richTextLabel,
         imageLabel,
         toutLabel,
         contentfulLabel,
         accordionLabel,
         naLabel,
         horizLabel,
         vertLabel,
         searchField].forEach((element) => {
            cy.xpath(element);
         })
      cy.xpath(arrowFilter)
         .should('have.length', 2);
      cy.xpath(imageLabelArrow)
         .should('not.exist');
   })


   it('Component Picker: 3 - checking Search functionality - Rich Text', () => {
      cy.xpath(searchField)
         .type(searchTerm);
      cy.xpath(itemInComponentPicker)
         .should('have.length', 3);
      [itemInComponentPicker + '//*[text()="Simple Rich Text"]',
      itemInComponentPicker + '//*[text()="Basic Rich Text"]',
      itemInComponentPicker + '//*[text()="Full Rich Text"]',
         simpleRTEItem,
         basicRTEItem,
         fullRTEItem,
      richTextCheckbox + '[not(@disabled)]',
      imageCheckbox + '[@disabled]',
      toutCheckbox + '[@disabled]',
      contentfulCheckbox + '[@disabled]',
      accordionCheckbox + '[@disabled]',
      naCheckbox + '[not(@disabled)]',
      horizCheckbox + '[@disabled]',
      vertCheckbox + '[@disabled]'].forEach((element) => {
         cy.xpath(element);
      })
      cy.xpath(searchField)
         .clear();
      cy.xpath(itemInComponentPicker)
         .should('have.length', 24);
   })


   it('Component Picker: 4 - checking Filter functionality - Accordion', () => {
      cy.xpath(accordionCheckbox)
         .click();
      cy.xpath(itemInComponentPicker)
         .should('have.length', 1);
      cy.xpath(itemInComponentPicker + '//*[text()="Single Accordion"]');
      cy.xpath(itemInComponentPicker)
         .should('have.length', 1);
      [accordionIteminComponentPicker,
         richTextCheckbox + '[@disabled]',
         imageCheckbox + '[@disabled]',
         toutCheckbox + '[@disabled]',
         contentfulCheckbox + '[@disabled]',
         accordionCheckbox + '[not(@disabled)]',
         naCheckbox + '[not(@disabled)]',
         horizCheckbox + '[@disabled]',
         vertCheckbox + '[@disabled]'].forEach((element) => {
            cy.xpath(element);
         })
      cy.xpath(accordionLabel)
         .click();
      cy.xpath(itemInComponentPicker)
         .should('have.length', 24);
   })


   it('Component Picker: 5 - checking Filter functionality - Image', () => {
      cy.xpath(imageCheckbox)
         .click();
      cy.xpath(itemInComponentPicker)
         .should('have.length', 4);
      [itemInComponentPicker + '//*[text()="Square Image"]',
      itemInComponentPicker + '//*[text()="Landscape Image"]',
      itemInComponentPicker + '//*[text()="Square Linkable Image"]',
      itemInComponentPicker + '//*[text()="Landscape Linkable Image"]'].forEach((element) => {
         cy.xpath(element);
      })
      cy.xpath(imageLabelArrow)
         .should('exist');
      cy.xpath(arrowFilter)
         .should('have.length', 3);
      [squareLabel,
         landscapeLabel,
         linkableLabel,
         squareCheckbox + '[not(@disabled)]',
         landscapeCheckbox + '[not(@disabled)]',
         linkableCheckbox + '[not(@disabled)]'].forEach((element) => {
            cy.xpath(element);
         })
      cy.xpath(imageLabel)
         .click();
      cy.xpath(itemInComponentPicker)
         .should('have.length', 24);
      cy.xpath(imageLabelArrow)
         .should('not.exist');
      cy.xpath(arrowFilter)
         .should('have.length', 2);
      [squareCheckbox,
         squareLabel,
         landscapeCheckbox,
         landscapeLabel,
         linkableCheckbox,
         linkableLabel].forEach((element) => {
            cy.xpath(element)
               .should('not.exist');
         })
   })


   it('Component Picker: 6 - checking Filter functionality - Contentful Tout', () => {
      cy.xpath(contentfulCheckbox)
         .click();
      cy.xpath(itemInComponentPicker)
         .should('have.length', 2);
      [itemInComponentPicker + '//*[text()="Giving Back To Community"]',
      itemInComponentPicker + '//*[text()="Want To Learn More?"]'].forEach((element) => {
         cy.xpath(element);
      })
      cy.xpath(toutLabelArrow)
         .should('exist');
      cy.xpath(arrowFilter)
         .should('have.length', 3);
      [withTitleaBodyLabel,
         withCTALabel,
         noCTALabel,
         noTitleLabel,
         noBodyLabel,
         noTitleaBodyLabel,
         withTitleaBodyCheckbox + '[not(@disabled)]',
         withCTACheckbox + '[not(@disabled)]',
         noCTACheckbox + '[@disabled]',
         noTitleCheckbox + '[@disabled]',
         noBodyCheckbox + '[@disabled]',
         noTitleaBodyCheckbox + '[@disabled]',
         toutCheckbox + '[not(@disabled)]',
         horizCheckbox + '[not(@disabled)]',
         vertCheckbox + '[@disabled]',
         naCheckbox + '[@disabled]',
         richTextCheckbox + '[@disabled]',
         imageCheckbox + '[@disabled]',
         accordionCheckbox + '[@disabled]']
         .forEach((element) => {
            cy.xpath(element);
         })
      cy.xpath(addComponentIconXpath)
         .click();
   })


   it('Component Picker: 7 - checking Filter functionality - Tout', () => {
      cy.xpath(addComponentIconXpath)
         .click();
      cy.xpath(toutCheckbox)
         .click();
      cy.xpath(itemInComponentPicker)
         .should('have.length', 16);
      [itemInComponentPicker + '//*[text()="Tout Horizontal With Title and Body With CTA"]',
      itemInComponentPicker + '//*[text()="Tout Horizontal With Title and Body No CTA"]',
      itemInComponentPicker + '//*[text()="Tout Horizontal No Title With CTA"]',
      itemInComponentPicker + '//*[text()="Tout Horizontal No Title No CTA"]',
      itemInComponentPicker + '//*[text()="Tout Horizontal No Body With CTA"]',
      itemInComponentPicker + '//*[text()="Tout Horizontal No Body No CTA"]',
      itemInComponentPicker + '//*[text()="Tout Vertical With Title and Body With CTA"]',
      itemInComponentPicker + '//*[text()="Tout Vertical With Title and Body No CTA"]',
      itemInComponentPicker + '//*[text()="Tout Vertical No Title With CTA"]',
      itemInComponentPicker + '//*[text()="Tout Vertical No Title No CTA"]',
      itemInComponentPicker + '//*[text()="Tout Vertical No Body With CTA"]',
      itemInComponentPicker + '//*[text()="Tout Vertical No Body No CTA"]',
      itemInComponentPicker + '//*[text()="Tout Vertical No Title and Body With CTA"]',
      itemInComponentPicker + '//*[text()="Tout Vertical No Title and Body No CTA"]',
      itemInComponentPicker + '//*[text()="Giving Back To Community"]',
      itemInComponentPicker + '//*[text()="Want To Learn More?"]'].forEach((element) => {
         cy.xpath(element);
      })
      cy.xpath(toutLabelArrow)
         .should('exist');
      cy.xpath(arrowFilter)
         .should('have.length', 3);
      [withTitleaBodyLabel,
         withCTALabel,
         noCTALabel,
         noTitleLabel,
         noBodyLabel,
         noTitleaBodyLabel,
         withTitleaBodyCheckbox + '[not(@disabled)]',
         withCTACheckbox + '[not(@disabled)]',
         noCTACheckbox + '[not(@disabled)]',
         noTitleCheckbox + '[not(@disabled)]',
         noBodyCheckbox + '[not(@disabled)]',
         noTitleaBodyCheckbox + '[not(@disabled)]',
         contentfulCheckbox + '[not(@disabled)]',
         horizCheckbox + '[not(@disabled)]',
         vertCheckbox + '[not(@disabled)]',
         naCheckbox + '[@disabled]'].forEach((element) => {
            cy.xpath(element);
         })
      cy.xpath(noCTACheckbox)
         .click();
      cy.xpath(noTitleCheckbox)
         .click();

      [withTitleaBodyCheckbox + '[@disabled]',
      withCTACheckbox + '[@disabled]',
      noCTACheckbox + '[not(@disabled)]',
      noTitleCheckbox + '[not(@disabled)]',
      noBodyCheckbox + '[@disabled]',
      noTitleaBodyCheckbox + '[@disabled]',
      contentfulCheckbox + '[@disabled]',
      horizCheckbox + '[not(@disabled)]',
      vertCheckbox + '[not(@disabled)]',
      naCheckbox + '[@disabled]',
      itemInComponentPicker + '//*[text()="Tout Horizontal No Title No CTA"]',
      itemInComponentPicker + '//*[text()="Tout Vertical No Title No CTA"]'].forEach((element) => {
         cy.xpath(element);
      })
      cy.xpath(itemInComponentPicker)
         .should('have.length', 2);
      cy.xpath(horizCheckbox)
         .click();
      cy.xpath(itemInComponentPicker)
         .should('have.length', 1);
      cy.xpath(itemInComponentPicker + '//*[text()="Tout Horizontal No Title No CTA"]');
      cy.xpath(allCheckbox)
         .click();
      cy.xpath(itemInComponentPicker)
         .should('have.length', 24);
      cy.xpath(toutLabelArrow)
         .should('not.exist');
      //=========== commented out until #557 is fixed ===========
      // cy.xpath(toutCheckbox)
      //    .should('not.checked');
   })


   it('Component Picker: 8 - checking closing Component Picker form', () => {
      cy.xpath(closeIcon)
         .click();
      cy.xpath(titleInComponentPicker)
         .should('not.exist');
      cy.xpath(addComponentIconXpath)
         .click();
      cy.xpath(orientationExpandArrow)
         .click();
      [horizCheckbox, vertCheckbox, naCheckbox].forEach((element) => {
         cy.xpath(element)
            .should('not.exist');
      })
      cy.xpath(orientationCollapseArrow)
         .click();
      [horizCheckbox, vertCheckbox, naCheckbox].forEach((element) => {
         cy.xpath(element)
            .should('exist');
      })
      cy.xpath(addComponentIconXpath)
         .click();
      cy.xpath(titleInComponentPicker)
         .should('not.exist');
   })
})