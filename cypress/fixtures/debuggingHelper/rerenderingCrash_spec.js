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

describe('Re-rendering crash', function () {

   before(function () {
      cy.visit(pagePath);
      cy.clickEdit();
   })

   const pagePath = '/touts/';
   const descriptionXpath = '//*[@id="tout-horizontal"]//*[@data-tout-element="body"]//div[@data-slate-editor="true"]';
   var genArr = Array.from({ length: 19000 }, (v, k) => k + 1);


   it('Re-rendering - catching the crash', () => {
      cy.wrap(genArr).each((index) => {
         cy.xpath(descriptionXpath)
            .click()
            .type("test-" + index);
         cy.request('/___backend/content/pages/touts/horizontal$body');
      })
})
})