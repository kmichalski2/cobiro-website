import React from "react"
import Img from "gatsby-image"
import SwayTop from "../../components/UiElements/SwayTop/SwayTop"
import JumboCta from "../../components/sections/jumboCta/jumboCta"

import Layout from "../../components/layout/layout"
import Classes from "./blogPost.module.scss"
import { Link } from "gatsby"

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
                                <p className={["small text-bold", Classes.date].join(' ')}>{date}</p>
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
                                    if(s.__typename){
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
                                                        <div className={Classes.quoteElement}></div>
                                                        <blockquote>{ s.quote }</blockquote>
                                                        { s.quotedPerson ? <p>- { s.quotedPerson }</p> : null }
                                                    </div>
                                                )

                                            case 'CtaSection':
                                                
                                                const topColor = s.gradiantBackground && s.topColor && s.topColor.hex ? s.topColor.hex : "#F4F9FC"
                                                const bottomColor = s.gradiantBackground && s.bottomColor && s.bottomColor.hex ? s.bottomColor.hex : "#F4F9FC"
                                                const whiteText = s.gradiantBackground && s.topColor && s.topColor.hex && s.bottomColor && s.bottomColor.hex

                                                return (
                                                    <div className={[whiteText ? Classes.gradiantCta : null, Classes.cta].join(' ')} style={{backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='1920' height='991' preserveAspectRatio='none' viewBox='0 0 1920 991'%3E%3Cdefs%3E%3ClinearGradient id='linear-gradient' x1='0.5' x2='0.5' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='${topColor.replace('#', '%23')}'/%3E%3Cstop offset='1' stop-color='${bottomColor.replace('#', '%23')}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath id='Union_1' data-name='Union 1' d='M.131,962.464,0,890.961,1920,891v51.7c-230.811-18.689-529.927-18.448-759.2.643-130.454,10.863-237.672,27.13-371.091,37.193C696.169,987.6,591.484,991,486.5,991,307.236,991,127.107,981.076.131,962.464ZM0,890.961V48.295c230.811,18.689,529.927,18.448,759.2-.643,130.454-10.863,237.672-27.13,371.091-37.193,253.279-19.1,588.247-11.433,789.581,18.077l.13,71.5h-.13V890.961Z' transform='translate(0 0)' fill='url(%23linear-gradient)'/%3E%3C/svg%3E%0A")`, backgroundSize: '100% 100%'}}>
                                                        
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
                </div>
            </article>
            <JumboCta data={{topGradiantColor: {hex: "#004BD5"}, bottomGradiantColor: {hex: "#62C9FF"}, backgroundColor: true, title: "Get started", text: "See for yourself, get access to our success tool for free", linkTitle: "Give me a free website", externalLinkCta: "https://customer.cobiro.com"}} />
        </Layout>
    )
}

export default blogPost

