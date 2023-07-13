#!/bin/bash
echo Postinstall on $(date) $(pwd)

echo patch-package
npm run patch-package

echo Building package...
npm run build:packages
