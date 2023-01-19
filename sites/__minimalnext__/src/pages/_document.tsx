import React from 'react';
import {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document';
import { Helmet } from 'react-helmet';

export default function Document() {
  const helmet = Helmet.renderStatic();
  const helmetComponents = [
    helmet.link.toComponent(),
    helmet.meta.toComponent(),
    helmet.noscript.toComponent(),
    helmet.script.toComponent(),
    helmet.style.toComponent(),
    helmet.base.toComponent(),
  ];

  return (
    <Html {...helmet.htmlAttributes.toComponent()}>
      <Head>
        {helmetComponents}
      </Head>
      <body {...helmet.bodyAttributes.toComponent()}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
