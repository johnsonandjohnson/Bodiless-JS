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

import { asFluidToken } from '@bodiless/vital-elements';
import { on, varyDesigns, flowHoc, } from '@bodiless/fclasses';
import {
  asListToken, ListClean, ListStatic, vitalList, vitalListStatic
} from '../../List';

const BaseVariation = {
  List: on(ListClean)(vitalList.Base),
};

const TitleVariations = {
  Linked: vitalList.WithLinkedTitle,
  RichText: vitalList.WithRichTitle,
  PlainText: vitalList.WithPlainTitle,
};

const DecorationVariations = {
  Bulleted: vitalList.WithBullets,
  Numbered: vitalList.WithNumbers,
  Plain: asListToken({
    Meta: flowHoc.meta.term('Decoration')('Undecorated'),
  }),
};

/**
 * Token which adds image variations to a flow container.
 */
const WithListVariations = asFluidToken({
  Components: {
    ListInfographic: on(ListStatic)(vitalListStatic.Base, vitalListStatic.WithInfographicTitle),
    ...varyDesigns(
      BaseVariation,
      DecorationVariations,
      TitleVariations,
    ),
  }
});

export default { WithListVariations };
