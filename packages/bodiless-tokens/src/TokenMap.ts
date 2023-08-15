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

import {
  HOC, Token, TokenMeta, TokenSpec, TokenCollection, as,
} from '@bodiless/fclasses';

export type Tokens = {
  [key: string]: HOC,
};

const extractMeta = (token?: Token): TokenMeta => {
  if (typeof token === 'function') return token?.meta || {};
  if (typeof token === 'string') return {};
  return (token as TokenSpec<any, any>)?.Meta || {};
};

class TokenMap {
  protected map = new Map<string, Token>();

  protected extractGroupsFromToken: (token?: Token) => string[];

  constructor(extractGroupsFromToken?: (token?: Token) => string[]) {
    this.extractGroupsFromToken = extractGroupsFromToken || (
      (token?: Token) => extractMeta(token).categories?.Group || []
    );
  }

  /**
   * Builds a token map from a token collection.
   *
   * @param collection
   */
  addCollection<D extends object>(collection: TokenCollection<any, D>) {
    const tokens = Object.keys(collection).reduce(
      (toks, key) => ({
        ...toks,
        [key]: as(collection[key] as Token),
      }),
      {}
    );
    this.add(tokens);
    return this;
    // TBD Conflict resolution
    // Currently on main... looks like change was for typesafing : HOCWithMeta 
    // constructor(groupsFor?: (token?: HOC) => string[]) {
    //   this.groupsFor = groupsFor
    //     || ((token?: HOCWithMeta) => token?.meta?.categories?.Category || []);
    // }
    // Currently on main in 2022
    // constructor(groupsFor?: (token?: HOC) => string[]) {
    //   this.groupsFor = groupsFor || ((token?: HOC) => token?.meta?.categories?.Category || []);
    // }
  }

  get names() {
    return Array.from(this.map.keys());
  }

  /**
   * All the groups defined in this collection.
   */
  get groups() {
    const groups = new Set<string>();
    this.map.forEach(value => {
      const g = this.extractGroupsFromToken(value);
      if (g.length === 0) groups.add('Other');
      else g.forEach(c => groups.add(c));
    });
    return Array.from(groups.values());
  }

  /**
   * Returns all the groups to which a particular token belongs.
   *
   * @param name
   * The name of the token.
   *
   * @returns
   * An array of the groups to which the token belongs.
   */
  groupsFor(name: string): string[] {
    return this.groups.reduce(
      (groups, group) => (this.namesFor(group).includes(name) ? [...groups, group] : groups),
      [] as string[],
    );
  }

  namesFor(group: string) {
    return Array.from(this.map.keys()).reduce((acc, key) => {
      const groups = this.extractGroupsFromToken(this.map.get(key));
      if (groups.includes(group) || (groups.length === 0 && group === 'Other')) {
        return [...acc, key];
      }
      return acc;
    }, [] as string[]);
  }

  set(name: string, token: Token) {
    this.map.set(name, token);
  }

  add<D extends object>(tokens: TokenCollection<any, D>) {
    Object.keys(tokens).forEach(
      key => this.set(key, tokens[key] as Token),
    );
    return this;
  }

  delete(name: string) {
    this.map.delete(name);
  }

  flow<P>(tokenNames: string[] = []) {
    const tokens = tokenNames.reduce((toks, name) => {
      const tok = this.map.get(name);
      if (!tok) return [...toks];
      return [...toks, tok];
    }, [] as Token[]);
    return as(...tokens);
  }
}

export default TokenMap;
