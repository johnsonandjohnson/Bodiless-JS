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

import { withSidecarNodes, withNodeKey } from '@bodiless/core';
import { vitalLinkCore, asLinkToken } from '@bodiless/vital-link-core';
import { asEditableLink } from '../util';

/**
  * Token which produces a base editable link.
  */
const WithBodilessEditor = asLinkToken({
  /**
     * Makes the link editable. Nodekey must be provided separately.
     * Editor token should be applied after all composed tokens to ensure
     * they have access to props...
     */
  Schema: {
    _: asEditableLink(),
  },
});

const Default = asLinkToken(
  vitalLinkCore.Base,
  WithBodilessEditor
);

const Sidecar = asLinkToken({
  ...Default,
  Schema: {
    _: withSidecarNodes(
      withNodeKey('link'),
      asEditableLink(),
    ),
  },
});

const vitalLink = {
  ...vitalLinkCore,
  Default,
  WithBodilessEditor,
  Sidecar,
};

export default vitalLink;
