import React, { useState } from 'react'
import Layout from '../../components/layout/layout'
import SwayTop from '../../components/UiElements/SwayTop/SwayTop'
import BlogPosts from '../../components/UiElements/blogPosts/blogPosts'
import JumboCta from '../../components/sections/jumboCta/jumboCta'
import Section from '../../components/UiElements/Section/Section'
import FeaturedTestimonialsSingle from '../../components/sections/featuredTestimonalSingle'
import SEO from "../../components/seo"

const BlogCagegory = ({ pageContext, location }) => {

    const [notificationPadding, setNotificationPadding] = useState(0)

    const notifyerHeightHandler = (height) => {
        setNotificationPadding(height)
    }

    const {title, posts, bgColor, textColor, footerCtaTitle, footerCtaText, ctaLinks, quote, person, quoteBgColor, quoteImage, quoteTextColor, locale, locales} = pageContext

    return (
        <Layout notifyerHeightHandler={notifyerHeightHandler} currentLocale={locale} locales={locales}>
             <SEO 
                title={ title } 
                lang={locale}
                locales={locales}
                location={location}
                />
            <Section bgColor={bgColor.hex} addedPadding={notificationPadding}>
              <div className="container">
                  <div className="row middle-xs center-xs">
                      <div className="col col-xs-12 col-lg-8 text-center">
                          <h1 className={textColor === 'light' ? "text-white" : null}>{ title }</h1>
                      </div>
                  </div>
              </div>
            </Section>
            <Section>
                <div className="container">
                    <div className="row">
                        <BlogPosts blogPosts={posts} addedAmount={4} horizontal/>
                    </div>
                </div>
            </Section>
            <FeaturedTestimonialsSingle data={{quote: quote, person: person, testimonialColor: quoteBgColor, image: quoteImage, testimonialTextColor: quoteTextColor}}/>
            <JumboCta data={{ctaBackgroundColor: {hex: bgColor.hex}, textColor: textColor, ctaBgColor: true, title: footerCtaTitle, text: footerCtaText, linkTitle: ctaLinks[0].linkTitle, link: ctaLinks && ctaLinks[0].internalLink ? {slug: `${ctaLinks[0].internalLink.__typename === "DatoCmsBlogPost" ? '/blog/' : ""}${ctaLinks[0].internalLink.slug}`} : null, externalLinkCta: (ctaLinks && ctaLinks[0].externalLink) ? ctaLinks[0].externalLink : null}} />
        </Layout>
    )
}

export default BlogCagegory