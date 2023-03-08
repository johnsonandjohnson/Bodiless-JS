import { expect, test } from '@playwright/test';
import { vitalCards } from '../../pages/vital-cards';

test.describe.configure({ mode: 'parallel' })

test.describe('Vital Cards', () => {
  vitalCards.filter((card) => card.hasButton).forEach((card) => {
    test(`Should click on button in ${card.id} card`, async ({ page }) => {
      await page.goto('/styleguide/card')
      await page.waitForLoadState()
      const element = page.getByTestId(card.id)
                          .locator('[data-layer-region="Link:Wrapper"]')
      await element.click({ noWaitAfter: false })
      expect(page.url().endsWith('#')).toBeTruthy()
    });
  })
});
