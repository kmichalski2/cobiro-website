/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Navbar from "./navbar"
import Footer from "./footer"
import "./style/app.scss"
import CookieBanner from "./cookieConsent"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query GlobalQuery {
      site {
        siteMetadata {
          title
        }
      }
      allDatoCmsMenu {
        nodes {
          linkTitle
          link {
            slug
            title
          }
          menuItemOrder
          submenu {
            title
            icon {
              alt
              fixed(width: 10) {
                aspectRatio
                base64
                height
                src
                srcSet
                width
              }
              url
            }
            link {
              title
              slug
            }
            submenuLinks {
              title
              slug
            }
          }
        }
      }
      allDatoCmsFooter {
        nodes {
          column {
            ... on DatoCmsTextElement {
              text
            }
            ... on DatoCmsLinkElement {
              externalLink
              linkTitle
              internalLink {
                slug
              }
            }
            ... on DatoCmsImageElement {
              externalLink
              image {
                alt
                fluid {
                  aspectRatio
                  base64
                  height
                  src
                  srcSet
                  width
                  sizes
                }
                url
              }
            }
          }
          columnHeading
          footerItemOrder
        }
      }
    }
  `)

  return (
    <>
      <Navbar menuItems={data.allDatoCmsMenu.nodes} />
      {children}
      <CookieBanner />
      <Footer columns={data.allDatoCmsFooter.nodes}/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
