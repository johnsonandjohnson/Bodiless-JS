/**
 * Copyright © 2022 Johnson & Johnson
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
import { HOC } from '@bodiless/fclasses';
import { withoutHydration } from './withoutHydration';

export const staticToken: HOC = Component => props => {
  console.log('staticToken >>>>>>>>>>>>>>');
  return <Component {...props} />;
};

export const staticHOC = staticToken;

export const staticTokenCollection = new Proxy({}, {
  get: () => staticToken,
});

export const StaticBlock = withoutHydration()(() => null);
export const StaticInline = withoutHydration({ WrapperElement: 'span' })(() => null);

export const staticFunction = (func: Function) => (...args: any) => func(args);
