/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title, locales, location }) {
    const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )
  const url = typeof window !== 'undefined' ? window.location.origin : '';
  const metaDescription = description || site.siteMetadata.description
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        // {
        //   property: `og:title`,
        //   content: title,
        // },
        {
          property: `og:description`,
          content: metaDescription,
        },
        // {
        //   property: `og:type`,
        //   content: `website`,
        // },
        // {
        //   name: `twitter:card`,
        //   content: `summary`,
        // },
        // {
        //   name: `twitter:creator`,
        //   content: site.siteMetadata.author,
        // },
        // {
        //   name: `twitter:title`,
        //   content: title,
        // },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        ...meta.filter(m => m.attributes ? m.attributes : false)
      ]}
    > 
    {locales && locales.length > 0 && locales.map(locale => 
        <link rel="alternate" href={`${url}${locale.locale !== 'en' ? `/${locale.locale}/${locale.value || ''}` : `/${locale.value}`}`} hrefLang={locale.locale} key={locale}/>
    )}
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
