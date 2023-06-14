import React, { ReactNode } from 'react';
import { DM_Sans } from 'next/font/google';

const dm_sans = DM_Sans({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif'],
});

export const metadata = {
  title: 'vital-demo-next',
  description: 'vital demo Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let tagManagerScript: ReactNode = null;
  let tagManagerNoScript: ReactNode = null;

  if (process.env.NODE_ENV === 'production') {
    const id = 'GTM-N3M9LLD';
    const dataLayerName = 'globalDataLayer';
    const script = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','${dataLayerName}', '${id}');`;

    tagManagerScript = (
      <script
        key="google-tagmanager-script"
        dangerouslySetInnerHTML={{
          __html: script,
        }}
      />
    );
    tagManagerNoScript = (
      <noscript
        key="google-tagmanager-noscript"
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display: none; visibility: hidden" aria-hidden="true"></iframe>`,
        }}
      />
    );
  }

  return (
    <html lang="en">
      <head>{tagManagerScript}</head>
      <body>
        {tagManagerNoScript}
        {children}
        <style type="text/css" suppressHydrationWarning>
          {`.font-DMSans{font-family: ${dm_sans.style.fontFamily}}`}
        </style>
      </body>
    </html>
  );
}
