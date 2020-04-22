import React from 'react'
import Section from "../Section/Section"
import HtmlText from "../HtmlText/HtmlText"
import CategoryLabel from "../categoryLabel/categoryLabel"
import ImageAll from "../ImageAll/ImageAll"

import Classes from './blogPostsHeader.module.scss'

const BlogPostsHeader = ({post}) => {

    return (
        <Section>
            <div className="container">
                <div className="row middle-xs">
                    <div className="col col-xs-12 col-md-6">
                        {post.category ? post.category.map((cat, i) => <CategoryLabel key={i} category={cat.category} link={`/blog/${cat.slug}`} large />) : null}
                        <h1 className={Classes.title}>{post.title}</h1>
                        <p>{post.subtitle}</p>
                    </div>
                    <div className="col col-xs-12 col-md-6">
                        <ImageAll image={post.featuredImage} alt={post.featuredImage.alt || post.title} />
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default BlogPostsHeader