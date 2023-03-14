import { test as baseTest } from '@playwright/test';
import { BatchInfo, Configuration, VisualGridRunner, BrowserType, DeviceName, ScreenOrientation, Eyes, Target, IosDeviceName, AndroidDeviceName } from '@applitools/eyes-playwright';
import { vitalCards } from '../../pages/vital-cards';

const data: VisualParameters[] = [
  {
    suite: 'Cards',
    relativeUrl: '/styleguide/card/',
    elementIds: vitalCards.map((card) => card.id)
  }
]

const test = baseTest.extend< { eyes: Eyes } > ({
  eyes: async ({ page }, use) => {
    const runner: VisualGridRunner = new VisualGridRunner({ testConcurrency: 5 });

    const configuration: Configuration = new Configuration();

    const batch: BatchInfo = new BatchInfo({
      id: process.env.APPLITOOLS_BATCH_ID,
      name: 'Bodiless JS Components Visual'
    })
    configuration.setBatch(batch)
    configuration.setApiKey(process.env.APPLITOOLS_API_KEY as string)

    // Desktop
    configuration.addBrowser(1920, 1080, BrowserType.CHROME);

    // Mobile
    configuration.addMobileDevice(IosDeviceName.iPhone_14, ScreenOrientation.PORTRAIT)
    configuration.addDeviceEmulation(AndroidDeviceName.Galaxy_S22, ScreenOrientation.PORTRAIT)

    // Tables
    configuration.addMobileDevice(IosDeviceName.iPad_9, ScreenOrientation.PORTRAIT)
    configuration.addDeviceEmulation(DeviceName.Galaxy_Tab_S7, ScreenOrientation.PORTRAIT)

    const eyes: Eyes = new Eyes(runner, configuration)

    await eyes.open(page, 'Bodiless JS', test.info().title);

    await use(eyes)

    await eyes.close(true)
  }
})

test.describe.configure({ mode: 'parallel' })

data.forEach((param) => {
  test.describe(param.suite, () => {
    param.elementIds.forEach((elementId) => {
      test(elementId, async ({ page, eyes }) => {
        await page.goto(param.relativeUrl);
        await page.waitForLoadState()
  
        const element = page.getByTestId(elementId)
                            .locator('[data-layer-region="StyleGuideExamples:ItemContent"]')
    
        await eyes.check(elementId, Target.region(element).strict().fully())
      });
    })
  });
})

type VisualParameters = {
  suite: string,
  relativeUrl: string,
  elementIds: string[]
}
