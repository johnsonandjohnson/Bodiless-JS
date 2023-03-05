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
  flowHoc,
} from '@bodiless/fclasses';
import { withSidecarNodes, withNodeKey } from '@bodiless/core';
import { vitalColor, vitalTypography } from '@bodiless/vital-elements';
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
  * Token which produces a base editable link & default VitalDS styling.
  */
const Default = asLinkToken({
  /**
     * Makes the link editable. Nodekey must be provided separately.
     * Editor token should be applied after all composed tokens to ensure
     * they have access to props...
     */
  Schema: {
    _: asEditableLink(),
  },
  Theme: {
    _: as(WithDownloadStyles, WithExternalStyles),
    Wrapper: as(vitalTypography.Link),
  },
});

const PrimaryLink = asLinkToken(Default, {
  Theme: {
    Wrapper: 'hover:vital-arrow hover:pr-1 hover:w-6 hover:h-2',
    Body: vitalColor.TextPrimaryInteractiveNoHover,
  },
  Meta: flowHoc.meta.term('Style')('With Hover Arrow'),
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
  Default,
  WithExternalStyles,
  WithDownloadStyles,
  PrimaryLink,
  Sidecar,
};
