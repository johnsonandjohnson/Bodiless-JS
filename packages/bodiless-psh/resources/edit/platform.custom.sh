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

# Expects the following env variables:
# APP_NPM_REGISTRY - url to npm registry
# APP_NPM_AUTH - authentication token to npm registry
# PLATFORM_APP_DIR - the absolute path to the application directory. provided by platform.sh

if [ "$1" = "install" ]; then
  if [ $APP_NPM_REGISTRY ] && [ $APP_NPM_AUTH ]; then
      bash -c 'echo Auth token is ${APP_NPM_AUTH:0:50}...'
      echo "@bodiless:registry=https:${APP_NPM_REGISTRY}" > .npmrc
      echo "${APP_NPM_REGISTRY}:_authToken=${APP_NPM_AUTH}" >> .npmrc
  else
      echo "Npm registry env vars are missing. Trying to build from public registry..."
  fi
  npm ci
  rm .npmrc
elif [ "$1" = "build" ]; then
  npm run build
elif [ "$1" = "finish-deploy" ]; then
  echo "BODILESS_DOCS_URL=${DOCS_URL}" >> ${ROOT_DIR}/.env.production
  echo "BODILESS_DOCS_URL=${DOCS_URL}" >> ${ROOT_DIR}/.env.development
else
  echo "Unknown command specified to $0"
fi
