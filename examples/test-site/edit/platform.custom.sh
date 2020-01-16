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
# PLATFORM_APP_DIR - the absolute path to the application directory. provided by platform.sh

if [ "$1" = "install" ]; then
  npm run bootstrap
elif [ "$1" = "build" ]; then
  npm run build:packages -- --concurrency 1
elif [ "$1" = "finish-deploy" ]; then
  SITE_DIR=${ROOT_DIR}/examples/test-site
  cp ${PLATFORM_APP_DIR}/${DEFAULT_ENV} ${SITE_DIR}/.env.development
  if [ -n "${BV_SCRIPT}" ]; then
    echo "BV_SCRIPT=$BV_SCRIPT" >> ${SITE_DIR}/.env.development
  fi
else
  echo "Unknown command specified to $0"
fi