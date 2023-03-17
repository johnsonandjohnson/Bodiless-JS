import { expect, test } from '@playwright/test';
import { VitalTypographyPage } from '../../pages/vital-typography';

test.describe('Vital Typography', () => {
  const typographyPage: VitalTypographyPage = new VitalTypographyPage();

  typographyPage.typographyElements.filter((tElement) => tElement.isClickable)
    .forEach((tElement) => {
      test(`Should click on ${tElement.id} typography element`, async ({ page }) => {
        await page.goto(typographyPage.relativeUrl);
        await page.waitForLoadState();
        const element = page.getByTestId(tElement.id)
          .locator('a');
        await element.click({ noWaitAfter: false });
        expect(page.url().endsWith('/test/')).toBeTruthy();
      });
    });
});
