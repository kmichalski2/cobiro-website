import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"

import Classes from './blog.module.scss'
import BlogCard from '../../components/UiElements/blogCard/blogCard'
import Layout from '../../components/layout/layout'
import SwayTop from '../../components/UiElements/SwayTop/SwayTop'
import JumboCta from '../../components/sections/jumboCta/jumboCta'
import BlogPosts from '../../components/UiElements/blogPosts/blogPosts'
import CategoryLabel from '../../components/UiElements/categoryLabel/categoryLabel'
import Section from '../../components/UiElements/Section/Section'
import FeaturedTestimonialsSingle from '../../components/sections/featuredTestimonalSingle'
import SEO from '../../components/seo'

const Blog = ({ data, location }) => {

  const page = data.datoCmsBlogPage
  const posts = data.allDatoCmsBlogPost.nodes
  const categories = data.allDatoCmsBlogCategory.nodes
  const seoTags = page.seoTags

  const [notificationPadding, setNotificationPadding] = useState(0)

    const notifyerHeightHandler = (height) => {
        setNotificationPadding(height)
    }

    return (
        <Layout 
          menuInverted 
          notifyerHeightHandler={notifyerHeightHandler}
          location={location}
          >     
        <SEO 
          title={ seoTags && seoTags.title ? seoTags.title : page.title } 
          description={seoTags && seoTags.description ? seoTags.description : null} 
          lang={data.locale}
          />
          <BlogPosts blogPosts={posts} offset={0} fixedMax={1} addedAmount={0} firstLarge horizontal searchTitle={page.searchTitle} notificationPadding={notificationPadding}/>
          <Section>
            <div className="container">
              
              <div className="row center-xs">
                
                <BlogPosts blogPosts={posts} offset={1} fixedMax={9} addedAmount={2} horizontal />
              </div>
            </div>
          </Section>
          <Section bgColor={page.categoriesBgColor && page.categoriesBgColor.hex}>
            <div className="container">
              <div className="row text-center center-xs space-xs-up">
                <div className="col col-xs-12 col-md-8 col-lg-6">
                  <h2>{page.categoriesTitle}</h2>
                </div>
              </div>
              <div className="row center-xs">
              { categories.length > 0 ? categories.map((cat, i) => 
                <div key={i} className="col col-xs-12 col-sm-6 col-md-4">
                  <CategoryLabel category={cat.category} link={`/blog/${cat.slug}`} large background/>
                </div>) : null }
              </div>
            </div>
          </Section>
          {/* <section className="section bg-lightblue-sway">
            <div className="container">
              <div className="row center-xs space-xs-up middle-xs">
                <div className="col col-xs-12 col-sm-6 col-lg-4">
                  <h2 className="h1 text-left-xs text-right-sm">{page.promiseTitle}</h2>
                </div>
                <div className="col col-xs-12 col-sm-6  col-lg-4">
                  <ul className="list-unstyled price-list">
                  {page.promiseList.map((l, i) => <li key={i}>{l}</li>)}
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className={["col col-xs-12 text-left-xs text-center-sm flex center-sm middle-xs", Classes.cobiroPromise].join(' ')}>
                  {page.promiseSignature && page.promiseSignature.fixed ?
                    <Img fixed={page.promiseSignature.fixed} alt={page.promiseSignature.alt || 'Cobiro promise signature'} />
                  : page.promiseSignature && page.promiseSignature.url ?
                    <img src={page.promiseSignature.url} alt={page.promiseSignature.alt || 'Cobiro promise signature'} />
                  : null
                  }
                  <p>{ page.promiseSignatureTitle }</p>
                </div>
              </div>
              </div>
            </section> */}
            <Section>
              <div className="container">
              <div className="row center-xs">
                <BlogPosts blogPosts={posts} offset={9} addedAmount={4} horizontal />
              </div>
            </div>
            </Section>
              <FeaturedTestimonialsSingle data={{quote: page.quote, person: page.quotedPerson, testimonialColor: page.quoteBgColor, image: page.quoteImage, testimonialTextColor: page.quoteTextColor}}/>
          
          
          <JumboCta data={{ctaBgColor: page.ctaBgColor, ctaBackgroundColor: page.ctaBgColor, textColor: page.footerCtaTextColor, title: page.footerCtaTitle, text: page.footerCtaText, linkTitle: page.ctaLinks && page.ctaLinks[0] ? page.ctaLinks[0].linkTitle : null, link: page.ctaLinks && page.ctaLinks[0].internalLink ? {slug: `${page.ctaLinks[0].internalLink.__typename === "DatoCmsBlogPost" ? '/blog/' : ""}${page.ctaLinks[0].internalLink.slug}`} : null, externalLinkCta: (page.ctaLinks && page.ctaLinks[0].externalLink) ? page.ctaLinks[0].externalLink : null}}  />
        </Layout>
    )
}

export const query = graphql`
  {
    datoCmsBlogPage {
      title
      locale
      seoTags {
        title
        description
      }
      ctaLinks {
        ... on DatoCmsInternalLink {
          internalLink {
            ... on DatoCmsPage {
              slug
              __typename
            }
            ... on DatoCmsBlogPost {
              slug
              __typename
            }
          }
          linkTitle
        }
        ... on DatoCmsExternalLink {
          linkTitle
          externalLink
        }
      }
      searchTitle
      footerCtaText
      footerCtaTitle
      promiseList
      footerCtaTextColor
      ctaBgColor {
        hex
      }
      categoriesTextColor
      categoriesBgColor {
        hex
      }
      categoriesTitle
      categoriesText
      quote
      quotedPerson
      quoteImage {
        alt
        url
        fluid {
          aspectRatio
          height
          sizes
          src
          srcSet
          width
        }
      }
      quoteTextColor
      quoteBgColor {
        hex
      }
      topGradiantColor {
        hex
      }
      bottomGradiantColor {
        hex
      }
      promiseSignature {
        fixed(width: 150) {
          aspectRatio
          srcSet
          src
          width
          height
          sizes
        }
        alt
        url
      }
      promiseSignatureTitle
      promiseTitle
      subtitle
    }
    allDatoCmsBlogPost(filter: {title: {ne: null}}, sort: {fields: meta___createdAt, order: DESC}) {
      nodes {
        title
        readLength
        subtitle
        slug
        writer
        category {
          category
          slug
        }
        featuredImage {
          alt
          url
          fluid {
            aspectRatio
            height
            sizes
            src
            srcSet
            width
          }
        }
      }
    }
    allDatoCmsBlogCategory(filter: {category: {ne: null}}) {
      nodes {
        category
        slug
      }
    }
    localSearchBlogposts {
      store
      index
    }
  }
    
`

export default Blog