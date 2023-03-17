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
import { VitalElement, VitalPage } from './vital-page';

export class VitalCardsPage extends VitalPage {
  readonly vitalCards: VitalCard[];

  constructor() {
    super('/styleguide/card/');
    this.vitalCards = [
      {
        id: 'CardLeftContentTopAll'
      },
      {
        id: 'CardLeftContentTopNoTitle'
      },
      {
        id: 'CardLeftContentTopNoDescription'
      },
      {
        id: 'CardLeftContentTopNoEyebrow'
      },
      {
        id: 'CardLeftContentCenteredAll'
      },
      {
        id: 'CardLeftContentCenteredNoTitle'
      },
      {
        id: 'CardLeftContentCenteredNoDescription'
      },
      {
        id: 'CardLeftContentCenteredNoEyebrow'
      },
      {
        id: 'CardRightContentTopAll'
      },
      {
        id: 'CardRightContentTopNoTitle'
      },
      {
        id: 'CardRightContentTopNoDescription'
      },
      {
        id: 'CardRightContentTopNoEyebrow'
      },
      {
        id: 'CardRightContentCenteredAll'
      },
      {
        id: 'CardRightContentCenteredNoTitle'
      },
      {
        id: 'CardRightContentCenteredNoDescription'
      },
      {
        id: 'CardRightContentCenteredNoEyebrow'
      },
      {
        id: 'CardVerticalAll'
      },
      {
        id: 'CardVerticalNoTitle'
      },
      {
        id: 'CardVerticalNoDescription'
      },
      {
        id: 'CardVerticalNoEyebrow'
      },
      {
        id: 'HeroLinkLeftContentTop',
        hasButton: true,
      },
      {
        id: 'HeroLinkLeftContentCentered',
        hasButton: true,
      },
      {
        id: 'HeroLinkRightContentTop',
        hasButton: true,
      },
      {
        id: 'HeroLinkRightContentCentered',
        hasButton: true,
      },
      {
        id: 'HeroPrimaryButtonLeftContentTop',
        hasButton: true,
      },
      {
        id: 'HeroPrimaryButtonLeftContentCentered',
        hasButton: true,
      },
      {
        id: 'HeroPrimaryButtonRightContentTop',
        hasButton: true,
      },
      {
        id: 'HeroPrimaryButtonRightContentCentered',
        hasButton: true,
      },
      {
        id: 'HeroSecondaryButtonLeftContentTop',
        hasButton: true,
      },
      {
        id: 'HeroSecondaryButtonLeftContentCentered',
        hasButton: true,
      },
      {
        id: 'HeroSecondaryButtonRightContentTop',
        hasButton: true,
      },
      {
        id: 'HeroSecondaryButtonRightContentCentered',
        hasButton: true,
      }
    ];
  }

  getElements(): VitalElement[] {
    return this.vitalCards.map((card) => ({id: card.id}));
  }
}

type VitalCard = {
  id: string,
  hasButton?: boolean
};
