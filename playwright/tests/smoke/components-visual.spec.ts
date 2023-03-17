import { Locator, Page, test as baseTest } from '@playwright/test';
import {
  BatchInfo, Configuration, VisualGridRunner, BrowserType, DeviceName, ScreenOrientation, Eyes,
  Target, IosDeviceName, AndroidDeviceName
} from '@applitools/eyes-playwright';
import { VitalPage } from '../../pages/vital-page';
import { VitalCardsPage } from '../../pages/vital-cards';
import { VitalTypographyPage } from '../../pages/vital-typography';
import { VitalLayoutPage } from '../../pages/vital-layout';
import { VitalProductPage } from '../../pages/vital-product';
import { VitalGenericTemplatePage } from '../../pages/vital-generic-template';

const variations: VisualParameters[] = [
  {
    suite: 'Cards',
    page: new VitalCardsPage()
  },
  {
    suite: 'Typography',
    page: new VitalTypographyPage()
  }
];

const compositions: VisualParameters[] = [
  {
    suite: 'Layout',
    page: new VitalLayoutPage()
  },
  {
    suite: 'Product',
    page: new VitalProductPage()
  },
  {
    suite: 'Generic Template',
    page: new VitalGenericTemplatePage()
  }
];

const test = baseTest.extend< { eyes: Eyes } >({
  eyes: async ({ page }, use) => {
    const runner: VisualGridRunner = new VisualGridRunner({ testConcurrency: 5 });

    const configuration: Configuration = new Configuration();

    const batch: BatchInfo = new BatchInfo({
      id: process.env.APPLITOOLS_BATCH_ID,
      name: 'Bodiless JS Components Visual'
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

    const eyes: Eyes = new Eyes(runner, configuration);

    await eyes.open(page, 'Bodiless JS', test.info().title);

    await use(eyes);

    await eyes.close(true);
  }
});

test.describe.configure({ mode: 'parallel' });

const runVisualTest = (data: VisualParameters[],
  elementFinder: (page: Page, elementId: string) => Locator) => {
  data.forEach((param) => {
    test.describe(param.suite, () => {
      const vitalPage: VitalPage = param.page;
      vitalPage.getElements().forEach((element) => {
        const elementId: string = element.id;

        /* eslint-disable jest/expect-expect */
        test(element.name??elementId, async ({ page, eyes }) => {
          await page.goto(vitalPage.relativeUrl);
          await page.waitForLoadState();

          const element = elementFinder(page, elementId);

          await eyes.check(elementId, Target.region(element).strict().fully());
        });
        /* eslint-enable jest/expect-expect */
      });
    });
  });
};

runVisualTest(variations, (page: Page, elementId: string) => page.getByTestId(elementId)
  .locator('[data-layer-region="StyleGuideExamples:ItemContent"]'));

runVisualTest(compositions, (page: Page, elementId: string) => page.getByTestId(elementId));

type VisualParameters = {
  suite: string,
  page: VitalPage
};
