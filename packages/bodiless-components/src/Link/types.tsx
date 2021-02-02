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

export type LinkData = {
  href: string;
};

export type Props = HTMLProps<HTMLAnchorElement> & {
  unwrap?: () => void,
};

export type ExtraLinkOptions = {
  normalizeHref: HrefNormalizer,
  instructions?: string,
};

export type UseLinkOverrides = UseBodilessOverrides<Props, LinkData, ExtraLinkOptions>;

export type AsBodilessLink = AsBodiless<Props, LinkData, ExtraLinkOptions>;
