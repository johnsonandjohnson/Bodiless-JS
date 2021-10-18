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

import axios from 'axios';

export type OIDCClientConfig = {
  baseUrl?: string,
  client_id: string,
  secret: string,
};

export type OIDCAuthParams = {
  client_id: string,
  redirect_uri: string,
  scope: string, // 'openid email phone' | openid is required.
  response_type: string,
  state: string,
};

export class OIDCClient {
  private baseUrl: string;

  // private client_id: string;

  private secret: string;

  // private scope: string = 'openid email phone';

  constructor(oidcClientConfig: OIDCClientConfig) {
    const {
      baseUrl = '',
      // client_id,
      secret,
    } = oidcClientConfig;

    this.baseUrl = baseUrl;
    this.secret = secret;
    // this.client_id = client_id;
  }

  get(resourcePath: string, params: any) {
    const headers = {
      Authorization: this.secret,
    };

    return axios.get(`${this.baseUrl}/${resourcePath}`, { headers, params });
  }

  authorize(params: OIDCAuthParams) {
    return this.get('/login/authorize', params);
  }
}
