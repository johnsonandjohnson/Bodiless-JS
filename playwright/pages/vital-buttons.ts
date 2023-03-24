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
        id: 'DefaultLink',
        type: VitalButtonType.DEFAULT
      },
      {
        id: 'DefaultExternalLink',
        type: VitalButtonType.EXTERNAL
      },
      {
        id: 'DefaultPDFLink',
        type: VitalButtonType.PDF
      },
      {
        id: 'PrimaryLink',
        type: VitalButtonType.DEFAULT
      },
      {
        id: 'PrimaryExternalLink',
        type: VitalButtonType.EXTERNAL
      },
      {
        id: 'PrimaryPDFLink',
        type: VitalButtonType.PDF
      },
      {
        id: 'Default',
        name: 'Default Button',
        type: VitalButtonType.DEFAULT
      },
      {
        id: 'Primary',
        type: VitalButtonType.DEFAULT
      },
      {
        id: 'PrimaryAsDisabled',
        type: VitalButtonType.DISABLED
      },
      {
        id: 'PrimaryWithArrow',
        type: VitalButtonType.DEFAULT
      },
      {
        id: 'Secondary',
        type: VitalButtonType.DEFAULT
      },
      {
        id: 'SecondaryAsDisabled',
        type: VitalButtonType.DISABLED
      },
      {
        id: 'SecondaryWithArrow',
        type: VitalButtonType.DEFAULT
      },
      {
        id: 'PrimarySelected',
        type: VitalButtonType.DEFAULT
      },
      {
        id: 'PrimarySelectedAsDisabled',
        type: VitalButtonType.DISABLED
      },
      {
        id: 'PrimarySelectedWithArrow',
        type: VitalButtonType.DEFAULT
      },
      {
        id: 'SecondarySelected',
        type: VitalButtonType.DEFAULT
      },
      {
        id: 'SecondarySelectedAsDisabled',
        type: VitalButtonType.DISABLED
      },
      {
        id: 'SecondarySelectedWithArrow',
        type: VitalButtonType.DEFAULT
      }
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
  EXTERNAL,
  PDF,
  DISABLED,
}
