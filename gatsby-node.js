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
              }
            }
          }
        }
      }
      `).then(result => {
        result.data.allDatoCmsPage.edges.forEach(async function(item) {
          const prefix = locale === "en" ? "" : `/${locale}`
          let p = `${prefix}/${item.node.slug}`
          let sections = item.node.sections.map(section =>
            section.__typename.replace("DatoCms", "")
          )
          createPage({
            path: p,
            component: path.resolve(`./src/templates/page.js`),
            context: {
              title: item.node.title,
              sections: sections,
              locale,
            },
          })
        })
      })
    })
  )
}
