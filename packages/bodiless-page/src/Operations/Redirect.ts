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

import { ContentNode } from '@bodiless/data';
import {
  convertAliasJsonToText,
  convertAliasTextToJson,
  useGetRedirectAliases,
  useSetRedirectAliases,
} from '../RedirectAlias';
import { DEFAULT_PAGE_REDIRECT_STATUS } from '../constants';

const createRedirect = (node: ContentNode<object>, origin: string, destination: string) => {
  // To save new redirect, needs to append to existing ones to avoid any data loss.
  // If empty, only new aliases will be saved.
  const aliasesJsonOld = useGetRedirectAliases(node);
  const aliasesTextOld = convertAliasJsonToText(aliasesJsonOld);
  const aliasesTextNew = `${origin} ${destination} ${DEFAULT_PAGE_REDIRECT_STATUS}`;
  const aliasesText = (aliasesTextOld !== '')
    ? `${aliasesTextOld}\n${aliasesTextNew}`
    : aliasesTextNew;

  // Aliases converted to json object.
  const aliasesJson = convertAliasTextToJson(aliasesText as string);

  // Saves json file.
  useSetRedirectAliases(node, aliasesJson);
};

export {
  createRedirect,
};
