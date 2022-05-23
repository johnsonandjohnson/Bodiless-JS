/**
 * Copyright © 2022 Johnson & Johnson
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

export enum TemplateNodeKeys {
  TopContent = 'top-content',
  Content = 'main-content',
  BottomContent = 'bottom-content',
  // The following node keys are for key fields on specific templates.
  // Namely PDP but could be used in other templates.
  Title = 'title',
  Eyebrow = 'eyebrow',
  Description = 'description',
  Image = 'image',
}
