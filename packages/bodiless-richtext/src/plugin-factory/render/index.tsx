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

import React from 'react';
import { Plugin, RenderNodeProps } from 'slate-react';

type Props<P> = {
  Component: React.ComponentType<P>,
  type: string,
};
const createNodeRenderPlugin = <P extends object> ({
  Component,
  type,
}:Props<P>) => {
  const plugin: Plugin = {
    renderNode: (props, editor, next) => {
      switch (props.node.type) {
        case type:
          return <Component {...props as P & RenderNodeProps} />;
        default:
          return next();
      }
    },
  };
  return plugin;
};
const createMarkRenderPlugin = <P extends object> ({
  Component,
  type,
}:Props<P>) => {
  const plugin: Plugin = {
    renderMark: (props, editor, next) => {
      switch (props.mark.type) {
        case type:
          return <Component {...props as unknown as P & RenderNodeProps} />;
        default:
          return next();
      }
    },
  };
  return plugin;
};
export { createNodeRenderPlugin, createMarkRenderPlugin };
