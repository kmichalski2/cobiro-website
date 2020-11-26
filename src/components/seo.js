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
        // lang
        lang: (locales && locales.length > 0 && locales.find(l => l.locale === lang) && locales.find(l => l.locale === lang).hrefLang) || lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        ...meta.map(m => m.attributes ? m.attributes : {})
      ]}
    > 
    {locales && locales.length > 0 && locales.map(locale => 
        <link rel="alternate" href={`${url}${locale.locale !== 'en' ? `/${locale.customLang || locale.locale}/${locale.value || ''}` : `/${locale.value}`}`} hrefLang={locale.hrefLang || locale.locale} key={locale}/>
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
