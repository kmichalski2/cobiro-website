import React from "react"
import Img from "gatsby-image"
import SwayTop from "../../components/UiElements/SwayTop/SwayTop"
import JumboCta from "../../components/sections/jumboCta/jumboCta"

import Layout from "../../components/layout/layout"
import Classes from "./blogPost.module.scss"

const blogPost = ({pageContext}) => {
    const {title, featuredImage, subtitle, content, writer, category, readLength, date } = pageContext

    console.log(pageContext)
    
    const createMarkup = (text)  => {
        return {__html: text}
    }

    return (
        <Layout 
            // locales={ locales } 
            // currentLocale={data.locale}
            // hiddenMenuItems={data.hiddenMenuItems}
            >
            {/* <SEO 
                title={ data.seoTags && data.seoTags.title ? data.seoTags.title : data.title } 
                description={data.seoTags && data.seoTags.description ? data.seoTags.description : null} 
                lang={data.locale}
                /> */}
            <article>
                <SwayTop topColor={{hex: "#004BD5"}} bottomColor={{hex: "#62C9FF"}} >
                    <div className={["container", Classes.header].join(' ')}>
                        <div className="row middle-xs">
                            <div className="col col-xs-12 col-lg-6">
                                
                                <h1>{ title }</h1>
                                <p>{ subtitle }</p>
                                <h4 className="space-xs-up">{ readLength } Min read - Written by { writer }</h4>
                                { category.length > 0 ? category.map((cat, i) => <p key={i} className={Classes.category}>{ cat.category }</p>) : null }
                            </div>
                            <div className="col col-xs-12 col-lg-6">
                                <Img fluid={ featuredImage.fluid } alt={featuredImage.alt} />
                            </div>
                        </div>
                    </div>
                </SwayTop>
                <div className="section">
                    <div className="container">
                        <div className="row center-xs">
                            <div className="col-xs-12 col-sm-10 col-lg-8" >
                                {content.map((s,i) => {
                                    switch(s.__typename.replace("DatoCms", "")) {
                                        case 'TextSection':

                                            return <div key={i} dangerouslySetInnerHTML={createMarkup( s.text )}></div>

                                        case 'ImageSection':
                                            return (
                                                <div key={i} className="space-xs-up">
                                                { s.image.fluid ? <Img fluid={s.image.fluid} alt={s.image.alt} /> : <img src={s.image.url} alt={s.image.alt}/> }
                                                { s.credits ? <p className="small text-center">{ s.credits }</p> : null }
                                                </div>
                                            )

                                        case 'QuoteSection':

                                            return (
                                                <div key={i} className={Classes.quote}>
                                                    <div className={Classes.quoteElement}>"</div>
                                                    <blockquote>{ s.quote }</blockquote>
                                                    { s.quotedPerson ? <p>- { s.quotedPerson }</p> : null }
                                                </div>
                                            )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <JumboCta data={{topGradiantColor: {hex: "#004BD5"}, bottomGradiantColor: {hex: "#62C9FF"}, backgroundColor: true, title: "Get started", text: "See for yourself, get access to our success tool for free", linkTitle: "Give me a free website", externalLinkCta: "https://customer.cobiro.com"}} />
        </Layout>
    )
}

export default blogPost

