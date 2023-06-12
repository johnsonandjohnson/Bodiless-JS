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
import { VisualParameters, visualParameters } from '../config/visual-parameters';
import { VitalPage } from '../../pages/vital-page';

const test = baseTest.extend< { eyes: Eyes } >({
  eyes: async ({ page }, use) => {
    const configuration: Configuration = new Configuration();

    const batch: BatchInfo = new BatchInfo({
      id: process.env.APPLITOOLS_BATCH_ID,
      name: process.env.APPLITOOLS_BATCH_NAME??'Bodiless JS Components Visual'
    });
    configuration.setBatch(batch);
    configuration.setApiKey(process.env.APPLITOOLS_API_KEY as string);

    // Desktop
    configuration.addBrowser(1920, 1080, BrowserType.CHROME);

    // Mobile
    configuration.addMobileDevice(IosDeviceName.iPhone_14, ScreenOrientation.PORTRAIT);
    configuration.addDeviceEmulation(AndroidDeviceName.Galaxy_S22, ScreenOrientation.PORTRAIT);

    // Tables
    configuration.addMobileDevice(IosDeviceName.iPad_9, ScreenOrientation.PORTRAIT);
    configuration.addDeviceEmulation(DeviceName.Galaxy_Tab_S7, ScreenOrientation.PORTRAIT);

    const testConcurrency: number = configuration.getBrowsersInfo().length;
    const runner: VisualGridRunner = new VisualGridRunner({ testConcurrency });
    const eyes: Eyes = new Eyes(runner, configuration);

    await eyes.open(page, 'Bodiless JS', test.info().title);

    await use(eyes);

    await eyes.close(true);
  }
});

test.describe.configure({ mode: 'parallel' });

const runVisualTest = (data: VisualParameters[]) => {
  data.forEach((param) => {
    test.describe(param.suite, () => {
      const vitalPage: VitalPage = param.page;
      vitalPage.getElements().forEach((element) => {
        const elementId: string = element.id;

        /* eslint-disable jest/expect-expect */
        test(`${param.suite} - ${element.name??elementId}`, async ({ page, eyes }) => {
          await vitalPage.open(page);

          let element: Locator = page.getByTestId(elementId);
          if (param.switchToItemContent) {
            element = element.locator('[data-layer-region="StyleGuideExamples:ItemContent"]');
          }

          const settings: CheckSettingsAutomation = Target.region(element).strict().fully();
          if (param.ignoreRegion) {
            settings.ignoreRegion(param.ignoreRegion as Region);
          }

          await eyes.check(elementId, settings);
        });
        /* eslint-enable jest/expect-expect */
      });
    });
  });
};

runVisualTest(visualParameters);
