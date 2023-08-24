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

  readonly itemContentSelector: string;

  readonly linkWrapperSelector: string;

  readonly cardWrapperSelector: string;

  readonly cardContentWrapperSelector: string;

  readonly cardImageWrapperSelector: string;

  constructor() {
    super('/styleguide/card/');
    this.itemContentSelector = '[data-layer-region="StyleGuideExamples:ItemContent"]';
    this.linkWrapperSelector = '[data-layer-region="Link:Wrapper"]';
    this.cardWrapperSelector = '[data-layer-region="Card:Wrapper"]';
    this.cardContentWrapperSelector = '[data-layer-region="Card:ContentWrapper"]';
    this.cardImageWrapperSelector = '[data-layer-region="Card:ImageWrapper"]';
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
        isHero: true,
      },
      {
        id: 'HeroLinkLeftContentCentered',
        hasButton: true,
        isHero: true,
      },
      {
        id: 'HeroLinkRightContentTop',
        hasButton: true,
        isHero: true,
      },
      {
        id: 'HeroLinkRightContentCentered',
        hasButton: true,
        isHero: true,
      },
      {
        id: 'HeroPrimaryButtonLeftContentTop',
        hasButton: true,
        isHero: true,
      },
      {
        id: 'HeroPrimaryButtonLeftContentCentered',
        hasButton: true,
        isHero: true,
      },
      {
        id: 'HeroPrimaryButtonRightContentTop',
        hasButton: true,
        isHero: true,
      },
      {
        id: 'HeroPrimaryButtonRightContentCentered',
        hasButton: true,
        isHero: true,
      },
      {
        id: 'HeroSecondaryButtonLeftContentTop',
        hasButton: true,
        isHero: true,
      },
      {
        id: 'HeroSecondaryButtonLeftContentCentered',
        hasButton: true,
        isHero: true,
      },
      {
        id: 'HeroSecondaryButtonRightContentTop',
        hasButton: true,
        isHero: true,
      },
      {
        id: 'HeroSecondaryButtonRightContentCentered',
        hasButton: true,
        isHero: true,
      }
    ];
  }

  getElements(): VitalElement[] {
    return this.vitalCards;
  }

  getHeroCards(): VitalElement[] {
    return this.vitalCards.filter((card) => card.isHero);
  }

  getBasicCards(): VitalElement[] {
    return this.vitalCards.filter((card) => !card.isHero);
  }
}

interface VitalCard extends VitalElement {
  hasButton?: boolean,
  isHero?: boolean,
}
