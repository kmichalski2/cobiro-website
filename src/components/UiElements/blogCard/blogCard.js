import React from 'react'
import { Link } from 'gatsby'
import Img from "gatsby-image"


import Classes from './blogCard.module.scss'
import CategoryLabel from '../categoryLabel/categoryLabel'

const BlogCard = ({ large, post }) => {

    return(
        <div className={["col col-xs-12", large ? "col-md-12 col-lg-8" : "col-md-6 col-lg-4"].join(' ')}>
          <div className={["card card-visible text-left", Classes.card].join(' ')}>
            {post.featuredImage && post.featuredImage.fluid ?
              <Img className={Classes.postImg} fluid={post.featuredImage.fluid} alt={post.featuredImage.alt || 'Featured image'} />
            : post.featuredImage && post.featuredImage.url ?
              <img className={Classes.postImg} src={post.featuredImage.url} alt={post.featuredImage.alt || 'Featured image'} />
            : null }
            <div className={Classes.textWrapper}>
            {post.category.map((cat, i) => <CategoryLabel key={i} category={cat.category} link={`/blog/${cat.slug}`} />)}
              <h3>{ post.title }</h3>
              <p>{ post.subtitle }</p>
              <Link to={`/blog/${post.slug}`}><span className="text-bold">Read more</span> - { post.readLength} min read</Link>
              
            </div>
          </div>
        </div>
    )
}

export default BlogCard