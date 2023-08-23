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
import { Locator, test as baseTest } from '@playwright/test';
import {
  BatchInfo, Configuration, VisualGridRunner, BrowserType, DeviceName, ScreenOrientation, Eyes,
  Target, IosDeviceName, AndroidDeviceName, Region, CheckSettingsAutomation
} from '@applitools/eyes-playwright';
import { VitalTestParameters, vitalTestParameters } from '../config/vital-test-parameters';
import { VitalElement, VitalPage } from '../../pages/vital-page';

const test = baseTest.extend< { eyes: Eyes } >({
  eyes: async ({ page }, use) => {
    const configuration: Configuration = new Configuration();

    const batch: BatchInfo = new BatchInfo({
      id: process.env.APPLITOOLS_BATCH_ID,
      name: process.env.APPLITOOLS_BATCH_NAME??'Bodiless JS Components Visual'
    });
    configuration.setBatch(batch);
    configuration.setApiKey(process.env.APPLITOOLS_API_KEY as string);

    /**
     * Default renderers
     *
     * Please note if the number of default renderers or all renderers changes, the number of
     * workers in playwright.config should be updated accordingly.
     */
    configuration.addBrowser(1920, 1080, BrowserType.CHROME);
    configuration.addDeviceEmulation(AndroidDeviceName.Galaxy_S22, ScreenOrientation.PORTRAIT);

    if (process.env.PW_INCLUDE_ALL_RENDERERS === 'true') {
      // Mobile
      configuration.addMobileDevice(IosDeviceName.iPhone_14, ScreenOrientation.PORTRAIT);

      // Tables
      configuration.addMobileDevice(IosDeviceName.iPad_9, ScreenOrientation.PORTRAIT);
      configuration.addDeviceEmulation(DeviceName.Galaxy_Tab_S7, ScreenOrientation.PORTRAIT);
    }

    const testConcurrency: number = configuration.getBrowsersInfo().length;
    const runner: VisualGridRunner = new VisualGridRunner({ testConcurrency });
    const eyes: Eyes = new Eyes(runner, configuration);

    await use(eyes);
  }
});

test.describe.configure({ mode: 'parallel' });

const runVisualTest = (data: VitalTestParameters[]) => {
  data.forEach((param) => {
    test.describe(param.suite, () => {
      const vitalPage: VitalPage = param.page;
      const elements: VitalElement[] = vitalPage.getElements();

      /* eslint-disable jest/expect-expect, no-restricted-syntax, no-await-in-loop */
      test(`${param.suite}`, async ({ page, eyes }) => {
        await vitalPage.open(page);

        await eyes.open(page, 'Bodiless JS', test.info().title);

        for (const e of elements) {
          const elementConfig: VitalElement = e as unknown as VitalElement;

          const elementId: string = elementConfig.id;

          let element: Locator = page.getByTestId(elementId);
          if (param.switchToItemContent) {
            element = element.locator('[data-layer-component="StyleGuideExamples:ItemContent"]');
          }

          const settings: CheckSettingsAutomation = Target.region(element).strict().fully();
          if (param.ignoreRegion) {
            settings.ignoreRegion(param.ignoreRegion as Region);
          }

          await eyes.check(elementId, settings);
        }

        await eyes.close(true);
      });
      /* eslint-enable jest/expect-expect, no-restricted-syntax, no-await-in-loop */
    });
  });
};

runVisualTest(
  vitalTestParameters.sort((l, r) => r.page.getElements().length - l.page.getElements().length)
);
