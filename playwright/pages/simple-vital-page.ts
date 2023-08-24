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

export class SimpleVitalPage extends VitalPage {
  readonly vitalElements: VitalElement[];

  constructor(relativeUrl: string, elementIds: string[]) {
    super(relativeUrl);
    this.vitalElements = elementIds.map((tElement) => ({id: tElement}));
  }

  getElements(): VitalElement[] {
    return this.vitalElements;
  }
}
