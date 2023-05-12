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
import { useRouter } from 'next/router';

const CanonicalURL: FC = () => {
  const siteUrl = process.env.SITE_URL || '';
  const router = useRouter();
  const cleanPath = router.asPath;
  const canonicalUrl = `${siteUrl}${router.asPath === '/' ? '' : cleanPath}`;

  return (
    <Helmet>
      <link
        key={canonicalUrl}
        rel="canonical"
        href={canonicalUrl}
      />
    </Helmet>
  );
};

export default CanonicalURL;
