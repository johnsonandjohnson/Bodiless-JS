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
  addProps, Span, addPropsIf, flowIf, as, on, addClassesIf
} from '@bodiless/fclasses';
import { withSidecarNodes, withNodeKey } from '@bodiless/core';
import { cxTypography } from '@bodiless/cx-elements';
import { asLinkToken } from '../LinkClean';
import { useExternalLinkToggle, asEditableLink, useIsDownloadLink } from '../util';

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
    Wrapper: 'cx-external-link',
  },
});

const WithDownloadStyles = asLinkToken({
  Core: {
    Wrapper: as(
      addClassesIf(useIsDownloadLink())('cx-download-link'),
      addPropsIf(useIsDownloadLink())({ target: '_blank', rel: 'noopener noreferrer' }),
    ),
  },
});

/**
   * Token which produces a default canvasx editable link.
   */
const Default = asLinkToken({
  /**
     * Canvasx typography and colors.
     */
  Theme: {
    _: as(WithDownloadStyles, WithExternalStyles),
    Wrapper: as(cxTypography.Link),
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

export default {
  Default, WithExternalStyles, WithDownloadStyles, Sidecar,
};
