import { PlaywrightTestConfig, defineConfig, devices } from '@playwright/test';

const defaultServerConfig = {
  url: 'http://localhost:8005/',
  ignoreHTTPSErrors: true,
  reuseExistingServer: true,
  timeout: 10 * 60 * 1000,
};

/* eslint-disable no-param-reassign */
const configurators = {
  'smoke-deprecated': (baseConfig: PlaywrightTestConfig) => {
    baseConfig.workers = 1;
    baseConfig.testDir = './playwright/tests/smoke-deprecated';
    baseConfig.webServer = {
      ...defaultServerConfig,
      command: 'cd sites/test-site && npm run dev',
    };
  },
  'smoke-vital': (baseConfig: PlaywrightTestConfig) => {
    // The number of workers is choosen depending on number of renderers in applitools configuration
    // in components-visual.spec.ts file
    baseConfig.workers = process.env.PW_INCLUDE_ALL_RENDERERS === 'true' ? 3 : 5;
    baseConfig.testDir = './playwright/tests/smoke';
    baseConfig.webServer = {
      ...defaultServerConfig,
      command: 'cd sites/vital-demo-next && npm run serve:test',
    };
    baseConfig.globalSetup = require.resolve('./playwright/tests/setup/setup.ts');
  },
  'smoke-starter': (baseConfig: PlaywrightTestConfig) => {
    baseConfig.workers = 1;
    baseConfig.testDir = './playwright/tests/smoke-deprecated';
    baseConfig.webServer = {
      ...defaultServerConfig,
      url: 'http://localhost:8000/',
      command: 'cd generated/sites/starter-site && npm run dev',
    };
    baseConfig.globalSetup = require.resolve('./playwright/tests/setup/setup.ts');
    baseConfig.use = {
      actionTimeout: 0,
      baseURL: 'http://localhost:8000',
      trace: 'on',
      testIdAttribute: 'id'
    };
    baseConfig.testMatch = '*editorMenu.spec.ts';
  },
};
/* eslint-enable no-param-reassign */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './playwright/tests',
  timeout: 90 * 1000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'playwright-report/results.xml' }]
  ],

  use: {
    actionTimeout: 0,
    baseURL: 'http://localhost:8005',
    trace: 'on',
    testIdAttribute: 'id'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1200, height: 850 },
      },
    },
  ],
};

const suite: string = process.env.PLAYWRIGHT_SUITE as string;

if (!suite) {
  throw Error('The PLAYWRIGHT_SUITE environment variable is not set');
}

const configurator = configurators[suite];

if (!configurator) {
  throw Error(`Unknown playwright suite: ${suite}, use one of ${Object.keys(configurators)}`);
}

configurator(config);

export default defineConfig(config);
