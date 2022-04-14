/**
 * Copyright © 2022 Johnson & Johnson
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

import {
  Span,
  addClassesIf,
  addProps,
  addPropsIf,
  as,
  flowIf,
  on,
  replaceWith,
  startWith,
  withProps,
} from '@bodiless/fclasses';
import { withSidecarNodes, withNodeKey } from '@bodiless/core';
import { vitalColor, vitalTextDecoration, vitalTypography } from '@bodiless/vital-elements';
import { asLinkToken } from '../LinkClean';
import { useExternalLinkToggle, asEditableLink, useIsDownloadLink } from '../util';
import { CartIcon } from '../assets/CartIcon';

/**
   * Token which causes link to display as an external link.
   */
const WithExternalStyles = asLinkToken({
  Flow: flowIf(useExternalLinkToggle),
  Core: {
    ExternalSRText: on(Span)(
      'sr-only',
      addProps({
        children: 'Open link in new window',
      }),
    ),
  },
  Behavior: {
    Wrapper: addProps({
      target: '_blank',
      rel: 'noopener noreferrer',
    }),
  },
  Theme: {
    Wrapper: 'vital-external-link',
  },
});

const WithDownloadStyles = asLinkToken({
  Core: {
    Wrapper: as(
      addClassesIf(useIsDownloadLink())('vital-download-link'),
      addPropsIf(useIsDownloadLink())({ target: '_blank', rel: 'noopener noreferrer' }),
    ),
  },
});

/**
   * Token which produces a default VitalDS editable link.
   */
const Default = asLinkToken({
  /**
     * VitalDS typography and colors.
     */
  Theme: {
    _: as(WithDownloadStyles, WithExternalStyles),
    Wrapper: as(vitalTypography.Link),
  },
  /**
     * Makes the link editable. Nodekey must be provided separately.
     * Editor token should be applied after all composed tokens to ensure
     * they have access to props...
     */
  Schema: {
    _: asEditableLink(),
  },
});

const Sidecar = asLinkToken({
  ...Default,
  Schema: {
    _: withSidecarNodes(
      withNodeKey('link'),
      asEditableLink(),
    ),
  },
});

const WhereToBuy = asLinkToken({
  Components: {
    Icon: startWith(CartIcon),
  },
  Layout: {
    Wrapper: 'w-full flex justify-center items-center max-w-64 h-12 lg:w-48',
  },
  Spacing: {
    Wrapper: 'mx-auto p-3',
    Icon: 'mr-3',
  },
  Theme: {
    Wrapper: as(
      vitalColor.BgPrimaryInteractive,
      vitalColor.TextPrimaryFooterCopy,
      vitalTextDecoration.Bold,
      vitalTextDecoration.Uppercase,
      // @TODO: Create token? It should be same size for both mobile and desktop...
      'text-m-base',
      'rounded',
    ),
    Icon: 'w-6 h-6',
    Body: 'leading',
  },
  Content: {
    _: withProps({
      children: 'Where to Buy',
    }),
    Wrapper: withProps({
      href: '/where-to-buy',
    }),
  },
});

/**
 * Token that provides the Where To Buy button without an icon.
 */
const WhereToBuyWithoutIcon = asLinkToken({
  ...WhereToBuy,
  Components: {
    Icon: replaceWith(() => null),
  },
});

export default {
  Default,
  WithExternalStyles,
  WithDownloadStyles,
  Sidecar,
  WhereToBuy,
  WhereToBuyWithoutIcon,
};
