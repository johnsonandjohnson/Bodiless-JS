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

// Type of the data used by this component.
import { HTMLProps } from 'react';
import { AsBodiless, UseBodilessOverrides } from '@bodiless/core';
import { HrefNormalizer } from './NormalHref';
import { FileUploadPickerUI } from '../FileUpload';

export type LinkData = {
  href: string;
};

export type UI = {
  fileUpload?: FileUploadPickerUI,
};

export type Props = HTMLProps<HTMLAnchorElement> & {
  unwrap?: () => void,
  ui?: UI,
};

export type ExtraLinkOptions = {
  normalizeHref: HrefNormalizer,
  target?: string,
  instructions?: string,
};

export type FileUploadOptions = {
  fileUpload?: {
    accept?: string | string[]
  },
};

// eslint-disable-next-line max-len
export type UseLinkOverrides = UseBodilessOverrides<Props, LinkData, ExtraLinkOptions & FileUploadOptions>;

export type AsBodilessLink = AsBodiless<Props, LinkData, ExtraLinkOptions & FileUploadOptions>;
