// Type of the data used by this component.
import { HTMLProps } from 'react';
import { AsBodiless, UseBodilessOverrides } from '@bodiless/core';
import { HrefNormalizer } from './NormalHref';

export type LinkData = {
  href: string;
};

export type Props = HTMLProps<HTMLAnchorElement> & {
  unwrap?: () => void,
};

export type ExtraLinkOptions = {
  normalizeHref: HrefNormalizer,
  instructions?: string,
};

export type UseLinkOverrides = UseBodilessOverrides<Props, LinkData, ExtraLinkOptions>;

export type AsBodilessLink = AsBodiless<Props, LinkData, ExtraLinkOptions>;
