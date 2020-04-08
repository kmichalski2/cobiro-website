import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"


import Classes from './blogCard.module.scss'

const BlogCard = ({ large, post }) => {

    return(
        <div className={["col col-xs-12", large ? "col-md-12 col-lg-8" : "col-md-6 col-lg-4"].join(' ')}>
          <div className={["card card-visible text-left", Classes.card].join(' ')}>
            {post.node.featuredImage && post.node.featuredImage.fluid ?
              <Img className={Classes.postImg} fluid={post.node.featuredImage.fluid} alt={post.node.featuredImage.alt || 'Featured image'} />
            : post.node.featuredImage && post.node.featuredImage.url ?
              <img className={Classes.postImg} src={post.node.featuredImage.url} alt={post.node.featuredImage.alt || 'Featured image'} />
            : null }
            <div className={Classes.textWrapper}>
            {post.node.category.map((cat, i) => <Link key={i} to={`/blog/${cat.category.toLowerCase().split(" ").join("-")}`} className={Classes.categoryCard}>{cat.category}</Link>)}
              <h3>{ post.node.title }</h3>
              <p>{ post.node.subtitle }</p>
              <Link to={`/blog/${post.node.slug}`}><span className="text-bold">Read more</span> - { post.node.readLength} min read</Link>
              
            </div>
          </div>
        </div>
    )
}

export default BlogCard