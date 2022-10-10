module.exports = {
  siteMetadata: {
    title: 'Gatsby Vanilla',
    description: 'Gatsby Vanilla using Bodiless Non Editable components',
    author: '@gatsbyjs',
    siteUrl: 'https://gatsbystarterdefaultsource.gatsbyjs.io/',
  },
  plugins: [
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: 'minimal-ui',
        icon: 'src/images/vitalds-favicon.png', // This path is relative to the root of the site.
      },
    },
  ],
};
