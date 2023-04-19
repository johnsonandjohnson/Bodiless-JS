/**
 * Copyright © 2021 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, softwkare
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions andk
 * limitations under the License.kk
 */

import Editable, { withPlaceholder, asEditable } from './Editable.bl-edit';
import type { UseEditableOverrides, EditableData } from './Editable.bl-edit';
import NodeViewer from './NodeViewer';
import withLinkToggle from './LinkToggle';
import asBodilessAnchor from './Anchor/asBodilessAnchor';
import {
  withMeta, withMetaStatic, withMetaHtml, withTitle, withHeadElement, Options as HeadBaseOptions,
  withMetaSiteInfo,
} from './Meta/Meta';
import withMetaForm, { withMetaSnippet } from './Meta/withMetaForm.bl-edit';
import type { FieldType as MetaFormFieldType } from './Meta/types';
import asBodilessHelmet from './Helmet/Helmet';
import { withToggle, withToggleTo, withToggleButton } from './Toggle';
import withEditPlaceholder from './Placeholder';
import asBodilessIframe, {
  asBaseBodilessIframe,
  withoutPointerEvents,
  withIframeFormHeader,
  withIframeFormHeightSnippet,
  withIframeFormSrcSnippet,
  useIframeBodilessOptions,
} from './Iframe';
import type { IframeData, IframeProps } from './Iframe';
import YouTube, {
  asBaseBodilessYouTube,
  asBodilessYouTube,
  withYouTubeFormHeader,
  withYouTubePlayerSettings,
  withYouTubeFormSrcSnippet,
  withYouTubePlayerTransformer,
  useYouTubePlayerAPI,
  withYouTubePlayerAPI,
  ifYouTubePlayerAPILoaded,
  ifNotYouTubePlayerAPILoaded,
  YouTubePlayerAPIProvider,
} from './YouTube';
import type { YouTubePlayerSettings } from './YouTube';
import PageDimensionsProvider, {
  usePageDimensionsContext,
  withPageDimensionsContext,
  BreakpointsType,
} from './PageDimensionsProvider';
import withResponsiveVariants from './withResponsiveVariants';
import withBodilessLinkToggle from './withBodilessLinkToggle';

import withFormHeader from './withFormHeader';
import withFormSnippet from './withFormSnippet';

export {
  withFormHeader,
  withFormSnippet,
  withBodilessLinkToggle,
  Editable,
  NodeViewer,
  withLinkToggle,
  withToggle,
  withToggleTo,
  withToggleButton,
  withPlaceholder,
  asEditable,
  withMeta,
  withTitle,
  withHeadElement,
  withMetaStatic,
  withMetaHtml,
  withMetaSiteInfo,
  asBodilessHelmet,
  withEditPlaceholder,
  asBaseBodilessIframe,
  asBodilessIframe,
  withoutPointerEvents,
  withIframeFormHeader,
  withIframeFormHeightSnippet,
  withIframeFormSrcSnippet,
  useIframeBodilessOptions,
  asBaseBodilessYouTube,
  asBodilessYouTube,
  withYouTubePlayerSettings,
  withYouTubePlayerTransformer,
  withYouTubeFormSrcSnippet,
  withYouTubeFormHeader,
  useYouTubePlayerAPI,
  withYouTubePlayerAPI,
  ifYouTubePlayerAPILoaded,
  ifNotYouTubePlayerAPILoaded,
  YouTubePlayerAPIProvider,
  YouTube,
  PageDimensionsProvider,
  usePageDimensionsContext,
  withPageDimensionsContext,
  BreakpointsType,
  withResponsiveVariants,
  withMetaForm,
  withMetaSnippet,
  asBodilessAnchor,
};

export * from './Chameleon/index';
export * from './Image';
export * from './List';
export * from './Link';
export * from './FileUpload';
export * from './PageDisable';
export * from './Tools';

export type {
  MetaFormFieldType,
  YouTubePlayerSettings,
  IframeData,
  IframeProps,
  HeadBaseOptions,
};

export type {
  UseEditableOverrides,
  EditableData,
};
