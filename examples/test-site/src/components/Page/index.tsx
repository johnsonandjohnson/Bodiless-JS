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

import React, { ComponentType } from 'react';
import { flow } from 'lodash';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { withPageDimensionsContext, BreakpointsType } from '@bodiless/components';
import Helmet from 'react-helmet';

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config';

const getTailwindBreakpoints = (): BreakpointsType => {
  const { theme: { screens } } = resolveConfig(tailwindConfig);
  const breakpoints = { ...screens };

  Object.keys(breakpoints).forEach(key => {
    breakpoints[key] = breakpoints[key].replace(/\D+/g, '');
  });

  return breakpoints;
};

const breakpoints: BreakpointsType = getTailwindBreakpoints();

const asResponsivePage = flow(
  withPageDimensionsContext({ breakpoints }),
)(Page);

const asRtlPage = (PageComponent: ComponentType) => (props: any) => (
  <>
    <PageComponent {...props} />
    <Helmet htmlAttributes={{ dir: 'rtl' }} />
  </>
);

const asLtrPage = (PageComponent: ComponentType) => (props: any) => (
  <>
    <PageComponent {...props} />
    <Helmet htmlAttributes={{ dir: 'ltr' }} />
  </>
);

export default asResponsivePage;
export {
  breakpoints,
  asRtlPage,
  asLtrPage,
};
