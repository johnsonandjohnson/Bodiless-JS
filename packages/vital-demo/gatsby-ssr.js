/* eslint-disable react/jsx-filename-extension */

/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from 'react';

export const onRenderBody = (
  { setPostBodyComponents },
) => {
  setPostBodyComponents([
    <link
      href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
      rel="stylesheet"
    />,
  ]);
};
