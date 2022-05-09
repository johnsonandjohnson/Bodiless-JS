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

rebase () {
  if [[ ${PLATFORM_BRANCH} =~ ^pr ]]; then
    ID=$(echo $PLATFORM_BRANCH | sed s/pr-//g)
    git fetch origin pull/${ID}/head:${PLATFORM_BRANCH}-rebase
    ${CMD_GIT} rebase ${PLATFORM_BRANCH}-rebase -s recursive -X theirs
    ${CMD_GIT} branch -d ${PLATFORM_BRANCH}-rebase
  else
    ${CMD_GIT} fetch origin
    ${CMD_GIT} rebase origin/${PLATFORM_BRANCH} -s recursive -X theirs
  fi
} 

reset () {
  echo "Reset"
  if [[ ${PLATFORM_BRANCH} =~ ^pr ]]; then
    current_branch=${get_current_branch}
    if [[ -z ${current_branch} || ${current_branch} != ${PLATFORM_BRANCH} ]]; then
      echo Cannot reset PR when platform branch is not current branch.
      exit 1
    fi
    ID=$(echo $PLATFORM_BRANCH | sed s/pr-//g)
    git fetch origin pull/${ID}/head:${PLATFORM_BRANCH}-rebase
    git reset --hard ${PLATFORM_BRANCH}-rebase
    git branch -D ${PLATFORM_BRANCH}-rebase
  else
    if [[ -z ${current_branch} || ${current_branch} != ${PLATFORM_BRANCH} ]]; then
      git checkout ${PLATFORM_BRANCH}
    fi
    git reset --hard origin/${PLATFORM_BRANCH}
  fi
  git clean -fd
}

pull () {
  if [ -z "$(git status -s)" ]; then
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
  if [ ! -z "$(git status | grep rebasing)" ]; then
    git rebase --abort
  fi
  git fetch origin
  git status
  if [ ${PLATFORM_BRANCH} = $(get_current_branch) ]; then
    echo "Already on ${PLATFORM_BRANCH}"
    if [ ! -z "$(git status | grep diverged)" ]; then
      echo "Branches have diverged, discarding local changes"
      reset
    else
      pull
    fi
  else
    echo "Not on ${PLATFORM_BRANCH}"
    reset
  fi
}

full_deploy () {
  echo "Full deploy, branch is ${PLATFORM_BRANCH}"
  rm -rf ${ROOT_DIR}
  if [[ ${PLATFORM_BRANCH} =~ ^pr- ]]; then
    ${CMD_GIT} -c credential.helper="!f() { sleep 5; echo username=${APP_GIT_USER}; echo password=${APP_GIT_PW}; }; f" clone ${APP_GIT_REMOTE_URL} ${ROOT_DIR}
    cd ${ROOT_DIR}
    ID=$(echo $PLATFORM_BRANCH | sed s/pr-//g)
    git fetch origin pull/${ID}/head:${PLATFORM_BRANCH}
    git checkout ${PLATFORM_BRANCH}
  else
    ${CMD_GIT} -c credential.helper="!f() { sleep 5; echo username=${APP_GIT_USER}; echo password=${APP_GIT_PW}; }; f" clone -b ${PLATFORM_BRANCH} ${APP_GIT_REMOTE_URL} ${ROOT_DIR}
    cd ${ROOT_DIR}
  fi
  git_store_credential
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
  if [[ ${PLATFORM_BRANCH} =~ ^pr- ]]; then
    if [[ ${APP_GIT_REMOTE_URL} =~ github\.com ]]; then
      return 0
    else
      echo "Edit environments for PR branches are only enabled on GitHub"
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
  # Exit if on a PR branch and not on GitHub
  if ! check_branch; then
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
  pm2 stop frontend && pm2 stop backend || true
}

# Default implementation of psh deploy hook (fresh clone and prepare npm)
default_deploy () {
  full_deploy
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
  pm2 restart backend && pm2 restart frontend || pm2 start ${PLATFORM_APP_DIR}/ecosystem.config.js
}

# _setup/_teardown are not hooks; they implement internal logic we never want overridden.
invoke "_setup_$1"
invoke "prepare_$1"
invoke "$1"
invoke "finalize_$1"
invoke "_teardown_$1"
