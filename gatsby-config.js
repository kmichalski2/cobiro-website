require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: `Cobiro`,
    description: `Cobiro helps businesses grow with AI-powered digital marketing for different channels. We guide you all way through – from creating to optimizing and managing your ads.`,
    author: `@mamacph`,
    siteUrl: `https://cobiro.com/`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: `4a1dffb73eaa5ac33d603097b25cc5`,
        previewMode: process.env.CONTEXT === 'production' || process.env.GATSBY_ENVIRONMENT === 'production' ? false : true,
        disableLiveReload: false,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        stripMetadata: true,
        defaultQuality: 65,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    // `gatsby-plugin-intl`,
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-WNJH22W",
  
        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
  
        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        // Defaults to null
        // defaultDataLayer: { platform: "gatsby" },
  
        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,

      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/logo_circle.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        // A unique name for the search index. This should be descriptive of
        // what the index contains. This is required.
        name: 'blogposts',

        // Set the search engine to create the index. This is required.
        // The following engines are supported: flexsearch, lunr
        engine: 'flexsearch',

        // Provide options to the engine. This is optional and only recommended
        // for advanced users.
        //
        // Note: Only the flexsearch engine supports options.
        engineOptions: 'speed',

        // GraphQL query used to fetch all data for the search index. This is
        // required.
        query: `
          {
            allDatoCmsBlogPost {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        `,

        // Field used as the reference value for each document.
        // Default: 'id'.
        ref: 'id',

        // List of keys to index. The values of the keys are taken from the
        // normalizer function below.
        // Default: all fields
        index: ['title', 'body'],

        // List of keys to store and make available in your UI. The values of
        // the keys are taken from the normalizer function below.
        // Default: all fields
        store: ['id', 'path', 'title'],

        // Function used to map the result from the GraphQL query. This should
        // return an array of items to index in the form of flat objects
        // containing properties to index. The objects must contain the `ref`
        // field above (default: 'id'). This is required.
        normalizer: ({ blogData }) =>
          blogData.allDatoCmsBlogPost.edges.map(node => ({
            id: node.id,
            // path: node.frontmatter.path,
            title: node.title,
            // body: node.rawMarkdownBody,
          })),
      },
    },
    // {
    //   resolve: `gatsby-plugin-intl`,
    //   // options: {
    //   //   // language JSON resource path
    //   //   // path: `${__dirname}/src/i18n`,
    //   //   // supported language
    //   //   languages: [`en`, `es`],
    //   //   // language file path
    //   //   defaultLanguage: `en`,
    //   //   // option to redirect to `/ko` when connecting `/`
    //   //   redirect: true,
    //   // },
    // },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
  
}
