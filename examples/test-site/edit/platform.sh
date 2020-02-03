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

if [ -z "$1" ]; then
  echo "Usage: sh platform.sh start|deploy"
  exit
fi

# Expects the following env variables:
# APP_VOLUME - the absolute path of the writable volume
# APP_GIT_REMOTE_URL - the path to the bitbucket git repository
# APP_GIT_USER - the user for git operations
# APP_GIT_PW - the password for git operations
# PLATFORM_APP_DIR - the absolute path to the application directory. provided by platform.sh
# PLATFORM_BRANCH - the name of the Git branch. provided by platform.sh
# PLATFORM_ROUTES - describes the routes defined in psh environment. provided by platform.sh

CMD_GIT=/usr/bin/git
TMP_DIR=${APP_VOLUME}/../tmp
ROOT_DIR=${APP_VOLUME}/root
GIT_REMOTE_URL=https://${APP_GIT_USER}:${APP_GIT_PW}@${APP_GIT_REMOTE_URL##https://}
NPM_CACHE_DIR=${APP_VOLUME}/.npm

check_vars () {
  if [ \
    -z "${APP_VOLUME}" \
    -o -z "${APP_GIT_REMOTE_URL}" \
    -o -z "${APP_GIT_USER}" \
    -o -z "${APP_GIT_PW}" \
    -o -z "${PLATFORM_APP_DIR}" \
    -o -z "${PLATFORM_BRANCH}" \
  ]; then
    echo Missing required environment variables.
    exit 1
  fi
}

get_current_branch () {
  branch_name="$(git symbolic-ref HEAD 2>/dev/null)"
  echo ${branch_name##refs/heads/}
}

install () {
  mkdir -p ${NPM_CACHE_DIR}
  echo "Creating .npmrc"
  echo "cache = ${NPM_CACHE_DIR}" > .npmrc

  cd ${ROOT_DIR}

  bash ${PLATFORM_APP_DIR}/platform.custom.sh install
  bash ${PLATFORM_APP_DIR}/platform.custom.sh build

  ${CMD_GIT} checkout  package-lock.json
}

rebase () {
  ${CMD_GIT} fetch origin
  ${CMD_GIT} rebase origin/${PLATFORM_BRANCH} -s recursive -X theirs
}

reset () {
  echo "Reset"
  ${CMD_GIT} fetch origin
  current_branch=${get_current_branch}
  if [[ -z ${current_branch} ]]; then
    git checkout ${PLATFORM_BRANCH}
  elif [[ ${current_branch} != ${PLATFORM_BRANCH} ]]; then
    git checkout ${PLATFORM_BRANCH}
  fi
  git reset --hard origin/${PLATFORM_BRANCH}
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
  echo "Performing full deploy, branch is ${PLATFORM_BRANCH}"
  rm -rf ${ROOT_DIR}
  ${CMD_GIT} clone -b ${PLATFORM_BRANCH} ${GIT_REMOTE_URL} ${ROOT_DIR}
  cd ${ROOT_DIR}
  ${CMD_GIT} config user.email "${APP_GIT_USER_EMAIL}"
  ${CMD_GIT} config user.name "${APP_GIT_USER}"
}

predeploy () {
  if [[ ${PLATFORM_BRANCH} =~ ^pr- ]]; then
      echo "Edit environments are not enabled on PR branches"
      exit
  fi
  check_vars
  mkdir -p ${APP_VOLUME}/.config
  mkdir -p ${APP_VOLUME}/.pm2
  # pm2 is launched in our start hook, but sometimes we get here before
  # it has fully initialized.  We need to wait for it to be listening
  # before trying to stop the frontend.  Otherwise we create a pm2 god-daemon
  # which causes builds to be stuck.
  node ${PLATFORM_APP_DIR}/waitForPM2.js

  # wait 2 seconds to work around pm2 daemon issue.
  sleep 2
  pm2 stop frontend && pm2 stop backend || true
}

postdeploy () {
  pm2 restart backend && pm2 restart frontend || pm2 start ${PLATFORM_APP_DIR}/ecosystem.config.js
}

if [ "$1" = "deploy" ]; then
  echo "DEPLOY AT $(date)"
  predeploy
  if [ -d ${ROOT_DIR}/.git ]; then
    incremental_deploy
  else
    full_deploy
  fi
  install
  postdeploy
elif [ "$1" = "start" ]; then
  if [[ ${PLATFORM_BRANCH} =~ ^pr- ]]; then
      echo "Edit environments are not enabled on PR branches"
      exec sleep infinity
  else
      echo "Starting application on ${date}"
      exec pm2 start --no-daemon ${PLATFORM_APP_DIR}/ecosystem.config.js
  fi
elif [ "$1" = "build" ]; then
  echo "APP BUILD AT $(date)"
  echo "Creating symlinks for .config and .pm2"
  rm -rf .config
  rm -rf .pm2
  ln -s ${APP_VOLUME}/.config .config
  ln -s ${APP_VOLUME}/.pm2 .pm2
elif [ "$1" = "fresh" ]; then
  echo "FRESH INSTALL AT $(date)"
  predeploy
  full_deploy
  install
  postdeploy
fi
