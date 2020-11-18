/**
 * Copyright © 2020 Johnson & Johnson
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

const toc = {
  About: {
    'GettingStarted.md': '',
    'CorePrinciples.md': '',
  },
  ContentEditorUserGuide: {},
  Design: {},
  Components: {
    'YouTube.md': 'YouTube',
  },
  Tools: {},
  Development: {
    Guides: {
      'SiteBuildBasics.md': '',
      'DesignElementBasics.md': '',
      'CreatingBodilessComponents.md': '',
    },
    'Packages.md': '',
    Architecture: {
      'Data.md': '',
      'Context.md': '',
      'FClasses.md': '',
      'Documentation.md': '',
    },
    Release: {},
    'Contributing.md': '',
  },
};
export default () => ({ bodiless: toc });
