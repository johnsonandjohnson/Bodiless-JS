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
import { Page } from '@playwright/test';

export abstract class VitalPage {
  readonly relativeUrl: string;

  readonly mainContentSelector: string;

  readonly linkWrapperSelector: string;

  constructor(relativeUrl: string) {
    this.relativeUrl = relativeUrl;
    this.mainContentSelector = 'main-content';
    this.linkWrapperSelector = '[data-layer-component="Link:Wrapper"]';
  }

  async open(page: Page): Promise<void> {
    await page.goto(this.relativeUrl);
    await page.waitForLoadState();
  }

  abstract getElements(): VitalElement[];
}

export type VitalElement = {
  id: string,
  name?: string
};
