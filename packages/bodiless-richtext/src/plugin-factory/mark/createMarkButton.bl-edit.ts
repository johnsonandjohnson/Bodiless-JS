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

import { ComponentType } from 'react';
import { createIsActive, createToggleMark } from './markUtils.bl-edit';
import createPluginButton from '../createPluginButton.bl-edit';
import { EditorButtonProps } from '../../Type';

type CreateMarkButton = (
  markType: string,
  icon: string,
) => ComponentType<EditorButtonProps>;

const createMarkButton: CreateMarkButton = (markType, icon) => createPluginButton({
  icon,
  toggle: createToggleMark(markType),
  isActive: createIsActive(markType),
});

export default createMarkButton;
