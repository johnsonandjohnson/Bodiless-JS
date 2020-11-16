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

import path from 'path';
import axios from 'axios';

const backendPort = process.env.GATSBY_BODILESS_BACKEND_PORT || 8001;

type BackendClientConf = {
  baseUrl?: string,
  prefix?: string,
};

export default class BackendClient {
  private root: string;

  private prefix: string;

  constructor(backendClientConf?: BackendClientConf) {
    const {
      baseUrl = undefined,
      prefix = undefined,
    } = backendClientConf || {};
    let host = `http://localhost:${backendPort}`;
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-undef
      const loc = window.location;
      host = `${loc.protocol}//${loc.hostname}:${loc.port}`;
    }
    this.root = baseUrl || process.env.GATSBY_BODILESS_BACKEND_URL || host;
    this.prefix = prefix || process.env.GATSBY_BODILESS_BACKEND_PREFIX || '/___backend';
  }

  get(resourcePath: string) {
    return axios.get(this.root + resourcePath);
  }

  post(resourcePath: string, data: any) {
    return axios.post(this.root + resourcePath, data);
  }

  delete(resourcePath: string) {
    return axios.delete(this.root + resourcePath);
  }

  savePath(resourcePath: string, data: any) {
    const fullPath = path.join(this.prefix, 'content', resourcePath);
    return this.post(fullPath, data);
  }

  deletePath(resourcePath: string) {
    const fullPath = path.join(this.prefix, 'content', resourcePath);
    return this.delete(fullPath);
  }

  log(data: any) {
    const fullPath = path.join(this.prefix, 'log');
    return this.post(fullPath, data);
  }

  getPath(resourcePath: string) {
    const fullPath = path.join(this.prefix, 'content', resourcePath);
    return this.get(fullPath);
  }

  saveFile(file: string) {
    // eslint-disable-next-line no-undef
    const payload = new FormData();
    payload.append('file', file);
    return this.post(`${this.prefix}/asset/`, payload);
  }

  savePage(path$: string, template?: string) {
    const payload = {
      path: path$,
      template,
    };
    return this.post(`${this.prefix}/pages`, payload);
  }

  commit(
    message: string,
    directories: string[],
    paths: string[],
    files: string[],
    author?: string,
  ) {
    const d = directories || [];
    const p = paths || [];
    const f = files || [];
    const post = {
      message,
      dirs: Array.isArray(d) ? d : [d],
      paths: Array.isArray(p) ? p : [p],
      files: Array.isArray(f) ? f : [f],
      author,
    };
    return this.post(`${this.prefix}/change/commit`, post);
  }

  getLatestCommits() {
    return this.post(`${this.prefix}/get/commits`, {});
  }

  pull() {
    return this.post(`${this.prefix}/change/pull`, {});
  }

  reset() {
    return this.post(`${this.prefix}/change/reset`, {});
  }

  amend(paths: string[], files: string[]) {
    const p = paths || [];
    const f = files || [];
    const post = {
      paths: Array.isArray(p) ? p : [p],
      files: Array.isArray(f) ? f : [f],
    };
    return this.post(`${this.prefix}/change/amend`, post);
  }

  setCurrent(name: string) {
    return this.post(`${this.prefix}/set/current`, { name });
  }

  getSetList() {
    return this.get(`${this.prefix}/set/list`);
  }

  getChanges() {
    return this.get(`${this.prefix}/changes`);
  }

  getConflicts(target?: string) {
    const $param = target ? `?target=${target}` : '';
    return this.get(`${this.prefix}/changes/conflicts${$param}`);
  }

  mergeMaster() {
    return this.post(`${this.prefix}/merge/master`, {});
  }
}
