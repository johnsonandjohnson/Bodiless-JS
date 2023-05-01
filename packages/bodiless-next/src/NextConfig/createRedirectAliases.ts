/**
 * Copyright © 2023 Johnson & Johnson
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
import { getRedirectAliases } from '@bodiless/components/lib/cjs/NodeApi';
import type { AliasItem } from '@bodiless/page';

type Redirects = {
  source: string,
  destination: string,
  statusCode: number,
};

const createRedirect = (item: AliasItem) => ({
  source: item.fromPath,
  destination: item.toPath,
  statusCode: Number(item.statusCode),
});

const createRedirectAliases = async () => {
  const aliases = await getRedirectAliases();
  const redirects = [] as Redirects[];

  if (aliases && aliases.length) {
    aliases.forEach((item: AliasItem) => {
      redirects.push(createRedirect({
        ...item,
        fromPath: item.fromPath.replace('//', '/'),
      }));
    });
  }
  return redirects;
};

export default createRedirectAliases;
