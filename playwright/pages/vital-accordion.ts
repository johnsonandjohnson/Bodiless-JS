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

export class VitalAccordionPage extends VitalPage {
  readonly vitalAccordions: VitalAccordion[];

  constructor() {
    super('/styleguide/accordion/');
    this.vitalAccordions = [
      {
        id: 'Default',
        name: 'Default Accordion'
      },
      {
        id: 'DefaultExpanded',
        expanded: true
      },
      {
        id: 'FAQ'
      },
      {
        id: 'FAQExpanded',
        expanded: true
      }
    ];
  }

  getElements(): VitalElement[] {
    return this.vitalAccordions;
  }

  async toggle(accordion: Locator): Promise<string> {
    await accordion.locator('[data-layer-component="AccordionTitle:Wrapper"]').click({
      delay: 500
    });
    return this.getAction(accordion);
  }

  async getAction(accordion: Locator): Promise<string> {
    const icon: Locator = accordion.locator('[data-layer-component="AccordionTitle:Icon"]');
    return await icon.getAttribute('data-accordion-icon') as string;
  }

  async isBodyVisible(accordion: Locator): Promise<boolean> {
    return accordion.locator('[data-layer-component="Accordion:Body"]').isVisible();
  }
}

interface VitalAccordion extends VitalElement {
  expanded?: boolean
}
