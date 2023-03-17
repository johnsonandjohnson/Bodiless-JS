/**
 * Copyright © 2021 Johnson & Johnson
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
// componentPicker.spec.ts
/* eslint-disable max-len */
import { expect, Page, test } from '@playwright/test';
import { FlowContainerPage } from '../../pages/flow-container-page';

const NUMBER_OF_COMPONENTS = 26;

async function checkAllComponentCheckboxes(page: Page, flowContainerPage: FlowContainerPage) {
  expect(await page.locator(flowContainerPage.component.richText).getAttribute('disabled')).toBeFalsy();
  expect(await page.locator(flowContainerPage.component.table).getAttribute('disabled')).toBeFalsy();
  expect(await page.locator(flowContainerPage.component.image).getAttribute('disabled')).toBeFalsy();
  expect(await page.locator(flowContainerPage.component.card).getAttribute('disabled')).toBeFalsy();
  expect(await page.locator(flowContainerPage.component.contentful).getAttribute('disabled')).toBeFalsy();
  expect(await page.locator(flowContainerPage.component.accordion).getAttribute('disabled')).toBeFalsy();
  expect(await page.locator(flowContainerPage.component.list).getAttribute('disabled')).toBeFalsy();
  expect(await page.locator(flowContainerPage.component.iframe).getAttribute('disabled')).toBeFalsy();
  expect(await page.locator(flowContainerPage.component.socialShare).getAttribute('disabled')).toBeFalsy();
  expect(await page.locator(flowContainerPage.component.youTube).getAttribute('disabled')).toBeFalsy();
  expect(await page.locator(flowContainerPage.component.carousel).getAttribute('disabled')).toBeFalsy();
  expect(await page.locator(flowContainerPage.component.curator).getAttribute('disabled')).toBeFalsy();
  expect(await page.locator(flowContainerPage.component.flowContainer).getAttribute('disabled')).toBeFalsy();
}

test.describe('Component picker', async () => {
  let page: Page;
  let flowContainerPage: FlowContainerPage;
  // tslint:disable-next-line:ter-arrow-parens
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    flowContainerPage = new FlowContainerPage(page);
    await page.goto('/flow-container/');
  });

  test('Component picker: 1 - checking presence of all components by amount', async () => {
    await flowContainerPage.toggleEditMode();
    await page.click(flowContainerPage.flowContainerDefault);
    await page.click(flowContainerPage.addFlowContainerButton);
    expect.soft(await page.locator(flowContainerPage.componentWrapper)
      .count())
      .toEqual(NUMBER_OF_COMPONENTS);
  });

  test('Component picker: 2 - checking presence of the Filter and Search elements', async () => {
    await checkAllComponentCheckboxes(page, flowContainerPage);
    expect.soft(await page.locator(flowContainerPage.typeSection)
      .innerText())
      .toEqual('Type');
    expect.soft(await page.locator(flowContainerPage.orientationSection)
      .innerText())
      .toEqual('Orientation');
    expect.soft(await page.locator(flowContainerPage.searchField)
      .isVisible())
      .toBeTruthy();
  });

  test('Component picker: 3 - checking Search functionality', async () => {
    await flowContainerPage.typeText(flowContainerPage.searchField, 'Rich text');
    expect.soft(await page.locator(flowContainerPage.componentWrapper)
      .count())
      .toEqual(3);
    expect.soft(await page.locator(flowContainerPage.simpleRichText)
      .isVisible())
      .toBeTruthy();
    expect.soft(await page.locator(flowContainerPage.basicRichText)
      .isVisible())
      .toBeTruthy();
    expect.soft(await page.locator(flowContainerPage.fullRichText)
      .isVisible())
      .toBeTruthy();

    expect.soft(await page.locator(flowContainerPage.component.richText)
      .getAttribute('disabled'))
      .toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.component.table)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.image)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.card)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.contentful)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.accordion)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.list)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.iframe)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.socialShare)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.youTube)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.carousel)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.curator)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.flowContainer)
      .getAttribute('disabled'))
      .toEqual('');

    expect.soft(await page.locator(flowContainerPage.orientation.NA)
      .getAttribute('disabled'))
      .toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.orientation.horizontal)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.orientation.vertical)
      .getAttribute('disabled'))
      .toEqual('');

    await page.locator(flowContainerPage.searchField)
      .fill('');
    expect.soft(await page.locator(flowContainerPage.componentWrapper)
      .count())
      .toEqual(NUMBER_OF_COMPONENTS);
  });

  test('Component picker: 4 - checking Filter functionality - Accordion', async () => {
    await page.locator(flowContainerPage.component.accordion)
      .click();
    expect.soft(await page.locator(flowContainerPage.componentWrapper)
      .count())
      .toEqual(1);
    expect.soft(await page.locator(flowContainerPage.component.accordion)
      .getAttribute('disabled'))
      .toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.orientation.NA)
      .getAttribute('disabled'))
      .toBeFalsy();

    expect.soft(await page.locator(flowContainerPage.component.richText)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.table)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.image)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.card)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.contentful)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.list)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.iframe)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.socialShare)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.youTube)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.carousel)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.curator)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.flowContainer)
      .getAttribute('disabled'))
      .toEqual('');

    expect.soft(await page.locator(flowContainerPage.orientation.NA)
      .getAttribute('disabled'))
      .toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.orientation.horizontal)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.orientation.vertical)
      .getAttribute('disabled'))
      .toEqual('');

    await page.locator(flowContainerPage.component.accordion)
      .click();
    expect.soft(await page.locator(flowContainerPage.componentWrapper)
      .count())
      .toEqual(NUMBER_OF_COMPONENTS);
  });

  test('Component picker: 5 - checking Filter functionality - Image', async () => {
    await page.locator(flowContainerPage.component.image)
      .click();
    expect.soft(await page.locator(flowContainerPage.componentWrapper)
      .count())
      .toEqual(4);
    expect.soft(await page.locator(flowContainerPage.component.accordion)
      .getAttribute('disabled'))
      .toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.orientation.NA)
      .getAttribute('disabled'))
      .toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.landscapeLinkableImage)
      .isVisible())
      .toBeTruthy();
    expect.soft(await page.locator(flowContainerPage.squareLinkableImage)
      .isVisible())
      .toBeTruthy();
    // Check below does not work
    // expect.soft(await page.locator(flowContainerPage.squareImage).isVisible()).toBeTruthy();
    // expect.soft(await page.locator(flowContainerPage.landscapeImage).isVisible()).toBeTruthy();

    await page.locator(flowContainerPage.component.image)
      .click();
    expect.soft(await page.locator(flowContainerPage.componentWrapper)
      .count())
      .toEqual(NUMBER_OF_COMPONENTS);
  });

  test('Component picker: 6 - checking Filter functionality - Contentful', async () => {
    await page.locator(flowContainerPage.component.contentful)
      .click();
    expect.soft(await page.locator(flowContainerPage.componentWrapper)
      .count())
      .toEqual(2);
    expect.soft(await page.locator(flowContainerPage.component.card).getAttribute('disabled')).toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.component.richText).getAttribute('disabled')).toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.table).getAttribute('disabled')).toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.image).getAttribute('disabled')).toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.accordion).getAttribute('disabled')).toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.contentful).getAttribute('disabled')).toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.component.list).getAttribute('disabled')).toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.iframe).getAttribute('disabled')).toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.socialShare).getAttribute('disabled')).toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.youTube).getAttribute('disabled')).toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.carousel).getAttribute('disabled')).toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.curator).getAttribute('disabled')).toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.flowContainer).getAttribute('disabled')).toEqual('');

    expect.soft(await page.locator(flowContainerPage.orientation.NA).getAttribute('disabled')).toEqual('');
    expect.soft(await page.locator(flowContainerPage.orientation.horizontal).getAttribute('disabled')).toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.orientation.vertical).getAttribute('disabled')).toEqual('');

    await page.click(flowContainerPage.closeFormButton);
    expect.soft(await page.locator(flowContainerPage.addComponentForm).isVisible()).toBeFalsy();
  });

  test('Component picker: 7 - checking Filter functionality - Tout', async () => {
    await page.click(flowContainerPage.flowContainerDefault);
    await page.click(flowContainerPage.addFlowContainerButton);
    await page.locator(flowContainerPage.component.contentful)
      .click();
    await page.click(flowContainerPage.component.card);
    expect.soft(await page.locator(flowContainerPage.componentWrapper)
      .count())
      .toEqual(16);

    expect.soft(await page.locator(flowContainerPage.component.richText)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.table)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.image)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.card)
      .getAttribute('disabled'))
      .toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.component.contentful)
      .getAttribute('disabled'))
      .toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.component.accordion)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.list)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.iframe)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.socialShare)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.youTube)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.carousel)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.curator)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.component.flowContainer)
      .getAttribute('disabled'))
      .toEqual('');

    expect.soft(await page.locator(flowContainerPage.orientation.NA)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.orientation.horizontal)
      .getAttribute('disabled'))
      .toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.orientation.vertical)
      .getAttribute('disabled'))
      .toBeFalsy();

    await page.locator(flowContainerPage.structure.noTitle)
      .click();
    await page.locator(flowContainerPage.structure.noCTA)
      .click();
    expect.soft(await page.locator(flowContainerPage.structure.noBody)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.structure.withCTA)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.structure.noTitleAndBody)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.structure.withTitleAndBody)
      .getAttribute('disabled'))
      .toEqual('');
    expect.soft(await page.locator(flowContainerPage.componentWrapper)
      .count())
      .toEqual(2);
    await page.locator(flowContainerPage.orientation.horizontal)
      .click();
    expect.soft(await page.locator(flowContainerPage.componentWrapper)
      .count())
      .toEqual(1);
    await page.click(flowContainerPage.clearLink);
    expect.soft(await page.locator(flowContainerPage.componentWrapper)
      .count())
      .toEqual(NUMBER_OF_COMPONENTS);
    expect.soft(await page.locator(flowContainerPage.cardStructure)
      .isVisible())
      .toBeFalsy();
  });

  test('Component picker: 8 - checking closing Component Picker form', async () => {
    await page.click(flowContainerPage.closeFormButton);
    expect.soft(await page.locator(flowContainerPage.addComponentForm).isVisible()).toBeFalsy();

    await page.click(flowContainerPage.flowContainerDefault);
    await page.click(flowContainerPage.addFlowContainerButton);
    await page.click(flowContainerPage.addFlowContainerButton);
    expect.soft(await page.locator(flowContainerPage.addComponentForm).isVisible()).toBeFalsy();
  });
});
