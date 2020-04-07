import * as React from 'react'
import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"


import Classes from './blog.module.scss'

import Layout from '../../components/layout/layout'
import SwayTop from '../../components/UiElements/SwayTop/SwayTop'

const Blog = ({ data }) => {

  const page = data.datoCmsBlogPage
  const posts = data.allDatoCmsBlogPost.edges
  const categories = data.allDatoCmsBlogCategory.edges

    const createMarkup = (text)  => {
        return {__html: text}
    }

    console.log(data)
    return (
        <Layout>
          <SwayTop topColor={{hex: "#004BD5"}} bottomColor={{hex: "#62C9FF"}} >
              <div className={["container", Classes.header].join(' ')}>
                  <div className="row middle-xs center-xs">
                      <div className="col col-xs-12 col-lg-8 text-center">
                          <h1>{ page.title }</h1>
                          <div className="space-xs-up" dangerouslySetInnerHTML={createMarkup(page.subtitle)}></div>
                          { categories.length > 0 ? categories.map((cat, i) => <Link key={i} to={`/blog/?cat=${cat.node.category.toLowerCase().split(" ").join("-")}`} className={["btn btn-white", Classes.category].join(' ')}>{ cat.node.category }</Link>) : null }

                          {/* <p className={["small text-bold", Classes.date].join(' ')}>{date}</p>
                          <h1>{ title }</h1>
                          <p>{ subtitle }</p>
                          <h4 className="space-xs-up">{ readLength } Min read - Written by { writer }</h4>
                           */}
                      </div>
                  </div>
              </div>
          </SwayTop>
          <section className="section">
            <div className="container">
              <div className="row">
                {posts.map((post, i) => (
                  <div key={i} className="col col-xs-12 col-sm-6 col-lg-4">
                    <div className={["card card-visible text-left", Classes.card].join(' ')}>
                      {post.node.featuredImage && post.node.featuredImage.fluid ?
                        <Img className={Classes.postImg} fluid={post.node.featuredImage.fluid} alt={post.node.featuredImage.alt || 'Featured image'} />
                      : post.node.featuredImage && post.node.featuredImage.url ?
                        <img className={Classes.postImg} src={post.node.featuredImage.url} alt={post.node.featuredImage.alt || 'Featured image'} />
                      : null }
                      <div className={Classes.textWrapper}>
                        <h3>{ post.node.title }</h3>
                        <p>{ post.node.subtitle }</p>
                        <Link to={`/blog/${post.node.slug}`}><span className="text-bold">Read more</span> - { post.node.readLength} min read</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </Layout>
    )
}

export const query = graphql`
{
    datoCmsBlogPage {
      title
      ctaLinks {
        ... on DatoCmsInternalLink {
          internalLink {
            ... on DatoCmsPage {
              slug
              __typename
            }
            ... on DatoCmsBlogPost {
              slug
              __typename
            }
          }
          linkTitle
        }
        ... on DatoCmsExternalLink {
          linkTitle
          externalLink
        }
      }
      footerCtaText
      footerCtaTitle
      promiseList
      promiseSignature {
        fixed {
          aspectRatio
          srcSet
          src
          width
          height
          sizes
        }
        alt
        url
      }
      promiseSignatureTitle
      promiseTitle
      subtitle
    }
    allDatoCmsBlogPost(filter: {title: {ne: null}}) {
      edges {
        node {
          title
          readLength
          subtitle
          slug
          featuredImage {
            alt
            url
            fluid {
              aspectRatio
              height
              sizes
              src
              srcSet
              width
            }
          }
        }
      }
    }
    allDatoCmsBlogCategory(filter: {category: {ne: null}}) {
      edges {
        node {
          category
        }
      }
    }
  }  
`

export default Blog