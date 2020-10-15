/**
 * Copyright © 2020 Johnson & Johnson
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

import React, { ComponentType, HTMLProps } from 'react';
import MaterialIcon from '@material/react-material-icon';
import { Button } from '@bodiless/fclasses';
import { useUI } from '../RichTextContext';

const DefaultPluginButton = Button;

type uiIndexType = {
  [index: string]: any;
};

type Props = {
  componentName?: string;
  icon: string;
} & HTMLProps<HTMLButtonElement>;

const PluginButton: ComponentType<Props> = props => {
  const {
    componentName,
    icon,
    children,
    ...rest
  } = props;

  // Workaround to get styled component from UI if it exists with fallback to original Component.
  const completeUI: uiIndexType = useUI();
  let StyledComponent;
  if (componentName && completeUI[componentName]) {
    StyledComponent = completeUI[componentName];
  } else {
    StyledComponent = DefaultPluginButton;
  }

  return (
    <StyledComponent {...rest}>
      {children || <MaterialIcon className="bl-material-icons" icon={icon} />}
    </StyledComponent>
  );
};

export default PluginButton;
