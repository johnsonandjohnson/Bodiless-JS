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

import React, { FC } from 'react';
import { Link } from 'gatsby';
import { flow } from 'lodash';
import {
  applyDesign,
  addClasses,
  withDesign,
  DesignableProps,
  Div,
} from '@bodiless/fclasses';
import {
  asPageContainer,
  asHeader1,
  asPrimaryColorBackground,
} from '../Elements.token';

const getHeaderComponents = applyDesign({
  Wrapper: Div,
  Container: Div,
  SiteReturn: Div,
  Menu: Div,
});
const Header: FC<DesignableProps> = ({ design, siteLogo }) => {
  const {
    Wrapper,
    Container,
    SiteReturn,
    Menu,
  } = getHeaderComponents(design);

  return (
    <Wrapper>
      <Container>
        <SiteReturn>
          <Link to="/">
            <img src={siteLogo} className="h-16" alt="Return To Home" />
          </Link>
        </SiteReturn>
        <Menu />
      </Container>
    </Wrapper>
  );
};
const asSiteHeader = withDesign({
  Wrapper: flow(asPrimaryColorBackground, addClasses('')),
  Container: flow(asPageContainer, addClasses('flex min-h-16 items-end')),
  SiteReturn: flow(asHeader1, addClasses('flex-shrink')),
});
export default asSiteHeader(Header);
