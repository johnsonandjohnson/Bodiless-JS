import React from 'react';
import { Document } from '@bodiless/next';

const documentProps: any = {
  PreBody: null,
  PostHead: null,
};
if (process.env.NODE_ENV === 'production') {
  const id = 'GTM-N3M9LLD';
  const dataLayerName = 'globalDataLayer';
  const script = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','${dataLayerName}', '${id}');`;

  documentProps.PostHead = (
    <script
      key="google-tagmanager-script"
      dangerouslySetInnerHTML={{
        __html: script,
      }}
    />
  );
  documentProps.PreBody = (
    <noscript
      key="google-tagmanager-noscript"
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${id}" height="0" width="0" style="display: none; visibility: hidden" aria-hidden="true"></iframe>`,
      }}
    />
  );
}

export default Document(documentProps);
