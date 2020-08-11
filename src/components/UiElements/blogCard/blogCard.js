import React from 'react'
import { Link } from 'gatsby'
import Img from "gatsby-image"

import CategoryLabel from '../categoryLabel/categoryLabel'

import Classes from './blogCard.module.scss'
import Card from '../Card/Card'
import ImageAll from '../ImageAll/ImageAll'
import AnyLink from '../AnyLink/AnyLink'


const BlogCard = ({ large, post, animate, shadow, horizontal }) => {

    return(
        <div className={["col col-xs-12", !large && !horizontal ? "col-md-6 col-lg-4" : horizontal ? "col-lg-6" : null, animate ? "fadeUp" : null ].join(' ')}>
          <Card smallPadding={!horizontal}  noPadding={horizontal} shadow={shadow} leftAligned classes={[horizontal ? Classes.horizontal : Classes.paddingBottom].join(' ')}>
            {post.featuredImage?
              // <Link to={`/blog/${post.slug}`}>
              //   <ImageAll image={post.featuredImage} alt={post.featuredImage.alt || 'Featured image'} classes={Classes.postImg}/>
              // </Link>
              <AnyLink link={`/blog/${post.slug}`} noArrow noPadding internal>
                <ImageAll image={post.featuredImage} alt={post.featuredImage.alt || 'Featured image'} classes={Classes.postImg}/>
              </AnyLink>
            : null }
            <div className={Classes.textWrapper}>
            {post.category ? post.category.map((cat, i) => <CategoryLabel key={i} category={cat.category} link={`/blog/${cat.slug}`} />) : null}
              <AnyLink link={`/blog/${post.slug}`} noArrow noPadding title={post.title} classes="h4 block-xs no-mt" internal/>
              {post.writer ? <p className="small">By { post.writer }</p> : null }
            </div>
          </Card>
        </div>
    )
}

export default BlogCard