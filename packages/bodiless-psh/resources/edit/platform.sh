#!/bin/bash
###
 # Copyright © 2019 Johnson & Johnson
 #
 # Licensed under the Apache License, Version 2.0 (the "License");
 # you may not use this file except in compliance with the License.
 # You may obtain a copy of the License at
 # http:##www.apache.org#licenses#LICENSE-2.0
 # Unless required by applicable law or agreed to in writing, software
 # distributed under the License is distributed on an "AS IS" BASIS,
 # WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 # See the License for the specific language governing permissions and
 # limitations under the License.
 ##
set -e

if [[ -f platform.custom.sh ]]; then
  source platform.custom.sh
fi

# Expects the following env variables:
# APP_VOLUME - the absolute path of the writable volume
# APP_GIT_REMOTE_URL - the path to the git repository
# APP_GIT_USER - the user for git operations
# APP_GIT_PW - the password for git operations
# PLATFORM_APP_DIR - the absolute path to the application directory. provided by platform.sh
# PLATFORM_BRANCH - the name of the Git branch. provided by platform.sh
# PLATFORM_ROUTES - describes the routes defined in psh environment. provided by platform.sh
CMD_GIT=/usr/bin/git
TMP_DIR=${APP_VOLUME}/../tmp
ROOT_DIR=${APP_VOLUME}/root
NPM_CACHE_DIR=${APP_VOLUME}/.npm
GIT_STORE_CREDENTIAL=${APP_VOLUME}/.credential

invoke () {
  if [[ $(type $1 2>&1) =~ "function" ]]; then
    echo "Begin $1 at $(date)"
    $1
    echo "End $1 at $(date)"
  else
    cmd="default_$1"
    if [[ $(type $cmd 2>&1) =~ 'function' ]]; then 
      echo "Begin $cmd at $(date)"
      $cmd
      echo "End $cmd at $(date)"
    fi
  fi
}

check_vars () {
  if [ \
    -z "${APP_VOLUME}" \
    -o -z "${APP_GIT_REMOTE_URL}" \
    -o -z "${APP_GIT_USER}" \
    -o -z "${APP_GIT_PW}" \
    -o -z "${PLATFORM_APP_DIR}" \
    -o -z "${PLATFORM_BRANCH}" \
    -o -z "${APP_SITE_NAME}" \
    -o -z "${APP_SITE_DIR_NAME}" \
  ]; then
    echo Missing required environment variables.
    exit 1
  fi
}

get_current_branch () {
  branch_name="$(git symbolic-ref HEAD 2>/dev/null)"
  echo ${branch_name##refs/heads/}
}

# Check if the given branch name is a PR branch.
#
# @param string - git branch name.
#
# prints "true"|"false"
is_pr_branch() {
  local BRANCH_NAME=${1}
  if [[ ${BRANCH_NAME} =~ ^pr-[0-9]+$ ]] || \
    [[ ${BRANCH_NAME} =~ ^x--bitbucket-[^-]+-pr-[0-9]+$ ]]; then
    echo "true"
  else
    echo "false"
  fi
}

# Retrieve pull request id from branch name
#
# @param string - branch name, e.g 'pr-123' or 'x--bitbucket-xxxxxxxxxxx-pr-123'
#
# prints PR number
get_pr_id() {
  ID=$(echo ${1} | sed -r 's/.*pr-([0-9]+)$/\1/g')
  if [[ ${ID} =~ ^[0-9]+$ ]]; then
    echo ${ID}
  else
    return 1
  fi
}

rebase () {
  if [[ $(is_pr_branch ${PLATFORM_BRANCH}) == "true" ]]; then
    ID=$(get_pr_id ${PLATFORM_BRANCH})
    ${CMD_GIT} fetch origin pull/${ID}/head:${PLATFORM_BRANCH}-rebase
    ${CMD_GIT} rebase ${PLATFORM_BRANCH}-rebase -s recursive -X theirs
    ${CMD_GIT} branch -d ${PLATFORM_BRANCH}-rebase
  else
    ${CMD_GIT} fetch origin
    ${CMD_GIT} rebase origin/${PLATFORM_BRANCH} -s recursive -X theirs
  fi
} 

reset () {
  echo "Reset"
  if [[ $(is_pr_branch ${PLATFORM_BRANCH}) == "true" ]]; then
    current_branch=${get_current_branch}
    if [[ -z ${current_branch} || ${current_branch} != ${PLATFORM_BRANCH} ]]; then
      echo Cannot reset PR when platform branch is not current branch.
      exit 1
    fi
    ID=$(get_pr_id ${PLATFORM_BRANCH})
    ${CMD_GIT} fetch origin pull/${ID}/head:${PLATFORM_BRANCH}-rebase
    ${CMD_GIT} reset --hard ${PLATFORM_BRANCH}-rebase
    ${CMD_GIT} branch -D ${PLATFORM_BRANCH}-rebase
  else
    if [[ -z ${current_branch} || ${current_branch} != ${PLATFORM_BRANCH} ]]; then
      ${CMD_GIT} checkout ${PLATFORM_BRANCH}
    fi
    ${CMD_GIT} reset --hard origin/${PLATFORM_BRANCH}
  fi
  ${CMD_GIT} clean -fd
}

pull () {
  if [ -z "$(${CMD_GIT} status -s)" ]; then
    echo "Working tree clean"
    rebase
  else
    echo "Saving working tree to temporary commit"
    ${CMD_GIT} add -A
    ${CMD_GIT} commit -m "Temporary commit"
    rebase
    ${CMD_GIT} reset HEAD^
  fi
}

incremental_deploy () {
  echo "Performing incremental deploy on $(get_current_branch)"
  cd ${ROOT_DIR}
  if [ ! -z "$(${CMD_GIT} status | grep rebasing)" ]; then
    ${CMD_GIT} rebase --abort
  fi
  ${CMD_GIT} fetch origin
  ${CMD_GIT} status
  if [ ${PLATFORM_BRANCH} = $(get_current_branch) ]; then
    echo "Already on ${PLATFORM_BRANCH}"
    if [ ! -z "$(${CMD_GIT} status | grep diverged)" ]; then
      echo "Branches have diverged, discarding local changes"
      reset
    else
      pull
    fi
  else
    echo "Not on ${PLATFORM_BRANCH}"
    reset
  fi
  # skip finalize steps on incremental deploy
  unset default_finalize_deploy
  unset finalize_deploy
}

# Check if the given command available in shell, with mute output.
# @param string command name, i.e git, curl etc.
shell_command_exist() {
  type ${1} > /dev/null 2>&1
}

# Get the source branch and repo info of given PR.
#
# - This function retrieves PR info via github/bitbucket API using PR ID. 
# - It exits with error code in following cases:
#     code:
#       [1] A non-github/bitbucket https remote url provided. 
#       [2] `curl` command is not available
#       [3] `jq` command is not available
#       [4] Failed on API request, i.e. authentication failure, invalid PR id, etc
#     
# @param string pull request id
#
# This function prints PR `head ref`, `head repo id`, `base repo id` as string.
get_pr_source_branch() {
  # get function arguments
  local PR_ID=${1}
  local GIT_HOST=$(echo ${APP_GIT_REMOTE_URL} | awk -F/ '{print $3}')

  # validate input and env cmd
  if [[ ${GIT_HOST} != "github.com" ]] && [[ ${GIT_HOST} != "bitbucket.org" ]]; then
    return 1
  fi
  local GIT_OWNER=$(echo ${APP_GIT_REMOTE_URL} | awk -F/ '{print $4}')
  local GIT_REPO=$(echo ${APP_GIT_REMOTE_URL} | awk -F/ '{print $5}' | cut -d'.' -f1)
  if ! (shell_command_exist curl); then
    return 2
  fi
  if ! (shell_command_exist jq); then
    return 3
  fi

  ${CMD_GIT} fetch origin
  if [[ ${GIT_HOST} == "github.com" ]]; then
    # Get PR info using github API.
    local PR_INFO=$(curl \
      -s -f -H "Accept: application/vnd.github+json" \
      -H "Authorization: Bearer ${PAT}" \
      https://api.github.com/repos/${GIT_OWNER}/${GIT_REPO}/pulls/${PR_ID})
    local RESULT=$?
    if [ ${RESULT} -ne 0 ];then
      return 4
    fi
    # Get branch info from json response.
    local HEAD=$(echo ${PR_INFO} | jq -r '.head.ref,.head.repo.id,.base.repo.id')
  else
    # Get PR info using BitBucket API.
    # https://developer.atlassian.com/cloud/bitbucket/rest/intro/#authentication
    # https://developer.atlassian.com/cloud/bitbucket/rest/api-group-pullrequests/#api-repositories-workspace-repo-slug-pullrequests-pull-request-id-get
    local ACCESS_TOKEN_INFO=$(curl \
      -s -X POST -u "${APP_GIT_BITBUCKT_OAUTH_KEY}:${APP_GIT_BITBUCKT_OAUTH_SECRET}" \
      https://bitbucket.org/site/oauth2/access_token \
      -d grant_type=client_credentials)
    local RESULT_TOKEN=$?
    if [ ${RESULT_TOKEN} -ne 0 ];then
      return 4
    fi
    local ACCESS_TOKEN=$(echo ${ACCESS_TOKEN_INFO} | jq -r '.access_token')
    local PR_INFO=$(curl \
      -s --request GET \
      --url 'https://api.bitbucket.org/2.0/repositories/'${GIT_OWNER}'/'${GIT_REPO}'/pullrequests/'${PR_ID} \
      --header 'Authorization: Bearer '${ACCESS_TOKEN} \
      --header 'Accept: application/json')
    local RESULT=$?
    if [ ${RESULT} -ne 0 ];then
      return 4
    fi
    # Get branch info from json response.
    local HEAD=$(echo ${PR_INFO} | jq -r '.source.branch.name,.source.repository.uuid,.destination.repository.uuid')
  fi
  echo ${HEAD}
  return 0
}

full_deploy () {
  echo "Performing full deploy on branch [ ${PLATFORM_BRANCH} ]"
  rm -rf ${ROOT_DIR}

  if [[ $(is_pr_branch ${PLATFORM_BRANCH}) == "true" ]]; then
    ${CMD_GIT} -c credential.helper='!f() { sleep 5; echo username=${APP_GIT_USER}; echo password=${APP_GIT_PW}; }; f' clone ${APP_GIT_REMOTE_URL} ${ROOT_DIR}
    echo "Cloned to ${ROOT_DIR}"
    cd ${ROOT_DIR}
    git_store_credential
    CHECKOUT=0
    ID=$(get_pr_id ${PLATFORM_BRANCH})
    # no stop on error returned from get_pr_source_branch
    set +e
    PR_BRANCH_INFO=$(get_pr_source_branch ${ID})
    echo "ID: ${ID} - ${PR_BRANCH_INFO}"
    if [[ $? == 0 ]];then
      # Success on retrieving PR source branch info, then parse the branch and repo names.
      read -r SOURCE_BRANCH HEAD_REPO_ID BASE_REPO_ID <<< ${PR_BRANCH_INFO}
      echo ${SOURCE_BRANCH}
      if [ ${HEAD_REPO_ID} == ${BASE_REPO_ID} ]; then
        # Checkout PR source branch instead of PR head ref.
        ${CMD_GIT} checkout -b ${SOURCE_BRANCH} origin/${SOURCE_BRANCH}
        CHECKOUT=1
      fi
    elif [[ $? == 1 ]]; then
      echo 'Upstream branch setup is only available for github and bitbucket cloud repos'
    elif [[ $? == 2 ]]; then
      echo '"curl" is required to set upstream branch'
    elif [[ $? == 3 ]]; then
      echo '"jq" is required to set upstream branch'
    elif [[ $? == 4 ]]; then
      echo 'Failed to get PR info, please check Pull Request number and API(GitHub or BitBucket) credentials are valid'
    fi
    set -e
    if [ ${CHECKOUT} == 0 ];then
      # If failed to checkout by source branch, i.e. non-github/bitbucket repo, API error,
      # missing shell commands, or this is a cross repo PR, then checkout by head ref.
      ${CMD_GIT} fetch origin pull/${ID}/head:${PLATFORM_BRANCH}
      ${CMD_GIT} checkout ${PLATFORM_BRANCH}
    fi
    ${CMD_GIT} status
  else
    ${CMD_GIT} -c credential.helper='!f() { sleep 5; echo username=${APP_GIT_USER}; echo password=${APP_GIT_PW}; }; f' clone -b ${PLATFORM_BRANCH} ${APP_GIT_REMOTE_URL} ${ROOT_DIR}
    cd ${ROOT_DIR}
    git_store_credential
  fi
  ${CMD_GIT} config user.email "${APP_GIT_USER_EMAIL}"
  ${CMD_GIT} config user.name "${APP_GIT_USER}"
}

init_npmrc () {
  echo "Creating .npmrc"
  echo "cache = ${NPM_CACHE_DIR}" > .npmrc
  if [ $APP_NPM_REGISTRY ] && [ $APP_NPM_AUTH ] && [ $APP_NPM_NAMESPACE ]; then
    echo "NPM Private registry for $APP_NPM_NAMESPACE is $APP_NPM_REGISTRY"
    bash -c 'echo NPM Auth token is ${APP_NPM_AUTH:0:50}...'
    echo "$APP_NPM_NAMESPACE:registry=https:${APP_NPM_REGISTRY}" >> .npmrc
    echo "${APP_NPM_REGISTRY}:_authToken=${APP_NPM_AUTH}" >> .npmrc
  fi
}

git_store_credential () {
  # process credential store only for http based url
  if  [[ ${APP_GIT_REMOTE_URL} =~ ^http ]] ;
  then
    # get host name
    GIT_HOST=$(echo ${APP_GIT_REMOTE_URL} | awk -F/ '{print $3}')
    # remove user info, if any
    GIT_HOST="${GIT_HOST#*:*@}"
    echo 'https://'${APP_GIT_USER}':'$(echo -n ${APP_GIT_PW}|jq -sRr @uri)'@'${GIT_HOST} > ${GIT_STORE_CREDENTIAL}
    # set owner permission only
    chmod 600 ${GIT_STORE_CREDENTIAL}
    git config --local credential.helper 'store --file='${GIT_STORE_CREDENTIAL}
  fi
}

check_branch () {
  if [[ $(is_pr_branch ${PLATFORM_BRANCH}) == "true" ]]; then
    if [[ ${APP_GIT_REMOTE_URL} =~ github\.com ]] || [[ ${APP_GIT_REMOTE_URL} =~ bitbucket\.org ]]; then
      return 0
    else
      echo "Edit environments for PR branches are only enabled on GitHub and BitBucket Cloud"
      return 1
    fi
  fi
  return 0
}

# Default implementation of p.sh build hook
default_build () {
  echo "Creating symlinks for .config and .pm2"
  rm -rf .config
  rm -rf .pm2
  rm -rf .cache
  ln -s ${APP_VOLUME}/.config .config
  ln -s ${APP_VOLUME}/.pm2 .pm2
  ln -s ${APP_VOLUME}/.cache .cache
  init_npmrc
}

# Default implementaiton of p.sh start command
default_start () {
  if ! check_branch; then
    echo 'Invalid branch: not starting edit app'
    exec sleep infinity
  else
    echo "Starting application on ${date}"
    exec pm2 start --no-daemon ${PLATFORM_APP_DIR}/ecosystem.config.js
  fi
}

# Always run before the psh deploy hook.
_setup_deploy () {
  if ! check_branch; then
    # Exit if on a PR branch and not on GitHub or BitBucket
    echo 'Invalid branch; skipping edit environment deploy'
    exit
  fi
  check_vars
  mkdir -p ${APP_VOLUME}/.config
  mkdir -p ${APP_VOLUME}/.pm2
  mkdir -p ${APP_VOLUME}/.cache
  # pm2 is launched in our start hook, but sometimes we get here before
  # it has fully initialized.  We need to wait for it to be listening
  # before trying to stop the frontend.  Otherwise we create a pm2 god-daemon
  # which causes builds to be stuck.
  node ${PLATFORM_APP_DIR}/waitForPM2.js

  # wait 2 seconds to work around pm2 daemon issue.
  sleep 2
  pm2 stop ${PLATFORM_APP_DIR}/ecosystem.config.js || true
}

# If the branch to be deployed has same tree id as on origin/main, 
# return 0, otherwise 1
check_existing_deployment () {
  if [ ! -d "${ROOT_DIR}/.git" ]; then
    return 1
  fi
  cd ${ROOT_DIR}
  ${CMD_GIT} fetch origin
  local CURRENT_TREE=$(${CMD_GIT} rev-parse --verify -q HEAD^{tree})
  local BRANCH_TREE=$(${CMD_GIT} rev-parse --verify -q origin/${PLATFORM_BRANCH}^{tree})
  local CURRENT_BRANCH=$(get_current_branch)
  # must go back to parent folder before perform git clone.
  cd ${APP_VOLUME}
  if [[ ${CURRENT_BRANCH} == 'main' ]] && [[ ${BRANCH_TREE} == ${CURRENT_TREE} ]]; then
    return 0
  else
    return 1
  fi
}

# Default implementation of psh deploy hook (fresh clone and prepare npm)
default_deploy () {
  if check_existing_deployment; then
    incremental_deploy
  else
    full_deploy
  fi
  mkdir -p ${NPM_CACHE_DIR}
  cd ${ROOT_DIR}
}

# Default implementation of finalize psh deploy hook.
default_finalize_deploy () {
  npm ci
  npm run prestart
}

# Final step after p.sh deploy hook.
_teardown_deploy () {
  pm2 restart ${PLATFORM_APP_DIR}/ecosystem.config.js || pm2 start ${PLATFORM_APP_DIR}/ecosystem.config.js
}

# _setup/_teardown are not hooks; they implement internal logic we never want overridden.
invoke "_setup_$1"
invoke "prepare_$1"
invoke "$1"
invoke "finalize_$1"
invoke "_teardown_$1"
