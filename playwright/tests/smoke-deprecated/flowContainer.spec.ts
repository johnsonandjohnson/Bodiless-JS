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
import { expect, Page, test } from '@playwright/test';
import { FlowContainerPage } from '../../pages/flow-container-page';

test.describe('Flow container', async () => {
  let page: Page;
  let flowContainerPage: FlowContainerPage;
  // tslint:disable-next-line:ter-arrow-parens
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    page = await context.newPage();
    flowContainerPage = new FlowContainerPage(page);
    await page.goto('/flow-container/');
  });

  test('Flow container: 1 - checking presence of all Flow Container sections', async () => {
    await flowContainerPage.toggleEditMode();
    expect(await page.locator(flowContainerPage.flowContainer1Item).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainer25Width).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainer33Width).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainer50And100).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainer50Width).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainer66Width).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainer75Width).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainer100Only).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainerContentful).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainerLibrary).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainerLimitedFlow).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainerNestedFlow).isVisible()).toBeTruthy();
    expect(await page.locator(flowContainerPage.flowContainerDefault).isVisible()).toBeTruthy();
  });

  test('Flow container: 2 - checking adding and filling in a Square Image in the Default Flow Container', async () => {
    await page.click(flowContainerPage.flowContainerDefault);
    await page.click(flowContainerPage.addFlowContainerButton);
    await page.click(flowContainerPage.imagesCheckbox);
    await page.click(flowContainerPage.squareImageButton);
    await page.click(flowContainerPage.squareImageButtonInsideContainer);
    await page.click(flowContainerPage.selectImageButton);
    await page.setInputFiles('input[type=file]', flowContainerPage.pathToImages + flowContainerPage.imageTwoName);
    await page.fill(flowContainerPage.imageAlt, flowContainerPage.altText);
    await Promise.all([
      page.waitForResponse((response) => response.url()
        .includes('flowContainer') && response.status() === 200),
      page.click(flowContainerPage.submitButton),
    ]);
    const defaultContainer = page.locator(flowContainerPage.flowContainerDefault);
    const img = defaultContainer.locator('img');
    expect.soft(await img.getAttribute('alt')).toEqual(flowContainerPage.altText);
    expect.soft(await img.getAttribute('src')).toMatch(flowContainerPage.imagePathRegex);
    await img.click();
    expect.soft(await page.locator(flowContainerPage.swapComponentButton).isVisible()).toBeTruthy();
    expect.soft(await page.locator(flowContainerPage.deleteComponentButton).isVisible()).toBeTruthy();
    expect.soft(await page.locator(flowContainerPage.addComponentButton).isVisible()).toBeTruthy();
  });

  test('Flow container: 3 - checking adding and filling in an Accordion in the Restricted to 1 item Flow Container', async () => {
    const restrictedTo1Container = page.locator(flowContainerPage.flowContainer1Item);
    await restrictedTo1Container.click();
    await page.click(flowContainerPage.addFlowContainerButton);
    await page.click(flowContainerPage.imagesCheckbox);
    await page.click(flowContainerPage.accordionCheckbox);
    await page.click(flowContainerPage.accordionInPicker);
    await page.click(flowContainerPage.accordionTitle);
    await flowContainerPage
      .typeText(flowContainerPage.accordionTitle, flowContainerPage.accordionText, 'restricted');
    expect.soft(await page.locator(flowContainerPage.accordionTitle)
      .innerText()).toEqual(flowContainerPage.accordionText);
    await page.click(flowContainerPage.accordionPlusButton);
    expect.soft(await page.locator(flowContainerPage.accordionBody).isVisible()).toBeTruthy();
    // text is not typed without this timeout, race condition
    await page.waitForTimeout(300);
    await flowContainerPage
      .typeText(flowContainerPage.accordionBody, flowContainerPage.accordionBodyText, '$body');
    expect.soft(await page.locator(flowContainerPage.accordionBody).innerText()).toEqual(flowContainerPage.accordionBodyText);
    await page.click(flowContainerPage.accordionMinusButton);
    expect.soft(await page.locator(flowContainerPage.accordionBody).isVisible()).toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.swapComponentButton).isVisible()).toBeTruthy();
  });

  test('Flow container: 4 - checking adding and filling in a Contentful Tout in Default Width of 33%', async () => {
    await page.click(flowContainerPage.flowContainer33Width);
    await page.click(flowContainerPage.addFlowContainerButton);
    await page.click(flowContainerPage.accordionCheckbox);
    await page.click(flowContainerPage.contentfulCheckbox);
    await Promise.all([
      page.waitForResponse((response) => response.url()
        .includes('width_33') && response.status() === 200),
      await page.click(flowContainerPage.accordionInPicker),
    ]);
    const containerWidth = await page.locator(flowContainerPage.flowContainer33Width).boundingBox();
    const contentfulWidth = await page.locator(flowContainerPage.elementInside33Width).boundingBox();
    const ratio = Math.floor((contentfulWidth.width + 40) / containerWidth.width * 100);
    expect.soft(ratio).toBeCloseTo(32);
  });

  test('Flow container: 5 - checking the added components in Preview Mode', async () => {
    await flowContainerPage.togglePreviewMode();
    expect.soft(await page.locator(flowContainerPage.swapComponentButton).isVisible()).toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.addComponentButton).isVisible()).toBeFalsy();
    expect.soft(await page.locator(flowContainerPage.deleteComponentButton).isVisible()).toBeFalsy();
    const defaultContainer = page.locator(flowContainerPage.flowContainerDefault);
    const img = defaultContainer.locator('img');
    expect.soft(await img.getAttribute('alt')).toEqual(flowContainerPage.altText);
    expect.soft(await img.getAttribute('src')).toContain(flowContainerPage.imageTwoName);
    expect.soft(await page.locator(flowContainerPage.accordionPlusButton).isVisible()).toBeTruthy();
    expect.soft(await page.locator(flowContainerPage.accordionTitlePreview)
      .isVisible()).toBeTruthy();
    expect.soft(await page.locator(flowContainerPage.accordionBodyPreview).isVisible()).toBeFalsy();
    await page.click(flowContainerPage.accordionPlusButton);
    expect.soft(await page.locator(flowContainerPage.accordionBodyPreview).isVisible()).toBeTruthy();
    expect.soft(await page.locator(flowContainerPage.elementInside33Width).isVisible()).toBeTruthy();
  });

  test('Flow container: 6 -checking swapping a component (Square Image to Landscape Linkable Image)', async () => {
    await flowContainerPage.toggleEditMode();
    await page.locator(flowContainerPage.squareImageButtonInsideContainer).click();
    await page.click(flowContainerPage.swapComponentButton);
    await page.click(flowContainerPage.contentfulCheckbox);
    await page.click(flowContainerPage.landscapeLinkableImage);
    const defaultContainer = page.locator(flowContainerPage.flowContainerDefault);
    const img = defaultContainer.locator('img');
    expect.soft(await img.getAttribute('alt')).toEqual(flowContainerPage.altText);
    expect.soft(await img.getAttribute('src')).toContain(flowContainerPage.imageTwoName);
    await page.locator(flowContainerPage.flowContainerImage).click();
    await page.click(flowContainerPage.editImageButton);
    await flowContainerPage.typeText(flowContainerPage.imageLinkField, flowContainerPage.imageLinkText, 'flowContainer', 'button[aria-label="Submit"]');
    expect.soft(await page.locator(flowContainerPage.imageLink).getAttribute('href')).toEqual(`/${flowContainerPage.imageLinkText}/`);
  });

  // tslint:disable-next-line:ter-arrow-parens
  test('Flow container: 7 - checking the swapped and deleted components in Preview Mode', async ({ baseURL }) => {
    await flowContainerPage.togglePreviewMode();
    await page.locator(flowContainerPage.flowContainerImage).click();
    expect.soft(page.url()).toEqual(`${baseURL}/new_link/`);
  });
});
