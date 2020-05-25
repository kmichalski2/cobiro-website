import React from 'react'
import Section from "../Section/Section"
import HtmlText from "../HtmlText/HtmlText"
import CategoryLabel from "../categoryLabel/categoryLabel"
import ImageAll from "../ImageAll/ImageAll"

import Classes from './blogPostsHeader.module.scss'
import BlogSearch from '../../sections/blogSearch/blogSearch'
import { Link } from 'gatsby'

const BlogPostsHeader = ({post, searchTitle, search, metaFields, notificationPadding}) => {
    console.log('notificationPadding HEADER', notificationPadding)
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
                        {post.category ? post.category.map((cat, i) => <CategoryLabel key={i} category={cat.category} link={`/blog/${cat.slug}`} large />) : null}
                        {post.slug ? 
                        <Link to={`blog/${post.slug}`} className="text-black">
                            <h1 className={Classes.title}>{post.title}</h1>
                        </Link>  
                        :  <h1 className={Classes.title}>{post.title}</h1>
                        }
                        
                            
                            <p>{post.subtitle}</p>
                            {metaFields ?
                            <div className={Classes.meta}>
                                <ImageAll image={post.writerImage} alt={post.writerImage ? post.writerImage.alt : null} classes={Classes.writerIcon}/>
                                <div>
                                    <p className="small no-mb">{post.writer}</p>
                                    <p className="small text-italic">{post.readLength} min read</p>
                                </div>
                            </div>
                            : null}
                        
                    </div>
                    <div className="col col-xs-12 col-lg-6">
                        {post.slug ?
                        <Link to={`blog/${post.slug}`}>
                            <ImageAll image={post.featuredImage} alt={post.featuredImage.alt || post.title} />
                        </Link>
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