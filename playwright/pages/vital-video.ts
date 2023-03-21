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
/* eslint-disable class-methods-use-this */
import { Locator } from '@playwright/test';
import { VitalElement, VitalPage } from './vital-page';

export class VitalVideoPage extends VitalPage {
  readonly vitalVideos: VitalVideo[];

  constructor() {
    super('/styleguide/video/');
    this.vitalVideos = [
      {
        id: 'Basic',
        fullScreenDisabled: true
      },
      {
        id: 'WithFullScreenEnabled',
        fullScreenDisabled: false
      },
      {
        id: 'WithSchema',
        fullScreenDisabled: true
      },
      {
        id: 'WithResponsive16By9Embed',
        fullScreenDisabled: true
      },
      {
        id: 'Default',
        name: 'Default Video',
        fullScreenDisabled: false
      },
      {
        id: 'Hero',
        fullScreenDisabled: false
      }
    ];
  }

  getElements(): VitalElement[] {
    return this.vitalVideos;
  }

  async isFullscreenDisabled(video: Locator): Promise<boolean> {
    const fullscreenControl: Locator = video.frameLocator('iframe')
      .locator('[data-title-no-tooltip="Full screen"]');
    const ariaDisabled = await fullscreenControl.getAttribute('aria-disabled');
    return ariaDisabled != null && ariaDisabled === 'true';
  }

  locatePlay(video: Locator): Locator {
    return video.frameLocator('iframe').locator('[aria-label="Play"]');
  }
}

interface VitalVideo extends VitalElement {
  fullScreenDisabled: boolean
}
