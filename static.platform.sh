###
 # Copyright © 2020 Johnson & Johnson
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

if [ -f static.platform.custom.sh ]; then
  source static.platform.custom.sh
fi

init_npmrc () {
  echo "Creating .npmrc"
  if [ $APP_NPM_REGISTRY ] && [ $APP_NPM_AUTH ] && [ $APP_NPM_NAMESPACE ]; then
    echo "NPM Private registry for $APP_NPM_NAMESPACE is $APP_NPM_REGISTRY"
    bash -c 'echo NPM Auth token is ${APP_NPM_AUTH:0:50}...'
    echo "$APP_NPM_NAMESPACE:registry=https:${APP_NPM_REGISTRY}" > .npmrc
    echo "${APP_NPM_REGISTRY}:_authToken=${APP_NPM_AUTH}" >> .npmrc
  fi
}

default_prepare_build () {
  init_npmrc
  npm ci
  npm run bootstrap
}

default_build () {
  npm run build
}

set_bodiless_psh_dir() {
  if [ -d "$PLATFORM_APP_DIR/sites/$APP_SITE_DIR_NAME/node_modules/@bodiless" ]; then
    BODILESS_PSH_DIR="$PLATFORM_APP_DIR/sites/$APP_SITE_DIR_NAME/node_modules/@bodiless/psh/lib"
  else
    BODILESS_PSH_DIR="$PLATFORM_APP_DIR/node_modules/@bodiless/psh/lib"
  fi
}

default_finalize_build () {
  set_bodiless_psh_dir
  #robots.txt preparation
#  export PSH_URL_REPLACER_SRC_FILE=$PLATFORM_DOCUMENT_ROOT/robots.txt
#  export PSH_URL_REPLACER_TMP_FILE=$PLATFORM_DOCUMENT_ROOT/../static/robots_pshtmp.txt
#  export PSH_URL_REPLACER_TARGET_FILE=$APP_VOLUME/robots.txt
#  node $BODILESS_PSH_DIR/psh-url-replacer.js build
#  #sitemap.xml preparation
#  export PSH_URL_REPLACER_SRC_FILE=$PLATFORM_DOCUMENT_ROOT/sitemap.xml
#  export PSH_URL_REPLACER_TMP_FILE=$PLATFORM_DOCUMENT_ROOT/../static/sitemap_pshtmp.xml
#  export PSH_URL_REPLACER_TARGET_FILE=$APP_VOLUME/sitemap.xml
#  node $BODILESS_PSH_DIR/psh-url-replacer.js build
  # ssi preparation
  export SSI_CONF_PATH=sites/$APP_SITE_DIR_NAME/ssi/ssi_conf.json
  export DOCUMENT_ROOT=$PLATFORM_DOCUMENT_ROOT
  export VOLUME_DIR=$APP_VOLUME
  node $BODILESS_PSH_DIR/generate-ssi-files.js build
}

default_deploy () {
  set_bodiless_psh_dir
  #processing site url
  APP_SITE_URL=$(echo $APP_SITE_URL | sed -e "s/\${PLATFORM_ENVIRONMENT}/$PLATFORM_ENVIRONMENT/g")
  APP_SITE_URL=$(echo $APP_SITE_URL | sed -e "s/\${PLATFORM_PROJECT}/$PLATFORM_PROJECT/g")
  #processing robots.txt
#  export PSH_URL_REPLACER_TMP_FILE=$PLATFORM_DOCUMENT_ROOT/../static/robots_pshtmp.txt
#  export PSH_URL_REPLACER_TARGET_FILE=$APP_VOLUME/robots.txt
#  export PSH_URL_REPLACER_SRC_URL=$APP_PROD_URL
#  export PSH_URL_REPLACER_TARGET_URL=$APP_SITE_URL
#  export PSH_URL_REPLACER_PROD_ENV=$APP_PROD_ENV
#  node $BODILESS_PSH_DIR/psh-url-replacer.js deploy
  #processing sitemap.xml
  export PSH_URL_REPLACER_TMP_FILE=$PLATFORM_DOCUMENT_ROOT/../static/sitemap_pshtmp.xml
  export PSH_URL_REPLACER_TARGET_FILE=$APP_VOLUME/sitemap.xml
  export PSH_URL_REPLACER_SRC_URL=$APP_PROD_URL
  export PSH_URL_REPLACER_TARGET_URL=$APP_SITE_URL
  export PSH_URL_REPLACER_PROD_ENV=$APP_PROD_ENV
  node $BODILESS_PSH_DIR/psh-url-replacer.js deploy
  # ssi files generation
  export SSI_CONF_PATH=sites/$APP_SITE_DIR_NAME/ssi/ssi_conf.json
  export VOLUME_DIR=$APP_VOLUME
  node $BODILESS_PSH_DIR/generate-ssi-files.js deploy
}

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

invoke "prepare_$1"
invoke "$1"
invoke "finalize_$1"
