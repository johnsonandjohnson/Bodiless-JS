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
import { parse } from 'dotenv';
import { readFileSync } from 'fs';

const getExistingVariables = (obj: any) => Object.fromEntries(
  Object.entries(obj).filter(([k, v]) => process.env[k] || v)
    .map(([k, v]) => [k, process.env[k] || v])
);

const getPublicEnv = () => {
  const envSite = './.env.site';
  let envSiteConfig = {};
  // Try to load environment variables from .env.site which must be always available at build.
  try {
    const buffer = readFileSync(envSite);
    envSiteConfig = parse(buffer);
  } catch (error) {
    //
  }

  const variables = {
    BODILESS_DOCS_URL: null,
    BODILESS_GENERATED_DESTINATION_PATH: null,
    BODILESS_GOOGLE_YOUTUBE_API_KEY: null,
    BODILESS_GTM_DATA_LAYER: null,
    BODILESS_GTM_ID: null,
    BODILESS_NEXT_TRAILING_SLASH: true,
    BODILESS_SEARCH_EXPIRES: null,
    BODILESS_SEARCH_INDEX_PREVIEW_LENGTH: null,
    BODILESS_SEARCH_INDEX_URL: null,
    BODILESS_SEARCH_PAGE: null,
    BODILESS_SEARCH_PARAMS: null,
    BODILESS_SHOWDESIGNKEYS: null,
    BV_API_VERSION: null,
    BV_CLIENT_NAME: null,
    BV_ENVIRONMENT: null,
    BV_HOST: null,
    BV_LOCALE: null,
    BV_SCRIPT: null,
    BV_SITE_ID: null,
  };

  const editVariables = {
    BODILESS_BACKEND_URL: null,
    BODILESS_BACKEND_PREFIX: null,
    BODILESS_BACKEND_SAVE_ENABLED: null,
    GATSBY_BODILESS_BACKEND_PORT: null,
    GATSBY_BODILESS_BACKEND_URL: null,
    GATSBY_BODILESS_BACKEND_PREFIX: null,
    BODILESS_BACKEND_DATA_FILE_PATH: null,
    BODILESS_BACKEND_STATIC_PATH: null,
    BODILESS_BACKEND_COMMIT_ENABLED: null,
    BODILESS_ALERT_ON_PAGE_LOAD_ENABLED: null,
  };

  const env = {
    ...envSiteConfig,
    ...getExistingVariables(variables)
  };

  if (process.env.NODE_ENV === 'development') {
    return {
      ...env,
      ...getExistingVariables(editVariables)
    };
  }
  return env;
};

export default getPublicEnv;
