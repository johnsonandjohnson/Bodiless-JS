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
import { observer } from 'mobx-react-lite';
import useNodeStateHandlers from './useNodeStateHandlers';
import type { RichTextProps } from './Type';
import useInitialValue from './useInitialValue';

const withNodeStateHandlers = (Component: ComponentType<RichTextProps>) => (
  observer(({ initialValue, onChange: originalOnChange, ...rest }: RichTextProps) => {
    const initialValue$ = useInitialValue(initialValue);
    const { value, onChange } = useNodeStateHandlers({
      initialValue: initialValue$,
      onChange: originalOnChange,
    });

    const finalEditorProps: RichTextProps = {
      ...rest,
      value,
      onChange,
    };

    return <Component {...finalEditorProps} />;
  })
);

export default withNodeStateHandlers;
