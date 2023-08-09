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
import { Locator } from '@playwright/test';
import { VitalElement, VitalPage } from './vital-page';

export class VitalButtonsPage extends VitalPage {
  readonly vitalButtons: VitalButton[];

  constructor() {
    super('/styleguide/buttons/');
    this.vitalButtons = [
      {
        id: 'Primary',
        type: VitalButtonType.DEFAULT
      },
      {
        id: 'Secondary',
        type: VitalButtonType.DEFAULT
      },
      {
        id: 'Tertiary',
        type: VitalButtonType.DEFAULT
      },
      {
        id: 'PrimaryDisabled',
        type: VitalButtonType.DISABLED
      },
      {
        id: 'SecondaryDisabled',
        type: VitalButtonType.DISABLED
      },
      {
        id: 'TertiaryDisabled',
        type: VitalButtonType.DISABLED
      },
    ];
  }

  getElements(): VitalElement[] {
    return this.vitalButtons;
  }

  locateTarget(container: Locator): Locator {
    return container.locator(this.linkWrapperSelector);
  }
}

export interface VitalButton extends VitalElement {
  type: VitalButtonType
}

export enum VitalButtonType {
  DEFAULT,
  DISABLED,
}
