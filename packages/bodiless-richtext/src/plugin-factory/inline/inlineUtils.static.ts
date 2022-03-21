/**
 * Copyright © 2019 Johnson & Johnson
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

import { staticFunction } from '@bodiless/hydration';

export const createIsActive = staticFunction(() => () => undefined);
export const hasInline = staticFunction(() => undefined);
export const createInline = staticFunction(() => {});
export const removeInline = staticFunction(() => null);
export const wrapInline = staticFunction(() => null);
export const updateInline = staticFunction(() => null);
export const insertInline = staticFunction(() => null);
export const toggleInline = staticFunction(() => null);
export const createToggleInline = staticFunction(() => () => null);
