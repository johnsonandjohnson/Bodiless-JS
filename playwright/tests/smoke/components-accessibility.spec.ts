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
import { Page, expect, test } from '@playwright/test';
import { createHtmlReport } from 'axe-html-reporter';

import { AxeBuilder } from '@axe-core/playwright';
import { writeFileSync } from 'fs-extra';
import { accessibilityReportsPath } from '../setup/setup';
import { vitalTestParameters } from '../config/vital-test-parameters';
import {
  VitalGenericTemplatePage, VitalProductPage, VitalLayoutPage, VitalPage, VitalVideoPage
} from '../../pages';

test.describe.configure({ mode: 'parallel' });

test.describe('Accessibility', () => {
  vitalTestParameters.forEach((params) => {
    const ids: string[] = params.page.getElements().map((e) => `#${e.id}`);

    test(`All components on ${params.suite} page should be accessible`, async ({ page }) => {
      await params.page.open(page);

      const results = await analyze(page, (cfg) => {
        ids.forEach((id) => cfg.include(id));

        if (params.disabledRules) {
          cfg.disableRules(params.disabledRules);
        }
      });

      const reportHTML = createHtmlReport({
        results,
        options: {
          projectKey: 'BodilessJS',
          customSummary: `${params.suite} components`,
          doNotCreateReportFile: true,
        },
      });

      writeFileSync(`${accessibilityReportsPath}/${params.suite}.html`, reportHTML);

      const {violations} = results;

      if (violations.length !== 0) {
        const violationsAsString = JSON.stringify(violations, null, 4);
        console.error(`Accessibility violations\n${violationsAsString}`);
        test.info().attach('accessibility-violations', { body: violationsAsString, contentType: 'application/json'});
      }
      /* eslint-disable jest/valid-expect */
      expect(violations.length, 'Number of accessibility violations').toEqual(0);
    });
  });

  // Check known issues from https://github.com/johnsonandjohnson/Bodiless-JS/issues/2130
  test('Should have \'list\' violation on Layout page', async ({ page }) => {
    await new VitalLayoutPage().open(page);
    const results = await analyze(page, (cfg) => cfg.withRules(['list']));
    expect(results.violations.length).toEqual(1);
    expect(results.violations[0].nodes.length).toEqual(1);
  });

  test('Should have \'list\' violation on Product page', async ({ page }) => {
    await new VitalProductPage().open(page);
    const results = await analyze(page, (cfg) => cfg.withRules(['list']));
    expect(results.violations.length).toEqual(1);
    expect(results.violations[0].nodes.length).toEqual(1);
  });

  test('Should have \'list\' violation on Generic Template page', async ({ page }) => {
    await new VitalGenericTemplatePage().open(page);
    const results = await analyze(page, (cfg) => cfg.withRules(['list']));
    expect(results.violations.length).toEqual(1);
    expect(results.violations[0].nodes.length).toEqual(1);
  });

  test('Should have \'aria-allowed-attr\' and \'frame-title\' violation on Video page', async ({ page }) => {
    await new VitalVideoPage().open(page);
    const results = await analyze(page, (cfg) => cfg.withRules(['aria-allowed-attr', 'frame-title']));
    expect(results.violations.length).toEqual(2);
    expect(results.violations[0].nodes.length).toEqual(6);
    expect(results.violations[1].nodes.length).toEqual(6);
  });
});

const analyze = async (page: Page, applyConfig: (cfg: AxeBuilder) => void) => {
  const builder = new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .disableRules(['color-contrast']);

  applyConfig(builder);

  return builder.analyze();
};
