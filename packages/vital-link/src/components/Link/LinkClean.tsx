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

import { designable } from '@bodiless/fclasses';
import { withoutHydrationInline } from '@bodiless/hydration';
import { linkComponents, LinkBase } from '@bodiless/vital-link-core';

// Not sure why I have to redeclare LinkClean here -- using LinkClean from vital-link-core gave the
// Error: The inferred type of 'LinkStatic' cannot be named without a reference to
const LinkClean = designable(linkComponents, 'Link')(LinkBase);
export const LinkStatic = withoutHydrationInline()(LinkClean);
