/**
 * Copyright © 2021 Johnson & Johnson
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

import { Token, asToken } from '@bodiless/fclasses';

export type Tokens = {
  [key: string]: Token,
};

class TokenMap<P> {
  protected map = new Map<string, Token>();

  protected groupsFor: (token?: Token) => string[];

  constructor(groupsFor?: (token?: Token) => string[]) {
    this.groupsFor = groupsFor || ((token?: Token) => token?.meta?.categories?.Category || []);
  }

  get names() {
    return Array.from(this.map.keys());
  }

  get groups() {
    const groups = new Set<string>();
    this.map.forEach(value => {
      const g = this.groupsFor(value);
      if (g.length === 0) groups.add('Other');
      else g.forEach(c => groups.add(c));
    });
    return Array.from(groups.values());
  }

  namesFor(group: string) {
    return Array.from(this.map.keys()).reduce((acc, key) => {
      const groups = this.groupsFor(this.map.get(key));
      if (groups.includes(group) || (groups.length === 0 && group === 'Other')) {
        return [...acc, key];
      }
      return acc;
    }, [] as string[]);
  }

  set(name: string, token: Token) {
    this.map.set(name, token);
  }

  add(tokens: Tokens) {
    Object.keys(tokens).forEach(
      key => this.set(key, tokens[key]),
    );
  }

  delete(name: string) {
    this.map.delete(name);
  }

  flow<P>(tokens: string[] = []) {
    const tokenHOCs = tokens.reduce((hocs, name) => {
      const hoc = this.map.get(name);
      if (!hoc) return [...hocs];
      return [...hocs, hoc];
    }, [] as Token[]);
    return asToken(
      {}, // see https://github.com/microsoft/TypeScript/issues/28010
      ...tokenHOCs,
    );
  }
}

export default TokenMap;
