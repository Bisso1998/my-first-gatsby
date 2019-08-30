/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const path = require('path')
module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: `ferrybooking.in - book adventure activities, scuba diving, romantic dinner in Andaman, Havelock Island, Portblair, Niel`
  },
  pathPrefix: "/activity/",
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname,`static`, `images`),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}
