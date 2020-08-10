import React, { useState, createContext } from 'react'
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

const Blog = ({ pageContext }) => {

  const page = pageContext.page
  const posts = pageContext.posts
  const categories = pageContext.categories
  const seoTags = page.seoTags
  const locales = pageContext.locales

  console.log('BLOG PAGE PAGE CONTEXT: ', pageContext)

  const [notificationPadding, setNotificationPadding] = useState(0)

    const notifyerHeightHandler = (height) => {
        setNotificationPadding(height)
    }

    return (
        <Layout 
          menuInverted 
          notifyerHeightHandler={notifyerHeightHandler}
          locales={ locales }
          currentLocale={page.locale}
        >     
        <SEO 
          title={ seoTags && seoTags.title ? seoTags.title : page.title } 
          description={seoTags && seoTags.description ? seoTags.description : null} 
          lang={page.locale}
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

export default Blog