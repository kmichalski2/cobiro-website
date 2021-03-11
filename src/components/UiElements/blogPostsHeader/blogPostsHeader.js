import React from 'react'
import Section from "../Section/Section"
import HtmlText from "../HtmlText/HtmlText"
import CategoryLabel from "../categoryLabel/categoryLabel"
import ImageAll from "../ImageAll/ImageAll"

import * as Classes from './blogPostsHeader.module.scss'
import BlogSearch from '../../sections/blogSearch/blogSearch'
import { Link } from 'gatsby'
import AnyLink from '../AnyLink/AnyLink'

const BlogPostsHeader = ({post, searchTitle, search, metaFields, notificationPadding, topPostButtonText}) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const publishDate = post.date ? new Date(post.date) : null
    
    return (
        <Section noBottomPadding addedPadding={notificationPadding}>
            <div className="container">
                {search ?
                <div className="row">
                    <BlogSearch title={searchTitle}/>
                </div>
                : null}
                <div className="row middle-xs">
                    <div className="col col-xs-12 col-lg-6 space-xs space-sm space-md">
                        {post.slug ? 
                            <AnyLink link={`blog/${post.slug}`} title={post.title} classes={[Classes.title, "block-xs h1 no-mt text-black"].join(' ')} internal noArrow noPadding />
                        :  <h1 className={Classes.title}>{post.title}</h1>
                        }
                            <p>{post.subtitle}</p>
                            {/* {publishDate !== null ? <p className="small text-bold">{publishDate.toLocaleString('en-US', options)}</p> : null} */}

                            {post.category ? post.category.map((cat, i) => <CategoryLabel key={i} category={cat.category} link={`/blog/${cat.slug}`} classes={"inline-block"}/>) : null}
                            <p className={["inline-block"].join(' ')}><span className={Classes.dotPadding}>&bull;</span> {post.readLength} min read</p>

                            {post.slug ? 
                            <AnyLink button link={`blog/${post.slug}`} title={topPostButtonText ? topPostButtonText : "Read more"} classes={[Classes.topPostButtonText].join(' ')} internal noArrow noPadding />
                            :  null }
                    </div>
                    <div className="col col-xs-12 col-lg-6">
                        {post.slug ?
                        <AnyLink link={`blog/${post.slug}`} internal noArrow noPadding >
                            <ImageAll image={post.featuredImage} alt={post.featuredImage.alt || post.title}/>
                        </AnyLink>
                        : 
                        <ImageAll image={post.featuredImage} alt={post.featuredImage.alt || post.title} />
                        }
                        
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default BlogPostsHeader