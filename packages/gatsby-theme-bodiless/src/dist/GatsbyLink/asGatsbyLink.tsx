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

import React, { ComponentType as CT } from 'react';
import { Link as BaseGatsbyLink } from 'gatsby';
import flow from 'lodash/flow';
import {
  designable,
  stylable,
  withDesign,
  startWith,
  A,
  addProps,
} from '@bodiless/fclasses';
import { ifReadOnly } from '@bodiless/core';


type Components = {
  GatsbyLink: CT<any>,
  Link: CT<any>,
};

/**
 * leveraging logic form gatsby
 */
const isLocalLink = (path: string) =>
  path &&
  !path.startsWith(`http://`) &&
  !path.startsWith(`https://`) &&
  !path.startsWith(`//`);


const asGatsbyLink$ = (Component: CT<any>) => {
  const startComponents: Components = {
    GatsbyLink: BaseGatsbyLink,
    Link: Component,
  };
  const AsGatsbyLink = (props: any) => {
    const { components, href, ...rest } = props;
    const {
      Link,
      GatsbyLink,
    } = components;
    if (!isLocalLink(href)) return <Link {...rest} href={href} />;
    return <GatsbyLink {...rest} to={href} />;
  };
  return designable(startComponents, 'GatsbyLink')(AsGatsbyLink);
};

const asGatsbyLink = flow(
  ifReadOnly(
    withDesign({
      GatsbyLink: stylable,
    }),
    asGatsbyLink$,
  ),
);

const asTestableGatsbyLink = withDesign({
  GatsbyLink: addProps({ 'data-link-type': 'gatsby-link' }),
  Link: addProps({ 'data-link-type': 'plain-link' }),
});

const GatsbyLink = asGatsbyLink(A);
const startWithGatsbyLink = startWith(GatsbyLink);

export {
  GatsbyLink,
  asGatsbyLink,
  startWithGatsbyLink,
  asTestableGatsbyLink,
};
