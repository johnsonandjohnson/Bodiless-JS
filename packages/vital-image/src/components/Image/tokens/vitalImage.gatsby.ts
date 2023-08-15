/**
 * Copyright © 2023 Johnson & Johnson
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
export { default as withImageClientLoader } from 'lodash/identity';

export {
  GatsbyImagePresets as ImagePresets,
  withoutGatsbyImageProps as withoutImageProps,
  asGatsbyImage as asImage,
  withGatsbyImageLogger as withImageLogger,
  withGatsbyImageNode as withImageNode,
} from '@bodiless/gatsby-theme-bodiless';
