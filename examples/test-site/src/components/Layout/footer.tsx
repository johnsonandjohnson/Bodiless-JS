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

import React, { FC, ComponentType, HTMLProps } from 'react';
import { flow } from 'lodash';
import {
  designable,
  DesignableComponentsProps,
  DesignableProps,
  Div,
  P,
  Span,
  withDesign,
} from '@bodiless/fclasses';
import { asEditable } from '../Elements.token';

const today = new Date();
const date = new Intl.DateTimeFormat().format(today);
const year = new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(today);

type FooterComponents = {
  Wrapper: ComponentType<any>,
  Container: ComponentType<any>,
  SiteTitleCopyright: ComponentType<any>,
  SiteTitleCopyrightEditable: ComponentType<any>,
  SiteCopyright: ComponentType<any>,
  SiteCopyrightEditable: ComponentType<any>,
};

export type Props = DesignableComponentsProps<FooterComponents> & HTMLProps<HTMLElement>;

const footerComponents:FooterComponents = {
  Wrapper: Div,
  Container: Div,
  SiteTitleCopyright: P,
  SiteTitleCopyrightEditable: Span,
  SiteCopyright: P,
  SiteCopyrightEditable: Span,
};

const FooterClean: FC<DesignableProps> = ({ components }) => {
  const {
    Wrapper,
    Container,
    SiteTitleCopyright,
    SiteTitleCopyrightEditable,
    SiteCopyright,
    SiteCopyrightEditable,
  } = components;

  return (
    <Wrapper>
      <Container>
        <SiteTitleCopyright>
          ©
          <SiteTitleCopyrightEditable />
          &nbsp;2019-
          {year}
        </SiteTitleCopyright>
        <SiteCopyright>
          <SiteCopyrightEditable />
          &nbsp;Last Updated:&nbsp;
          {date}
        </SiteCopyright>
      </Container>
    </Wrapper>
  );
};

const asFooterHeader = flow(
  designable(footerComponents, 'Footer'),
  withDesign({
    SiteTitleCopyrightEditable: asEditable({ nodeKey: 'sitetitle', nodeCollection: 'site' }, 'Insert Site Title', 'site'),
    SiteCopyrightEditable: asEditable({ nodeKey: 'copyright', nodeCollection: 'site' }, 'Insert Copyright', 'site'),
  }),
);

const Footer = asFooterHeader(FooterClean);
export default Footer;
