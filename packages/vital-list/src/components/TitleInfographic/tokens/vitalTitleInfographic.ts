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

import { vitalRichText } from '@bodiless/vital-editors';
import { vitalImage } from '@bodiless/vital-image';
import { addProps } from '@bodiless/fclasses';
import { withNodeKey } from '@bodiless/core';
import { asTitleInfographicToken } from '../TitleInfographicClean';

const Default = asTitleInfographicToken({
  Editors: {
    Title: vitalRichText.Default,
    Image: vitalImage.Default,
  },
  Schema: {
    Title: withNodeKey('title'),
    Image: withNodeKey('image'),
  },
  Content: {
    Title: addProps({ placeholder: 'Title' }),
  },
  Layout: {
    Wrapper: 'flex flex-row',
    TitleWrapper: 'flex flex-col justify-center',
    ImageWrapper: 'max-w-24 pr-4 rtl:pl-4 rtl:pr-0 box-content',
  },
});

export default {
  Default,
};
