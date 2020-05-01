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

const Layout = ({ children, customCta, locales, currentLocale, hiddenMenuItems, menuInverted }) => {
  
  if (typeof window !== 'undefined') {
    // Make scroll behavior of internal links smooth
    // eslint-disable-next-line global-require
    require('smooth-scroll')('a[href*="#"]');
  }

  const data = useStaticQuery(graphql`
  query GlobalQuery {
    site {
      siteMetadata {
        title
      }
    }
    allDatoCmsMenu(sort: {fields: menuItemOrder, order: ASC}, filter: {locale: {eq: "en"}}) {
      nodes {
        linkTitle
        link {
          ... on DatoCmsPage {
            id
            title
            slug
          }
          ... on DatoCmsBlogPage {
            title
            slug
          }
        }
        id
        menuItemOrder
        submenuFooterLinkTitle
        submenuFooterText
        submenuFooterLink {
          slug
        }
        submenuFooterExternalLink
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
            ... on DatoCmsPage {
              id
              title
              slug
            }
            ... on DatoCmsBlogPage {
              title
              slug
            }
          }
          submenuLinks {
            ... on DatoCmsPage {
              id
              title
              slug
            }
            ... on DatoCmsBlogPage {
              title
              slug
            }
          }
          submenuLinkTitles
        }
      }
    }
    allDatoCmsFooter(sort: {fields: footerItemOrder, order: ASC}, filter: {locale: {eq: "en"}}) {
      nodes {
        column {
          ... on DatoCmsTextElement {
            text
          }
          ... on DatoCmsGooglePartnerLogo {
            googlePartnerLogo
            externalLink
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

  let menuItems

  if(hiddenMenuItems && hiddenMenuItems.length > 0) {
    const hiddenMenuItemsIds = hiddenMenuItems.map(item => item.id)
    menuItems = data.allDatoCmsMenu.nodes.filter(item => !hiddenMenuItemsIds.includes(item.id))
  } else {
    menuItems = data.allDatoCmsMenu.nodes
    
  }
  
    return (
    <>
      <Navbar menuItems={menuItems} customCta={customCta} hiddenMenuItems={hiddenMenuItems} menuInverted={menuInverted}/>
      {children}
      <CookieBanner />
      <Footer columns={data.allDatoCmsFooter.nodes} locales={locales} currentLocale={currentLocale}/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
