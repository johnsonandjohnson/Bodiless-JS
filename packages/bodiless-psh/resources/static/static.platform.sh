if [ -f static.platform.custom.sh ]; then
  source static.platform.custom.sh
fi

default_prepare_build () {
  npm ci
}

default_build () {
  npm run build
}

default_finalize_build () {
  #robots.txt preparation
  export PSH_URL_REPLACER_SRC_FILE=$PLATFORM_DOCUMENT_ROOT/robots.txt
  export PSH_URL_REPLACER_TMP_FILE=$PLATFORM_DOCUMENT_ROOT/../static/robots_pshtmp.txt
  export PSH_URL_REPLACER_TARGET_FILE=$APP_VOLUME/robots.txt
  node $PLATFORM_APP_DIR/node_modules/@bodiless/psh/lib/psh-url-replacer.js build
  #sitemap.xml preparation
  export PSH_URL_REPLACER_SRC_FILE=$PLATFORM_DOCUMENT_ROOT/sitemap.xml
  export PSH_URL_REPLACER_TMP_FILE=$PLATFORM_DOCUMENT_ROOT/../static/sitemap_pshtmp.xml
  export PSH_URL_REPLACER_TARGET_FILE=$APP_VOLUME/sitemap.xml
  node $PLATFORM_APP_DIR/node_modules/@bodiless/psh/lib/psh-url-replacer.js build
  # ssi preparation
  export SSI_CONF=ssi/ssi_conf.json
  export DOCUMENT_ROOT=$PLATFORM_DOCUMENT_ROOT
  export VOLUME_DIR=$APP_VOLUME
  node $PLATFORM_APP_DIR/node_modules/@bodiless/psh/lib/generate-ssi-files.js build
}

default_deploy () {
  #processing site url
  APP_SITE_URL=$(echo $APP_SITE_URL | sed -e "s/\${PLATFORM_ENVIRONMENT}/$PLATFORM_ENVIRONMENT/g")
  APP_SITE_URL=$(echo $APP_SITE_URL | sed -e "s/\${PLATFORM_PROJECT}/$PLATFORM_PROJECT/g")
  #processing robots.txt
  export PSH_URL_REPLACER_TMP_FILE=$PLATFORM_DOCUMENT_ROOT/../static/robots_pshtmp.txt
  export PSH_URL_REPLACER_TARGET_FILE=$APP_VOLUME/robots.txt
  export PSH_URL_REPLACER_SRC_URL=$APP_PROD_URL
  export PSH_URL_REPLACER_TARGET_URL=$APP_SITE_URL
  export PSH_URL_REPLACER_PROD_ENV=$APP_PROD_ENV
  node $PLATFORM_APP_DIR/node_modules/@bodiless/psh/lib/psh-url-replacer.js deploy
  #processing sitemap.xml
  export PSH_URL_REPLACER_TMP_FILE=$PLATFORM_DOCUMENT_ROOT/../static/sitemap_pshtmp.xml
  export PSH_URL_REPLACER_TARGET_FILE=$APP_VOLUME/sitemap.xml
  export PSH_URL_REPLACER_SRC_URL=$APP_PROD_URL
  export PSH_URL_REPLACER_TARGET_URL=$APP_SITE_URL
  export PSH_URL_REPLACER_PROD_ENV=$APP_PROD_ENV
  node $PLATFORM_APP_DIR/node_modules/@bodiless/psh/lib/psh-url-replacer.js deploy
  # ssi files generation
  export SSI_CONF=ssi/ssi_conf.json
  export VOLUME_DIR=$APP_VOLUME
  node $PLATFORM_APP_DIR/node_modules/@bodiless/psh/lib/generate-ssi-files.js deploy
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
