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

import React from 'react';
import { withoutProps } from '@bodiless/core';
import {
  flowIf,
  hasProp,
  addProps,
  replaceWith,
} from '@bodiless/fclasses';
import { getUI } from './RichTextContext';
import withDefaults from './withDefaults';
import PluginButton from './components/PluginButton';
import type { RichTextProps } from './Type';

const BaseRichTextPreview = <P extends object>(props: P & RichTextProps) => {
  const { components, ui } = props;
  const finalComponents = withDefaults(components);
  const { PreviewWrapper } = getUI(ui);
  return (
    <PreviewWrapper>
      {
        Object.values(finalComponents)
          // eslint-disable-next-line react/no-array-index-key
          .map((C, i) => C.hoverButton && <PluginButton key={i} icon={C.hoverButton.icon} componentName="Button" />)
      }
    </PreviewWrapper>
  );
};

const asPreview = addProps({
  preview: 1,
});

const withPreview = flowIf(hasProp('preview'))(
  withoutProps(['preview']),
  replaceWith(BaseRichTextPreview),
);

export {
  withPreview,
  asPreview,
};
