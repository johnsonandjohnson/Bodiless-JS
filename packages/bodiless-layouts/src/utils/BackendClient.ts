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

import axios from 'axios';

const backendPort = process.env.GATSBY_BACKEND_PORT || 8001;

export default class BackendClient {
  private root: string;

  private prefix: string;

  constructor(baseUrl?: string, prefix?: string) {
    let host = `http://localhost:${backendPort}`;
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-undef
      const loc = window.location;
      host = `${loc.protocol}//${loc.hostname}:${loc.port}`;
    }
    this.root = baseUrl || process.env.BODILESS_BACKEND_URL || host;
    this.prefix = prefix || process.env.GATSBY_BACKEND_PREFIX || '/___backend';
  }

  get(resourcePath: string) {
    return axios.get(this.root + resourcePath);
  }

  post(resourcePath: string, data: any) {
    return axios.post(this.root + resourcePath, data);
  }

  saveFile(file: File) {
    // eslint-disable-next-line no-undef
    const payload = new FormData();
    payload.append('file', file);
    return this.post(`${this.prefix}/asset/`, payload);
  }

  /**
   * Copy asset.
   *
   * @param pathFrom string
   * @param pathTo string
   * @returns Promise<AxiosResponse<any>>
   */
  copyAsset(pathFrom: string, pathTo: string) {
    return this.post(`${this.prefix}/assets/copy/`, {
      path_from: pathFrom,
      path_to: pathTo,
    });
  }

  /**
   * Move asset.
   *
   * @param pathFrom string
   * @param pathTo string
   * @returns Promise<AxiosResponse<any>>
   */
  moveAsset(pathFrom: string, pathTo: string) {
    return this.post(`${this.prefix}/assets/move/`, {
      path_from: pathFrom,
      path_to: pathTo,
    });
  }
}
