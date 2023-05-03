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

import ContextMenu from './ContextMenu';
import ContextWrapper from './ContextWrapper';
import LocalContextMenu from './LocalContextMenu.bl-edit';
import PageEditor from './PageEditor';
import StaticPage from './StaticPage';
import PageOverlay from './PageOverlay';
import ContextMenuProvider, { getUI } from './ContextMenuContext.bl-edit';
import type {
  IContextMenuProps as ContextMenuProps,
  ButtonVariantProps,
  ContextMenuUI,
} from '../Types/ContextMenuTypes';
import type { Props as ContextWrapperProps } from '../Types/ContextWrapperTypes';
import ReactTagsField, { TagType, BodilessTag } from './ReactTagsField';
import type { ReactTagsFieldProps } from './ReactTagsField';

export {
  ContextMenu,
  ContextMenuProvider,
  getUI,
  ContextWrapper,
  LocalContextMenu,
  PageEditor,
  StaticPage,
  PageOverlay,
  ReactTagsField,
  BodilessTag,
  TagType,
};

export type {
  ContextMenuProps,
  ContextMenuUI,
  ButtonVariantProps,
  ContextWrapperProps,
  ReactTagsFieldProps,
};
