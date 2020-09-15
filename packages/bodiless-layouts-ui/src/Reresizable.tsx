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
import CleanReresizable, { ResizableProps } from 're-resizable';

const Reresizable: FC<ResizableProps & { isEnabled?: boolean }> = ({ isEnabled, ...rest }) => {
  const borderClass = 'bl-border-2 bl-border-dashed hover:bl-border-primary';
  const activeClass = isEnabled ? 'bl-active bl-border-primary' : 'bl-border-transparent';
  const { className } = rest;

  return (
    <CleanReresizable
      {...rest}
      className={`bl-resizable bl-relative ${activeClass} ${borderClass} ${className}`}
    />
  );
};

export default Reresizable;
