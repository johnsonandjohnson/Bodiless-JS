#!/bin/bash
echo Postinstall on $(date) $(pwd)

echo patch-package
npm run patch-package

echo Building env vars...
npm run build:env-vars --workspace @sites/${APP_SITE_NAME:-test-site}

echo Building package...
npm run build:packages
