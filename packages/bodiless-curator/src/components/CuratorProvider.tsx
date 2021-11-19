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

import { useEditContext } from '@bodiless/core';
import React, { ComponentType, useEffect, useState } from 'react';
import CuratorContext from './CuratorContext';
declare global {
  interface Window {
    /**
     * Curator calls this function when the page has finished downloading the
     * JavaScript for the API.
     */
    onCuratorReady: Function;
  }
}

const CuratorProvider: ComponentType<any> = ({
  scriptFunction,
  children,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { isEdit } = useEditContext();

  useEffect(() => {
    if (!isEdit) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = scriptFunction;
      document.getElementsByTagName('body')[0].appendChild(script);
    }
  });

  useEffect(() => {
    window.onCuratorReady = () => {
      setIsLoaded(true);
    };
  });

  return (
    <CuratorContext.Provider value={{ isLoaded }}>
      {children}
    </CuratorContext.Provider>
  );
};

export default CuratorProvider;
