###
 # Copyright © 2022 Johnson & Johnson
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

prepare_build () {
  export NODE_OPTIONS="--max-old-space-size=2048"
  init_npmrc
  npm run setup
}

build() {
  echo "Site is ${APP_SITE_NAME}"
  echo "Site directory is ${APP_SITE_DIR_NAME}"
  cd "sites/${APP_SITE_DIR_NAME}"
  npm run build
  # Move the site we built to the root. This allows selecting which site to
  # serve based on env var.
  cd ../..
  mv sites/${APP_SITE_DIR_NAME}/public public
}
