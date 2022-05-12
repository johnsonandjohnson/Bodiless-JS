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
