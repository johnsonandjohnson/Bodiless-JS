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

// Offered as simplistic non-editable for tutorial purposes.
// This file can be deleted if you are using footer.tsx.
import React, { FC, ComponentType, HTMLProps } from 'react';
import {
  designable,
  DesignableComponentsProps,
  DesignableProps,
  Div,
} from '@bodiless/fclasses';

type FooterComponents = {
  Wrapper: ComponentType<any>,
  Container: ComponentType<any>,
};

export type Props = DesignableComponentsProps<FooterComponents> & HTMLProps<HTMLElement>;

const footerComponents:FooterComponents = {
  Wrapper: Div,
  Container: Div,
};

const FooterClean: FC<DesignableProps> = ({ components }) => {
  const {
    Wrapper,
    Container,
  } = components;

  return (
    <Wrapper>
      <Container>
        <div className="container mx-auto py-3">
          <p>
            © Copyright 2020 Johnson &amp; Johnson
          </p>
        </div>
      </Container>
    </Wrapper>
  );
};

const Footer = designable(footerComponents, 'Footer')(FooterClean);
export default Footer;
