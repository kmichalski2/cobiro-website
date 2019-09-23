/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async function({ graphql, actions }) {
  const { createPage } = actions
  const locales = ["en"]

  locales.forEach(locale => {
    const prefix = locale === "en" ? "" : `/${locale}`
    createPage({
      path: `${prefix}/`,
      component: path.resolve(`./src/templates/page.js`),
      context: { locale },
    })
  })

  Promise.all(
    locales.map(locale => {
      graphql(`
      {
        allDatoCmsPage(filter: {locale: {eq: "${locale}"}}) {
          edges {
            node {
              title
              slug
              sections {
                __typename
                ... on DatoCmsJumboHeader {
                  id
                  text
                  linkTitle
                  internalLink
                  heading
                  externalLink
                  externalLinkUrl
                  link {
                    title
                    slug
                    position
                  }
                  textLeftAlignment
                  image {
                    alt
                    width
                    height
                    fluid(
                      maxWidth: 1500
                      imgixParams: { fm: "webp", auto: "compress" }
                    ) {
                      width
                      height
                      srcSet
                      base64
                      aspectRatio
                      src
                      sizes
                    }
                  }
                }
                ... on DatoCmsThreeUp {
                  title
                  text
                  box1Icon {
                    alt
                    url
                  }
                  box1Title
                  box1Text
                  box1LinkText
                  box1Link {
                    slug
                  }
                  box2Icon {
                    url
                    alt
                  }
                  box2Title
                  box2Text
                  box2LinkText
                  box2Link {
                    slug
                  }
                  box3Icon {
                    url
                    alt
                  }
                  box3Title
                  box3Text
                  box3LinkText
                  box3Link {
                    slug
                  }
                }
                ... on DatoCmsExplanationWImage {
                  title
                  text
                  link {
                    slug
                  }
                  linkTitle
                  image {
                    alt
                    width
                    height
                    fluid(
                      maxWidth: 1200
                      imgixParams: { fm: "webp", auto: "compress" }
                    ) {
                      width
                      height
                      srcSet
                      base64
                      aspectRatio
                      src
                      sizes
                    }
                  }
                  imageToEdge
                  leftText
                }
                ... on DatoCmsFeaturedTestimonialsSingle {
                  quote
                  person
                  image {
                    alt
                    width
                    height
                    fluid(
                      maxWidth: 1200
                      imgixParams: { fm: "webp", auto: "compress" }
                    ) {
                      width
                      height
                      srcSet
                      base64
                      aspectRatio
                      src
                      sizes
                    }
                  }
                }
                ... on DatoCmsFeaturedCompany {
                  title
                  text
                  logos {
                    alt
                    width
                    height
                    fixed(width: 200) {
                      width
                      height
                      srcSet
                      base64
                      aspectRatio
                      src
                    }
                  }
                }
                ... on DatoCmsText {
                  title
                  text
                }
                ... on DatoCmsVideo {
                  videoEmbedUrl
                }
                ... on DatoCmsCtaJumbo {
                  title
                  text
                  linkTitle
                  link {
                    slug
                  }
                }
                ... on DatoCmsListPricing {
                  title
                  text
                  tier1Title
                  tier1Text
                  tier1Price
                  tier1LinkText
                  tier1ExternalLink
                  tier1Features
                  tier2Title
                  tier2Text
                  tier2Price
                  tier2LinkText
                  tier2ExternalLink
                  tier2Features
                }
              }
            }
          }
        }
      }
      `).then(result => {
        result.data.allDatoCmsPage.edges.forEach(async function(item) {
          const prefix = locale === "en" ? "" : `/${locale}`
          let p = item.node.slug === '__home__' ? '/' : `${prefix}/${item.node.slug}`
          // path: edge.uid === '__home__' ? '/' : `/${edge.uid}`,
          // let sections = item.node.sections.map(section =>
          //   section.__typename.replace("DatoCms", "")
          // )
          createPage({
            path: p,
            component: path.resolve(`./src/templates/page.js`),
            context: {
              title: item.node.title,
              locale,
              data: item.node
            },
          })
        })
      })
    })
  )
}
