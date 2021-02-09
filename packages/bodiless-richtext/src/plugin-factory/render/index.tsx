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
import {
  RenderLeafProps,
  RenderElementProps,
} from '../../Type';

type Props = {
  Component: React.ComponentType<any>,
  type: string,
};

const createElementRenderPlugin = ({
  Component,
  type,
}: Props) => {
  const plugin = {
    type,
    renderElement: ({ attributes, children, element }: RenderElementProps) => {
      const { ref, ...restAttrs } = attributes;
      return <Component {...restAttrs} element={element} forwardRef={ref}>{children}</Component>;
    },
  };
  return plugin;
};

const createLeafRenderPlugin = ({
  Component,
  type,
}: Props) => {
  const plugin = {
    type,
    renderLeaf: ({
      attributes,
      children,
    }: RenderLeafProps) => <Component {...attributes}>{children}</Component>,
  };
  return plugin;
};

export { createElementRenderPlugin, createLeafRenderPlugin };
