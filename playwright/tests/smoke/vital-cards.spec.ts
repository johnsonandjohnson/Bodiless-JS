import { expect, test } from '@playwright/test';
import { VitalCardsPage } from '../../pages/vital-cards';

test.describe.configure({ mode: 'parallel' })

test.describe('Vital Cards', () => {
  const cardsPage: VitalCardsPage = new VitalCardsPage()

  cardsPage.vitalCards.filter((card) => card.hasButton).forEach((card) => {
    test(`Should click on button in ${card.id} card`, async ({ page }) => {
      await page.goto(cardsPage.relativeUrl)
      await page.waitForLoadState()
      const element = page.getByTestId(card.id)
                          .locator('[data-layer-region="Link:Wrapper"]')
      await element.click({ noWaitAfter: false })
      expect(page.url().endsWith('#')).toBeTruthy()
    });
  })
});
