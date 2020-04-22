import React from 'react'
import { Link } from 'gatsby'
import Img from "gatsby-image"

import CategoryLabel from '../categoryLabel/categoryLabel'

import Classes from './blogCard.module.scss'
import Card from '../Card/Card'
import ImageAll from '../ImageAll/ImageAll'


const BlogCard = ({ large, post, animate, shadow }) => {

    return(
        <div className={["col col-xs-12", large ? "" : "col-md-6 col-lg-4", animate ? "fadeUp" : null ].join(' ')}>
          <Card smallPadding shadow={shadow} leftAligned>
            {post.featuredImage && post.featuredImage.fluid ?
              <Link to={`/blog/${post.slug}`}>
                <ImageAll image={post.featuredImage} alt={post.featuredImage.alt || 'Featured image'} classes={Classes.postImg}/>
              </Link>
            : post.featuredImage && post.featuredImage.url ?
              <img className={Classes.postImg} src={post.featuredImage.url} alt={post.featuredImage.alt || 'Featured image'} />
            : null }
            <div className={Classes.textWrapper}>
            {post.category ? post.category.map((cat, i) => <CategoryLabel key={i} category={cat.category} link={`/blog/${cat.slug}`} />) : null}
              <Link to={`/blog/${post.slug}`}>
                <h4>{ post.title }</h4>
              </Link>
              <p className="small">By { post.writer }</p>
            </div>
          </Card>
        </div>
    )
}

export default BlogCard