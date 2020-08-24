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
import { Value } from 'slate';
import {
  EditorContext,
  ToggleProps,
} from '../Type';
import { useSlateContext } from '../core';
import PluginButton from '../components/PluginButton';

const defaultButton = {
  defaultProps: {
    name: 'Button',
    type: 'button',
  },
};

type requiredProps = {
  className?: string,
  children?: any,
};
type Opts = {
  toggle(options: ToggleProps): void;
  isActive(value: Value): boolean;
  icon: string;
};

const withToggle = <P extends requiredProps> (opts:Opts) => (
  (Component:any) => (props:P) => {
    const { toggle, isActive, icon } = opts;
    const { children, className = '' } = props;
    const editorContext: EditorContext = useSlateContext();
    const componentName = Component.defaultProps ? Component.defaultProps.name : undefined;
    return (
      <PluginButton
        componentName={componentName}
        onMouseDown={
          () => toggle({
            editor: editorContext!.editor,
            value: editorContext!.value,
          })
        }
        className={`${
          isActive(editorContext!.value) ? 'active bl-active' : ''
        } ${className}`}
        icon={icon}
      >
        {children}
      </PluginButton>
    );
  }
);

const createPluginButton = (props:Opts) => withToggle(props)(defaultButton);
export default createPluginButton;
export { withToggle };
