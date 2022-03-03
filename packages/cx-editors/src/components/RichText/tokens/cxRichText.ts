import {
  replaceWith,
  P,
  HOC,
  flowHoc,
  as,
  addProps,
  H4,
  H5,
  startWith,
} from '@bodiless/fclasses';
import {
  asBlock,
  createLinkDeserializer,
  withHtmlDeserializer,
  asPreview,
  withBoldMeta,
  withUnderlineMeta,
  withSuperScriptMeta,
  withHeader1Meta,
  withHeader2Meta,
  withHeader3Meta,
  withHeader4Meta,
  withHeader5Meta,
} from '@bodiless/richtext';
import {
  DefaultNormalHref,
} from '@bodiless/components';
import { ifComponentSelector } from '@bodiless/layouts';
import { asCxTokenSpec, cxElement } from '@bodiless/cx-elements';
import { LinkClean, cxLink } from '@bodiless/cx-link';

const withLinkDeserializer = withHtmlDeserializer(
  createLinkDeserializer({
    normalizeHref: ((href: string) => (
      new DefaultNormalHref(href).toString()
    )) as any,
  }),
) as HOC;

const AsFlowContainerItem = asCxTokenSpec()({
  Core: {
    _: as(
      ifComponentSelector(asPreview),
    ),
  },
  Meta: flowHoc.meta.term('Type')('Text Editor'),
});

// QUESTION -- I had to bring in the definitions to get right order as () didn't work.
const Default = asCxTokenSpec()({
  Core: {
    paragraph: as(replaceWith(P), asBlock as HOC),
    Bold: withBoldMeta,
    Underline: withUnderlineMeta,
    Link: replaceWith(LinkClean),
    SuperScript: withSuperScriptMeta,
    H1: withHeader1Meta,
    H2: withHeader2Meta,
    H3: withHeader3Meta,
    H4: as(
      startWith(H4),
      withHeader4Meta,
    ),
    H5: as(
      startWith(H5),
      withHeader5Meta,
    ),
  },
  Content: {
    _: addProps({ placeholder: 'Placeholder' }),
  },
  Components: {
    paragraph: cxElement.Body,
    Bold: cxElement.Bold,
    Underline: cxElement.Underline,
    SuperScript: cxElement.Superscript,
    H1: cxElement.H1,
    H2: cxElement.H2,
    H3: cxElement.H3,
    H4: cxElement.H4,
    H5: cxElement.H5,
    Link: cxLink.Default,
  },
  Behavior: {
    Link: withLinkDeserializer,
  },
  Compose: {
    AsFlowContainerItem,
  },
});

export default { Default, AsFlowContainerItem };
