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

const getPublicEnv = () => {
  const env = {
    BODILESS_GOOGLE_YOUTUBE_API_KEY: process.env.BODILESS_GOOGLE_YOUTUBE_API_KEY,
    BODILESS_SEARCH_EXPIRES: process.env.BODILESS_SEARCH_EXPIRES,
    BODILESS_SEARCH_PARAMS: process.env.BODILESS_SEARCH_PARAMS,
    BODILESS_SEARCH_PAGE: process.env.BODILESS_SEARCH_PAGE,
    BODILESS_SEARCH_INDEX_URL: process.env.BODILESS_SEARCH_INDEX_URL,
    BODILESS_SEARCH_INDEX_PREVIEW_LENGTH: process.env.BODILESS_SEARCH_INDEX_PREVIEW_LENGTH,
    BODILESS_DOCS_URL: process.env.BODILESS_DOCS_URL,
    BODILESS_SHOWDESIGNKEYS: process.env.BODILESS_SHOWDESIGNKEYS,
    BV_API_VERSION: process.env.BV_API_VERSION,
    BV_HOST: process.env.BV_HOST,
    BV_SCRIPT: process.env.BV_SCRIPT,
    BV_CLIENT_NAME: process.env.BV_CLIENT_NAME,
    BV_SITE_ID: process.env.BV_SITE_ID,
    BV_ENVIRONMENT: process.env.BV_ENVIRONMENT,
    BV_LOCALE: process.env.BV_LOCALE
  };

  if (process.env.NODE_ENV === 'development') {
    return {
      BODILESS_BACKEND_URL: process.env.BODILESS_BACKEND_URL,
      BODILESS_BACKEND_PREFIX: process.env.BODILESS_BACKEND_PREFIX,
      BODILESS_BACKEND_SAVE_ENABLED: process.env.BODILESS_BACKEND_SAVE_ENABLED,
      GATSBY_BODILESS_BACKEND_PORT: process.env.GATSBY_BODILESS_BACKEND_PORT,
      GATSBY_BODILESS_BACKEND_URL: process.env.GATSBY_BODILESS_BACKEND_URL,
      GATSBY_BODILESS_BACKEND_PREFIX: process.env.GATSBY_BODILESS_BACKEND_PREFIX,
      BODILESS_BACKEND_DATA_FILE_PATH: process.env.BODILESS_BACKEND_DATA_FILE_PATH,
      BODILESS_BACKEND_STATIC_PATH: process.env.BODILESS_BACKEND_STATIC_PATH,
      BODILESS_BACKEND_COMMIT_ENABLED: process.env.BODILESS_BACKEND_COMMIT_ENABLED,
      BODILESS_ALERT_ON_PAGE_LOAD_ENABLED: process.env.BODILESS_ALERT_ON_PAGE_LOAD_ENABLED,
      ...env
    };
  }
  return env;
};

module.exports = getPublicEnv;
