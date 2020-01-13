/**
 * Copyright © 2019 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const express = require('express');
const Backend = require('./backend');

// Use the same .env file as gatsby develop.
require('dotenv').config({
  path: '.env.development',
});

const backendPort = process.env.BODILESS_BACKEND_PORT || 8001;

const backend = new Backend(express());
backend.start(backendPort);
