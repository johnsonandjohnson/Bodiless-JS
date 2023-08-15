/**
 * Copyright © 2023 Johnson & Johnson
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
import { expect, Locator, test } from '@playwright/test';
import { readFileSync } from 'fs-extra';
import { VitalAccordionPage } from '../../pages/vital-accordion';

const accordionPage: VitalAccordionPage = new VitalAccordionPage();

test.describe('Vital Accordion', () => {
  test.beforeEach(async ({page}) => { await accordionPage.open(page); });

  const expandedAccordions = accordionPage.vitalAccordions.filter((acrdn) => acrdn.expanded);
  expandedAccordions.forEach((acrdn) => {
    test(`Should be able to collapse ${acrdn.id}`, async ({page}) => {
      await checkAccordion(page.getByTestId(acrdn.id), 'collapse', true, 'expand', false);
    });
  });

  const collapsedAccordions = accordionPage.vitalAccordions.filter((acrdn) => !acrdn.expanded);
  collapsedAccordions.forEach((acrdn) => {
    test(`Should be able to expand ${acrdn.id}`, async ({page}) => {
      await checkAccordion(page.getByTestId(acrdn.id), 'expand', false, 'collapse', true);
    });
  });

  test('Should check schema for FAQ accordions', async ({page}) => {
    const schemaScript: Locator = page.locator('head>script[type="application/ld+json"]');
    const schemaJson: string = await schemaScript.innerText();
    const expectedSchemaJson: string = readFileSync(`${process.cwd()
    }/playwright/tests/data/faq-schema.json`, { encoding: 'utf8'});
    expect(JSON.parse(schemaJson)).toStrictEqual(JSON.parse(expectedSchemaJson));
  });
});

const checkAccordion = async (accordion: Locator, beforeAction: string, beforeVisibility: boolean,
  afterAction: string, afterVisibility: boolean): Promise<void> => {
  let action: string = await accordionPage.getAction(accordion);
  expect(action).toBe(beforeAction);
  expect(await accordionPage.isBodyVisible(accordion)).toBe(beforeVisibility);
  action = await accordionPage.toggle(accordion);
  expect(action).toBe(afterAction);
  expect(await accordionPage.isBodyVisible(accordion)).toBe(afterVisibility);
};
