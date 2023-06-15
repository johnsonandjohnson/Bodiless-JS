import React from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextApp from '@bodiless/next/lib/NextApp';
import { DM_Sans } from 'next/font/google';

import '../css/style.css';

const dm_sans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif'],
});

export { dm_sans };

interface Props {
  app: JSX.Element;
}

const AppWithStyle: React.FC<Props> = ({ app: App }: Props) => (
  <>
    {App}
    <style type="text/css" suppressHydrationWarning>
      {`.font-DMSans{font-family: ${dm_sans.style.fontFamily}}`}
    </style>
  </>
);

const App = ({ Component, ...rest }: AppProps) => {
  const nextApp = NextApp({ Component, ...rest });
  return (
    <>
      <Head>
        <title>vital-demo-next</title>
        <meta name="description" content="vital demo Next.js" />
      </Head>
      <AppWithStyle app={nextApp} />
    </>
  );
};

export default App;
