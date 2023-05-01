import React from 'react';
import type { AppProps } from 'next/app';
import { Helmet } from 'react-helmet';
import '../css/style.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet" type="text/css" />
        <Component {...pageProps} />
      </Helmet>
    </>
  );
}

export default App;
