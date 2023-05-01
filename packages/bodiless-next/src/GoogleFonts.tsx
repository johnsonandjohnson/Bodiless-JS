/**
 * Copyright © 2023 Johnson & Johnson
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
import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

/**
 * Conditionally load Google fonts used by Bodiless.
 */
const GoogleFonts: FC = () => (
  (process.env.NODE_ENV === 'development' || process.env.GOOGLE_FONTS_ENABLED === '1') ? (
    <Helmet>
      <link href="https://fonts.googleapis.com/css2?family=Material+Icons&display=swap" rel="stylesheet" type="text/css" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" type="text/css" />
    </Helmet>
  ) : (
    <></>
  )
);
export default GoogleFonts;
