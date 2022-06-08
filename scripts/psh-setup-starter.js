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

/**
 * Running this script from a standalone site (starter) monorepo will create a github integration
 * with the p.sh project. Also it will set up all necessary p.sh enviroment variables.
 */

const fs = require('fs');
const axios = require('axios');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (question) => (
  new Promise((resolve) => {
    readline.question(question, (input) => resolve(input));
  })
);

const APP_SITE_DIR_NAME = fs.readdirSync('sites')[0];
const APP_SITE_NAME = (
  JSON.parse(fs.readFileSync(`sites/${APP_SITE_DIR_NAME}/package.json`)).name)
  .replace('@sites/', '');

const preparationStepsMessage = `
  Before running this script you should prepare your platform.sh project and github account:

  1. Create a p.sh project at https://console.platform.sh/
  2. Generate p.sh API token at https://console.platform.sh/-/users/{user}/settings/tokens
  3. Generate Github personal access token by following the doc:
      https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
  4. Make sure there are no existing github intergrations for the project yet:
      https://console.platform.sh/{project name}/{project id}/-/settings/integrations
     Otherwise the script will fail due to a conflict.

  If everything above is ready press "Enter" to continue
`;

const userInput = {
  // platform.sh project ID
  // The project should be created at https://console.platform.sh/
  PSH_PROJECT_ID: undefined,

  // platform.sh API token
  // Should be generated at https://console.platform.sh/-/users/{user}/settings/tokens
  PSH_API_TOKEN: undefined,

  // Github personal access token
  // https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
  GITHUB_PERSONAL_ACCESS_TOKEN: undefined,

  // Github user name
  GITHUB_OWNER: undefined,

  // Github repository name
  GITHUB_REPO: undefined,

  // Github password
  GITHUB_PW: undefined,
};

const getUserInput = async () => {
  await ask(preparationStepsMessage);
  userInput.PSH_PROJECT_ID = await ask('platform.sh project ID:\n');
  userInput.PSH_API_TOKEN = await ask('platform.sh API token:\n');
  userInput.GITHUB_PERSONAL_ACCESS_TOKEN = await ask('Github personal access token:\n');
  userInput.GITHUB_OWNER = await ask('Github user name:\n');
  userInput.GITHUB_REPO = await ask('Github repository name:\n');
  userInput.GITHUB_PW = await ask('Github account password:\n');
  readline.close();
};

const pshGetBearerToken = async () => {
  const request = await axios.post('https://auth.api.platform.sh/oauth2/token', {
    client_id: 'platform-api-user',
    grant_type: 'api_token',
    api_token: userInput.PSH_API_TOKEN,
  });
  return request.data?.access_token;
};

const pshGetProjectIntegrations = async (bearerAccessToken) => {
  const request = await axios.get(`https://api.platform.sh/projects/${userInput.PSH_PROJECT_ID}/integrations`, {
    headers: {
      Authorization: `Bearer ${bearerAccessToken}`,
    },
  });
  return request.data;
};

const pshCreateGithubIntegration = async (bearerAccessToken) => {
  const url = `https://api.platform.sh/projects/${userInput.PSH_PROJECT_ID}/integrations`;
  const data = {
    type: 'github',
    token: userInput.GITHUB_PERSONAL_ACCESS_TOKEN,
    base_url: null,
    repository: `${userInput.GITHUB_OWNER}/${userInput.GITHUB_REPO}`,
    fetch_branches: true,
    prune_branches: true,
    build_pull_requests: false,
    build_draft_pull_requests: false,
    build_pull_requests_post_merge: false,
    pull_requests_clone_parent_data: false,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${bearerAccessToken}`,
    },
  };
  const response = await axios.post(url, data, config);
  return response.status;
};

const pshGetProjectVatiables = async (bearerAccessToken) => {
  const request = await axios.get(`https://api.platform.sh/projects/${userInput.PSH_PROJECT_ID}/variables`, {
    headers: {
      Authorization: `Bearer ${bearerAccessToken}`,
    },
  });
  return request.data;
};

const pshCreateProjectVariables = async (bearerAccessToken) => {
  const url = `https://api.platform.sh/projects/${userInput.PSH_PROJECT_ID}/variables`;
  const data = [
    {
      name: 'env:APP_GIT_PW',
      attributes: {},
      value: userInput.GITHUB_PW,
      is_json: false,
      is_sensitive: true,
      visible_build: true,
      visible_runtime: true
    },
    {
      name: 'env:APP_GIT_REMOTE_URL',
      attributes: {},
      value: `https://github.com/${userInput.GITHUB_OWNER}/${userInput.GITHUB_REPO}.git`,
      is_json: false,
      is_sensitive: false,
      visible_build: true,
      visible_runtime: true
    },
    {
      name: 'env:APP_GIT_USER',
      attributes: {},
      value: userInput.GITHUB_OWNER,
      is_json: false,
      is_sensitive: false,
      visible_build: true,
      visible_runtime: true
    },
    {
      name: 'env:APP_SITE_DIR_NAME',
      attributes: {},
      value: APP_SITE_DIR_NAME,
      is_json: false,
      is_sensitive: false,
      visible_build: true,
      visible_runtime: true
    },
  ];
  const config = {
    headers: {
      Authorization: `Bearer ${bearerAccessToken}`,
    },
  };
  const request = await Promise.all(data.map(item => axios.post(url, item, config)));
  return request.status;
};

const run = async () => {
  try {
    await getUserInput();
    const bearerAccessToken = await pshGetBearerToken(userInput.PSH_API_TOKEN);
    await pshCreateGithubIntegration(bearerAccessToken);
    await pshCreateProjectVariables(bearerAccessToken);
    console.log('Success!');
    process.exit();
  } catch (e) {
    console.log(JSON.stringify(e, '\n', 2));
  }
};

run();
