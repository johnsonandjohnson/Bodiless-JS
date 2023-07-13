#!/bin/bash
echo Postinstall on $(date) $(pwd)

echo 'before build'
find packages -type d

echo patch-package
npm run patch-package

echo Building package...
npm run build:packages

echo 'after build'
find packages -type d
