# Clean Components

Although you may never need to write your own clean component (Vital provides a great
startign point), it will be useful to understand how they are constructed.  So let's
re-create the core Vital `Link` component.

```
import React from 'react';
import type { FC } from 'react';
import {
  A, Span, Fragment, designable,
} from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import type { ComponentOrTag, DesignableComponentsProps } from '@bodiless/fclasses';

export type LinkComponents = {
  Wrapper: ComponentOrTag<any>,
  Icon: ComponentOrTag<any>,
  Body: ComponentOrTag<any>,
  ExternalSRText: ComponentOrTag<any>,
};

export type LinkBaseProps = DesignableComponentsProps<LinkComponents>;

const linkComponents: LinkComponents = {
  Wrapper: A,
  Icon: Fragment,
  Body: Span,
  ExternalSRText: Fragment,
};

const LinkBase: FC<LinkBaseProps> = ({ components: C, children, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.ExternalSRText />
    <C.Icon />
    {children
      ? <C.Body>{children}</C.Body>
      : <C.Body />}
    <C.Body>
      {children}
    </C.Body>
  </C.Wrapper>
);

const asLinkToken = asVitalTokenSpec<LinkComponents>();

const LinkClean = designable(linkComponents, 'Link')(LinkBase);
const LinkStatic = withoutHydrationInline()(LinkClean);

export default LinkClean;
export { asLinkToken, LinkStatic };


> TBD

[Next: Your first token](YourFirstToken.md)