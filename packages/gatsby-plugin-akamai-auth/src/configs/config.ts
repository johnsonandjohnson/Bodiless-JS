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

const config = {
  clientSecret: process.env.JANRAIN_CLIENT_SECRET || '',
  redirectUri: process.env.JANRAIN_REDIRECT_URI || '',
  FileStoreSessionOptions: {
    path: process.env.SESSION_STORAGE_PATH || './janrain_sessions',
    ttl: process.env.SESSION_STORAGE_TTL || '3600',
    secret: process.env.SESSION_SECRET || 'SUPERSECRETSTRING',
  },
};

export default config;
