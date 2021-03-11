import React from 'react'
import { Link } from 'gatsby'
import Img from "gatsby-image"

import CategoryLabel from '../categoryLabel/categoryLabel'

import * as Classes from './blogCard.module.scss'
import Card from '../Card/Card'
import ImageAll from '../ImageAll/ImageAll'
import AnyLink from '../AnyLink/AnyLink'


const BlogCard = ({ large, post, animate, shadow, horizontal }) => {

    return(
        <div className={["col col-xs-12", !large && !horizontal ? "col-md-6 col-lg-4" : horizontal ? "col-lg-6" : null, animate ? "fadeUp" : null, Classes.cardWrapper].join(' ')}>
          <Card smallPadding={!horizontal} noPadding={horizontal} shadow={shadow} leftAligned classes={[horizontal ? Classes.horizontal : Classes.paddingBottom, Classes.cardVisible].join(' ')}>
            {post.featuredImage?
              <AnyLink link={`/blog/${post.slug}`} noArrow noPadding internal>
                <ImageAll image={post.featuredImage} alt={post.featuredImage.alt || 'Featured image'} classes={Classes.postImg}/>
              </AnyLink>
            : null }
              <AnyLink link={`/blog/${post.slug}`} noArrow noPadding title={post.title} classes="h4 block-xs no-mt" internal/>
              <div className={Classes.textWrapper}>
                {post.category && post.category[0] ? 
                  <CategoryLabel category={post.category[0].category} link={`/blog/${post.category[0].slug}`} /> 
                : null}
                {post.readLength ? <p><span className={Classes.dotPaddingRight}>&bull;</span>{ post.readLength } min read</p> : null }
            </div>
          </Card>
        </div>
    )
}

export default BlogCard