/**
 * Copyright © 2020 Johnson & Johnson
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

import React from 'react';
import { Link } from 'gatsby';

const NotFoundPage = () => (
  <>
    <h1>Page Not Found</h1>
    <p>The requested page could not be found.</p>
    <p>
      <Link to="/" style={{ color: 'blue' }}>
        {' '}
        Go to homepage.
      </Link>
    </p>
  </>
);

export default NotFoundPage;
