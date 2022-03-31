# Troubleshooting Guide

This section contains possible solutions for common problems.

## Content not saving (disappears when page reloads)

- Is the backend server running? If so, check to be sure that it is receiving
  posts (it will log all posts to the console).
- Does the component have the correct node-key? Components without node keys will
  write data to a location which is not readable.
- Does the page index file or template export the correct graphql query:
  ```
  export const query = graphql`
    query($slug: String!) {
      ...PageQuery
      ...SiteQuery
      ...DefaultContentQuery
  `;
  ```
  Also, 'gatsby-theme-bodiless' must be installed and enabled for your site.
- Is saving disabled via the
  [`BODILESS_BACKEND_SAVE_ENABLED`](../Architecture/EnvironmentVariables) env
  var?