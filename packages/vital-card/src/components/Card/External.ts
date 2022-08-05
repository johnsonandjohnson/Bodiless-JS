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

import {
  addProps, flowHoc, withDesign
} from '@bodiless/fclasses';
import { asBodilessImage, ImageData } from '@bodiless/components';

export type CardPropsData = {
  Title?: string,
  Eyebrow?: string,
  Description?: string,
  CTALink?: string,
  CTAText?: string,
  Image?: ImageData,
};

const asExternalBaseCard = (content: CardPropsData) => flowHoc(
  withDesign({
    Image: asBodilessImage('card-image', content.Image),
    Title: addProps({ children: content.Title }),
    Eyebrow: addProps({ children: content.Eyebrow }),
    Description: addProps({ children: content.Description }),
    Wrapper: addProps({ href: content.CTALink }),
  }),
);

const asExternalHeroCard = (content: CardPropsData) => flowHoc(
  withDesign({
    Image: asBodilessImage('card-image', content.Image),
    Title: addProps({ children: content.Title }),
    Eyebrow: addProps({ children: content.Eyebrow }),
    Description: addProps({ children: content.Description }),
    CTALink: addProps({ href: content.CTALink }),
    CTAText: addProps({ children: content.CTAText }),
  }),
);

export {
  asExternalBaseCard,
  asExternalHeroCard,
};
