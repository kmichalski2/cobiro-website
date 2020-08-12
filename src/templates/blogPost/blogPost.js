import React, { useState } from "react"
import Img from "gatsby-image"
import SwayTop from "../../components/UiElements/SwayTop/SwayTop"
import JumboCta from "../../components/sections/jumboCta/jumboCta"

import Layout from "../../components/layout/layout"
import Classes from "./blogPost.module.scss"
import { Link } from "gatsby"
import CategoryLabel from "../../components/UiElements/categoryLabel/categoryLabel"
import Section from "../../components/UiElements/Section/Section"
import BlogPosts from "../../components/UiElements/blogPosts/blogPosts"
import BlogPostsHeader from "../../components/UiElements/blogPostsHeader/blogPostsHeader"
import SEO from "../../components/seo"

const BlogPost = ({pageContext}) => {
    const {title, featuredImage, subtitle, content, writer, category, readLength, date, topGradiantColor, bottomGradiantColor, footerCtaTitle, footerCtaText, ctaLinks, ctaBackgroundColor, textColor, otherPosts, seoTags, seoMetaTags, locale, writerImage, otherPostsTitle } = pageContext
    const createMarkup = (text)  => {
        return {__html: text}
    }

    const [notificationPadding, setNotificationPadding] = useState(0)

    const notifyerHeightHandler = (height) => {
        setNotificationPadding(height)
    }

    return (
        <Layout 
            menuInverted={true}
            // locales={ locales } 
            currentLocale={locale}
            notifyerHeightHandler={notifyerHeightHandler}
            >
            <SEO 
                title={ seoTags && seoTags.title ? seoTags.title : title } 
                description={seoTags && seoTags.description ? seoTags.description : null} 
                lang={locale}
                meta={seoMetaTags.tags}
                />


            <BlogPostsHeader post={{title, subtitle, category, featuredImage, writer, readLength, writerImage, date}} metaFields  notificationPadding={notificationPadding}/>
            <article className={Classes.article}>
                <div className="container">
                    <div className="row center-xs">
                        <div className="col col-xs-12 col-md-10 col-lg-8" >
                            {content.map((s,i) => {
                                if(s.__typename){
                                    switch(s.__typename.replace("DatoCms", "")) {
                                        case 'TextSection':

                                            return <div key={i} className={Classes.section} dangerouslySetInnerHTML={createMarkup( s.text )}></div>

                                        case 'ImageSection':
                                            return (
                                                <div key={i} className={Classes.section}>
                                                { s.image.fluid ? <Img fluid={s.image.fluid} alt={s.image.alt} className="space-xs-up"/> : <img src={s.image.url} alt={s.image.alt}/> }
                                                { s.credits ? <p className="small text-center">{ s.credits }</p> : null }
                                                </div>
                                            )

                                        case 'QuoteSection':

                                            return (
                                                <div key={i} className={[Classes.section, Classes.quote].join(' ')} style={{backgroundColor: s.bgColor && s.bgColor.hex}}>
                                                    <blockquote className={s.textColor === 'light' ? "text-white" : null}>"{ s.quote }"</blockquote>
                                                    { s.quotedPerson ? <p className={s.textColor === 'light' ? "text-white" : null}>- { s.quotedPerson }</p> : null }
                                                </div>
                                            )

                                        case 'CtaSection':
                                            
                                            const bgColor = s.bgColor && s.bgColor.hex
                                            const whiteText = s.textColor === 'light'

                                            return (
                                                <div key={i} className={[Classes.section, whiteText ? Classes.gradiantCta : null, Classes.cta].join(' ')} style={{backgroundColor: bgColor}}>
                                                    
                                                        <h2>{s.title}</h2>
                                                        <div className="space-xs-up" dangerouslySetInnerHTML={createMarkup(s.text)}></div>
                                                        {
                                                            !s.externalLink ?
                                                                <Link className={["btn btn-large", whiteText ? "btn-white" : null].join(' ')} to={`${ s.linkInternal.internal && s.linkInternal.internal.type === 'DatoCmsBlogPost' ? "blog/" : "" }${s.linkInternal.slug}`}>{s.linkTitle}</Link>
                                                            : s.linkExternal ?
                                                                <a className={["btn btn-large", whiteText ? "btn-white" : null].join(' ')} href={s.linkExternal} target="_blank">{s.linkTitle}</a>
                                                            : null
                                                        }
                                                    
                                                </div>                                                    
                                            )
                                    }

                                }
                            })}
                        </div>
                    </div>
                </div>
            </article>
            <Section>
                <div className="container">
                    <div className="row">
                        <div className="col col-xs-12 space-xs-up text-center">
                            <h2>{otherPostsTitle || 'People also read'}</h2>
                        </div>
                        <BlogPosts blogPosts={otherPosts} shadow />
                    </div>
                </div>
            </Section>
            <JumboCta data={{ctaBackgroundColor: ctaBackgroundColor, ctaBgColor: ctaBackgroundColor ? true : false, textColor: textColor, title: footerCtaTitle, text: footerCtaText, linkTitle: ctaLinks[0].linkTitle, link: ctaLinks && ctaLinks[0].internalLink ? {slug: `${ctaLinks[0].internalLink.__typename === "DatoCmsBlogPost" ? '/blog/' : ""}${ctaLinks[0].internalLink.slug}`} : null, externalLinkCta: (ctaLinks && ctaLinks[0].externalLink) ? ctaLinks[0].externalLink : null}} />
        </Layout>
    )
}

export default BlogPost
