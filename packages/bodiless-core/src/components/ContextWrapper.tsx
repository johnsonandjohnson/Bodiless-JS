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

import React, { FC, HTMLProps } from 'react';
import { observer } from 'mobx-react-lite';
import { withoutProps } from '@bodiless/fclasses';
import { useContextActivator, useEditContext } from '../hooks';
import { Props } from '../Types/ContextWrapperTypes';

const DefaultDiv = withoutProps(['isActive'])<HTMLProps<HTMLDivElement>>('div');

const ContextWrapper: FC<Props> = ({
  ui,
  clickable,
  children,
  onClick,
  ...rest
}) => {
  const Div = (ui && ui.ContextWrapper) || DefaultDiv;
  // @TODO - Determine why isActive is not getting stripped from the contextwrpper div.
  const { isActive } = useEditContext();
  const isActiveFinal = typeof Div === 'string' ? undefined : isActive;
  const clickHandler = clickable
    ? useContextActivator('onClick', onClick)
    : { onClick };
  return (
    <Div
      isActive={isActiveFinal}
      {...clickHandler}
      {...rest}
    >
      {children}
    </Div>
  );
};

export default observer(ContextWrapper);
