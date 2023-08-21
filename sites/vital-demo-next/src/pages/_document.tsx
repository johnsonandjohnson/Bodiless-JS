import React from 'react';
import { Document } from '@bodiless/next';
import { generateGTMScript, generateGTMNoScript } from '@bodiless/ga4';

const documentProps = {
  PreBody: null,
  PostHead: null,
};
if (process.env.NODE_ENV === 'production') {
  const id = process.env.GTM_ID || 'GTM-XXXXXX';
  const dataLayerName = process.env.GTM_DATA_LAYER || 'dataLayer';
  documentProps.PostHead = generateGTMScript(id, dataLayerName);
  documentProps.PreBody = generateGTMNoScript(id);
}

export default Document(documentProps);
