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
import { VitalTypographyPage } from '../../pages/vital-typography';

test.describe('Vital Typography', () => {
  test('Should click on Link typography element', async ({ page }) => {
    const typographyPage: VitalTypographyPage = new VitalTypographyPage();
    await typographyPage.open(page);
    const element = page.getByTestId(typographyPage.linkId)
      .locator('a');
    await element.click({ noWaitAfter: false });
    expect(page.url().endsWith('/test/')).toBeTruthy();
  });
});
