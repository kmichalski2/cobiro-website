/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Navbar from "./navbar/navbar"
import Footer from "./footer"
import "./style/app.scss"
import CookieBanner from "./cookieConsent"

const Layout = ({ children, customCta, locales, currentLocale, hiddenMenuItems, menuInverted, slug, notifyerHeightHandler }) => {
  
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
        expandedMobile
        submenuTitle
        submenuDescription
        submenuColumn1Title
        submenuColumn1Icon {
          alt
          url
          fixed(width: 16) {
            width
            srcSet
            src
            sizes
            height
            aspectRatio
          }
        }
        submenuColumn1Links {
          linkTitle
          externalLink
          internalLink {
            ... on DatoCmsPage {
              slug
              __typename
              internal {
                type
              }
            }
            ... on DatoCmsBlogPage {
              slug
              __typename
              internal {
                type
              }
            }
          }
          linkDescription
        }
        submenuColumn2Title
        submenuColumn2Icon {
          alt
          url
          fixed(width: 16) {
            width
            srcSet
            src
            sizes
            height
            aspectRatio
          }
        }
        submenuColumn2Links {
          linkTitle
          externalLink
          internalLink {
            ... on DatoCmsPage {
              slug
              __typename
              internal {
                type
              }
            }
            ... on DatoCmsBlogPage {
              slug
              __typename
              internal {
                type
              }
            }
          }
          linkDescription
        }
        submenuColumn3Title
        submenuColumn3Icon {
          alt
          url
          fixed(width: 16) {
            width
            srcSet
            src
            sizes
            height
            aspectRatio
          }
        }
        submenuColumn3Links {
          linkTitle
          externalLink
          internalLink {
            ... on DatoCmsPage {
              slug
              __typename
              internal {
                type
              }
            }
            ... on DatoCmsBlogPage {
              slug
              __typename
              internal {
                type
              }
            }
          }
          linkDescription
        }

        rightColumnTitle
        rightColumnDescription
        submenuColumnRightTitle
        submenuColumnRightIcon {
          alt
          url
          fixed(width: 16) {
            width
            srcSet
            src
            sizes
            height
            aspectRatio
          }
        }
        rightColumnLinks {
        externalLink
        linkTitle
        linkDescription
        internalLink {
          ... on DatoCmsPage {
            slug
            __typename
            internal {
              type
            }
          }
          ... on DatoCmsBlogPage {
            slug
            __typename
            internal {
              type
            }
          }
        }
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
    allDatoCmsNotification(filter: {locale: {eq: "en"}}) {
      edges {
        node {
          text
          textColor
          bgColor {
            hex
          }
          pages {
            slug
            title
          }
        }
      }
    }
  }  
  `)


  const notifications = data.allDatoCmsNotification.edges.map(e => e.node)

  const getNotification = (slug) => {
    let pageNotification
  
    notifications.map(n => {
      if(n.pages && n.pages.length > 0) {
        n.pages.map(p => {
          if(p.slug === slug) {
            pageNotification = n
          }
        })
        
      } else if(!pageNotification) {
        pageNotification = n
      }
    })
    return pageNotification
  }

  let menuItems

  if(hiddenMenuItems && hiddenMenuItems.length > 0) {
    const hiddenMenuItemsIds = hiddenMenuItems.map(item => item.id)
    menuItems = data.allDatoCmsMenu.nodes.filter(item => !hiddenMenuItemsIds.includes(item.id))
  } else {
    menuItems = data.allDatoCmsMenu.nodes
    
  }
  
    return (
    <>
      <Navbar menuItems={menuItems} customCta={customCta} hiddenMenuItems={hiddenMenuItems} menuInverted={menuInverted} notification={getNotification(slug)} notifyerHeightHandler={notifyerHeightHandler}/>
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
