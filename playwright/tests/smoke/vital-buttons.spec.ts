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
import { VitalButtonsPage, VitalButtonType } from '../../pages/vital-button';

test.describe.configure({ mode: 'parallel' });

test.describe('Vital Buttons', () => {
  const buttonsPage: VitalButtonsPage = new VitalButtonsPage();

  test.beforeEach(async ({ page }) => { await buttonsPage.open(page); });

  buttonsPage.vitalButtons.forEach((btn) => {
    switch (btn.type) {
      case VitalButtonType.DISABLED: {
        test(`Should try to click on ${btn.id} disable button`, async ({ page, baseURL }) => {
          await buttonsPage.locateTarget(page.getByTestId(btn.id)).click({ force: true });

          expect(page.url()).toBe(baseURL + buttonsPage.relativeUrl);
        });
        break;
      }
      case VitalButtonType.EXTERNAL: {
        test(`Should click on ${btn.id} external button`, async ({ page, context }) => {
          const [externalPage] = await Promise.all([
            context.waitForEvent('page'),
            buttonsPage.locateTarget(page.getByTestId(btn.id)).click(),
          ]);

          await externalPage.waitForLoadState();

          expect(externalPage.url()).toBe('https://www.example.com/');
        });
        break;
      }
      case VitalButtonType.DEFAULT: {
        test(`Should click on ${btn.id} default button`, async ({ page, baseURL }) => {
          await buttonsPage.locateTarget(page.getByTestId(btn.id)).click();

          expect(page.url()).toBe(`${baseURL}${buttonsPage.relativeUrl}#`);
        });
        break;
      }
      case VitalButtonType.PDF: {
        test(`Should click on ${btn.id} PDF button`, async ({ page }) => {
          const [download] = await Promise.all([
            page.waitForEvent('download'),
            buttonsPage.locateTarget(page.getByTestId(btn.id)).click()
          ]);

          expect(download.suggestedFilename()).toBe('test.pdf');
        });
        break;
      }
      default:
        exhaustiveCheck(btn.type);
    }
  });
});

function exhaustiveCheck(param: never) {
  console.log(`Unhandled button type: ${param}`);
}
