import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  const viewport = (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
    </Head>
  );

  // In case of edit, we need to render an empty page and force react to rerender on hydration.
  // This is required because we cannot know the state of the client, edit active or not
  // SSG will always generate the HTML for edit inactive.
  if (process.env.NODE_ENV === 'development') {
    const [isClient, setClient] = useState(false);
    useEffect(() => {
      setClient(typeof window !== 'undefined');
    });

    return (
      <>
        { isClient && <Component {...pageProps} /> }
      </>
    );
  }
  return (
    <>
      {viewport}
      <Component {...pageProps} />
    </>
  );
};

export default App;
