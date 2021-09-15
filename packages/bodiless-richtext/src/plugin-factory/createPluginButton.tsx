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

import React, { ComponentType } from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';
import {
  asToken, ComponentOrTag, Token,
} from '@bodiless/fclasses';
import { ToggleProps } from '../Type';
import PluginButton from '../components/PluginButton';
import { withReturnFocusBackOnClick } from '../withReturnFocusBack';

type requiredProps = {
  className?: string,
  children?: any,
};
type Opts = {
  toggle(options: ToggleProps): void;
  isActive(editor: Editor): boolean;
  icon: string;
};

const withToggle = (opts:Opts): Token<{}, requiredProps, { icon: string }> => (
  (Component: ComponentOrTag<any>) => (props: any) => {
    const { toggle, isActive, icon } = opts;
    const { children, className = '' } = props as requiredProps;
    const editor = useSlate();
    const { defaultProps } = Component as ComponentType<any>;
    const componentName = defaultProps ? defaultProps.name : undefined;
    return (
      <Component
        componentName={componentName}
        onMouseDown={() => {
          toggle({
            editor,
          });
        }}
        className={`${
          isActive(editor) ? 'active bl-active' : ''
        } ${className}`}
        icon={icon}
      >
        {children}
      </Component>
    );
  }
);

const createPluginButton = (props: Opts) => asToken(
  withReturnFocusBackOnClick(props.icon),
  withToggle(props),
)(PluginButton);
export default createPluginButton;
export { withToggle };
