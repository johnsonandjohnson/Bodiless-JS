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

import React, { FC } from 'react';

import PageEditContext from '../PageEditContext';
import { PageEditContextInterface } from '../PageEditContext/types';

class StaticContext implements PageEditContextInterface {
  isActive = false;

  isInnermost = false;

  hasLocalMenu = false;

  activate = () => undefined;

  refresh = () => undefined;

  isEdit = false;

  toggleEdit = () => undefined;

  isPositionToggled = false;

  togglePosition = () => undefined;

  contextMenuOptions = [];

  name = 'Static';

  id = 'static';

  isInnermostLocalMenu = false;

  pageOverlay = {
    data: {},
    timeoutId: 0,
  };

  getMenuOptions = () => [];

  showPageOverlay = () => undefined;

  hidePageOverlay = () => undefined;

  showError = () => undefined;

  // Normally spawn returns a new context instance, but in a static page there is only a single
  // constext, so we just return ourselves.
  spawn = (): PageEditContextInterface => this;
}

const staticContext = new StaticContext();

const StaticPage: FC = ({ children }) => (
  <PageEditContext.Provider value={staticContext}>
    {children}
  </PageEditContext.Provider>
);

export default StaticPage;
