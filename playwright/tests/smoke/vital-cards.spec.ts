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
import { expect, test } from '@playwright/test';
import { VitalCardsPage } from '../../pages/vital-cards';

test.describe.configure({ mode: 'parallel' });

test.describe('Vital Cards', () => {
  const cardsPage: VitalCardsPage = new VitalCardsPage();

  test.beforeEach(async ({page}) => cardsPage.open(page));

  const cardsWithButtons = cardsPage.vitalCards.filter((card) => card.hasButton);
  cardsWithButtons.forEach((card) => {
    test(`Should click on button in ${card.id} card`, async ({ page }) => {
      const element = page.getByTestId(card.id)
        .locator(cardsPage.linkWrapperSelector);
      await element.click({ noWaitAfter: false });
      expect(page.url().endsWith('#')).toBeTruthy();
    });
  });

  const heroShadow: string = 'vital-demo:Card:Hero';
  cardsPage.getHeroCards().forEach((card) => {
    test(`${card.id} shold be shadowed by ${heroShadow}`, async ({ page }) => {
      const shadowedAttribute = await page.getByTestId(card.id)
        .locator(cardsPage.itemContentSelector)
        .locator('div:not([id])', {
          has: page.locator(`${cardsPage.cardContentWrapperSelector},${cardsPage.cardImageWrapperSelector}`)
        })
        .getAttribute('data-shadowed-by');

      expect(shadowedAttribute).toBe(heroShadow);
    });
  });

  const basicShadow: string = 'vital-demo:Card:Basic';
  cardsPage.getBasicCards().forEach((card) => {
    test(`${card.id} card should be shadowed by ${basicShadow}`, async ({ page }) => {
      const shadowedAttribute = await page.getByTestId(card.id)
        .locator(cardsPage.itemContentSelector)
        .locator(cardsPage.cardWrapperSelector)
        .getAttribute('data-shadowed-by');

      expect(shadowedAttribute).toBe(basicShadow);
    });
  });
});
