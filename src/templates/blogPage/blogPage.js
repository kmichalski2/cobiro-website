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
import CtaCardSimple from '../../components/sections/ctaCardSimple/ctaCardSimple'
import ImageAll from '../../components/UiElements/ImageAll/ImageAll'

const Blog = ({ pageContext, location }) => {

  const page = pageContext.page
  const posts = pageContext.posts
  const categories = pageContext.categories
  const seoTags = page.seoTags
  const locales = pageContext.locales
  const topPostButtonText = page.topPostButtonText

  const [notificationPadding, setNotificationPadding] = useState(0)

    const notifyerHeightHandler = (height) => {
        setNotificationPadding(height)
    }

console.log(page, 'page')

    return (
        <Layout 
          menuInverted 
          notifyerHeightHandler={notifyerHeightHandler}
          locales={ locales }
          currentLocale={page.locale}
          location={location}
        >     
        <SEO 
          title={ seoTags && seoTags.title ? seoTags.title : page.title } 
          description={seoTags && seoTags.description ? seoTags.description : null} 
          lang={page.locale}
          locales={locales}
          location={pageContext.location}
          />
          <BlogPosts blogPosts={posts} offset={0} fixedMax={1} addedAmount={0} firstLarge horizontal={false} topPostButtonText={page.topPostButtonText} searchTitle={page.searchTitle} notificationPadding={notificationPadding}/>
          <Section>
            <div className="container">
              <div className="row center-xs">
                <BlogPosts blogPosts={posts} offset={1} fixedMax={7} addedAmount={2} horizontal={false} />
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
                <div key={i} className={["center", Classes.categorySection].join(' ')}>
                  <CategoryLabel category={cat.category} link={`/blog/${cat.slug}`} large background/>
                </div>) : null }
              </div>
            </div>
          </Section>
          <Section>
            <div className="container">
            <div className="row center-xs">
              <BlogPosts blogPosts={posts} offset={9} addedAmount={3} horizontal={false} />
            </div>
          </div>
          </Section>
          {/* <FeaturedTestimonialsSingle data={{quote: page.quote, person: page.quotedPerson, testimonialColor: page.quoteBgColor, image: page.quoteImage, testimonialTextColor: page.quoteTextColor}}/> */}
          <CtaCardSimple 
            data={{
              imageOverflowing: true,
              image: page.ctaImage, 
              backgroundImage: page.ctaBackgroundImage, 
              textColor: page.footerCtaTextColor, 
              title: page.footerCtaTitle, 
              text: page.footerCtaText, 
              linkTitle: page.ctaLinks && page.ctaLinks[0] ? page.ctaLinks[0].linkTitle : null,
              internalLinkCtaCard: page.ctaLinks[0] && page.ctaLinks[0].internalLink ? {slug: `${page.ctaLinks[0].internalLink.__typename === "DatoCmsBlogPost" ? '/blog/' : ""}${page.ctaLinks[0].internalLink.slug}`} : null,
              externalLinkCtaCard: (page.ctaLinks[0] && page.ctaLinks[0].externalLink) ? page.ctaLinks[0].externalLink : null}}/>
          {/* <JumboCta data={{ctaBgColor: page.ctaBgColor, ctaBackgroundColor: page.ctaBgColor, textColor: page.footerCtaTextColor, title: page.footerCtaTitle, text: page.footerCtaText, linkTitle: page.ctaLinks && page.ctaLinks[0] ? page.ctaLinks[0].linkTitle : null, link: page.ctaLinks[0] && page.ctaLinks[0].internalLink ? {slug: `${page.ctaLinks[0].internalLink.__typename === "DatoCmsBlogPost" ? '/blog/' : ""}${page.ctaLinks[0].internalLink.slug}`} : null, externalLinkCta: (page.ctaLinks[0] && page.ctaLinks[0].externalLink) ? page.ctaLinks[0].externalLink : null}}  /> */}
        </Layout>
    )
}

export default Blog