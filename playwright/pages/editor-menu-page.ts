/**
 * Copyright © 2021 Johnson & Johnson
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
// editor-menu-page.ts
import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class EditorMenuPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async checkMenu(position: 'left' | 'right') {
    let value;
    if (position === 'left') {
      const element = await this.page.locator(this.menuBarLeft);
      value = await element.evaluate((el) => window.getComputedStyle(el).left);
    }
    if (position === 'right') {
      const element = await this.page.locator(this.menuBarRight);
      value = await element.evaluate((el) => window.getComputedStyle(el).right);
    }
    return value;
  }
}
