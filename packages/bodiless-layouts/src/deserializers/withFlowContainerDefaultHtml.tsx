/**
 * Copyright © 2021 Johnson & Johnson
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

/* eslint-disable import/prefer-default-export */

import React, { ComponentType } from 'react';
import { withDefaultContent } from '@bodiless/core';
import flow from 'lodash/flow';
import { deserializeHtml } from './htmlDeserializer';
import type { Deserializer } from './htmlDeserializer';

const withFlowContainerDefaultHtml = (deserializers: Deserializer[], html?: string) => {
  const withFlowContainerDefaultHtml$ = (Component: ComponentType<any>) => (props: any) => {
    const { html: htmlFromProps, ...rest } = props;
    const html$ = htmlFromProps || html;
    const content = deserializeHtml(html$, deserializers);
    return <Component content={content} {...rest} />;
  };
  return flow(
    withDefaultContent({}),
    withFlowContainerDefaultHtml$,
  );
};

export { withFlowContainerDefaultHtml };
