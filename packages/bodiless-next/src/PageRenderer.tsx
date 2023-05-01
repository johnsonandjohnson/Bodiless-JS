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

/**
 * Page renderer which handle the different generated pages.
 * E.g. If the props contains the redirect path, it generates the redirect meta.
 */
const PageRenderer: FC = ({Component, ...rest} :any) => {
  const { redirect = [] } = rest;
  if (redirect.length) {
    const content = `0; URL='${redirect[0].toPath}'`;
    return (
      <meta httpEquiv="refresh" content={content} />
    );
  }
  return (
    <Component {...rest} />
  );
};

export default PageRenderer;
