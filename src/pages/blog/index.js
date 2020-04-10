import React, { useState } from 'react'
import { graphql, Link } from 'gatsby'
import Img from "gatsby-image"
import Search from '../../components/sections/blogSearch/blogSearch'


import Classes from './blog.module.scss'
import BlogCard from '../../components/UiElements/blogCard/blogCard'
import Layout from '../../components/layout/layout'
import SwayTop from '../../components/UiElements/SwayTop/SwayTop'
import JumboCta from '../../components/sections/jumboCta/jumboCta'
import BlogPosts from '../../components/UiElements/blogPosts/blogPosts'
import CategoryLabel from '../../components/UiElements/categoryLabel/categoryLabel'
import BlogSearch from '../../components/sections/blogSearch/blogSearch'

const Blog = ({ data }) => {

  const page = data.datoCmsBlogPage
  const posts = data.allDatoCmsBlogPost.edges
  const categories = data.allDatoCmsBlogCategory.edges
  const topColor = page.topGradiantColor.hex || "#004BD5"
  const bottomColor = page.bottomGradiantColor.hex || "#62C9FF"

  const [numberOfPosts, setNumberOfPosts] = useState(5 + 3)
  // const [searchTerm, setSearchTerm] = useState("")
  // const [searchResult, setSearchResult] = useState("")

  // const searchHandler = (e) => {
  //   e.preventDefault()
  //   setSearchResult(`You just searhed for ${searchTerm}. However, the search is not ready yet :( Stay tuned!`)
  // }

    const createMarkup = (text)  => { 
        return {__html: text}
    }


    for (var i = 0; i < 5; i++) {
      latestPosts.push(
        <BlogCard key={i} large={i === 0 ? true : false} post={posts[i]} />
      )
    }

    for (var i = 5; i < numberOfPosts; i++) {
      postsRest.push(
        <BlogCard key={i} post={posts[i]} />
      )
    }

    const morePostsHandler = () => {

      console.log(posts.length, numberOfPosts)
      if(posts.length < (numberOfPosts + 3)) {
        setNumberOfPosts(posts.length)
      } else {
        setNumberOfPosts(numberOfPosts + 3)
      }
    }

    return (
        <Layout>
          <SwayTop topColor={{hex: topColor}} bottomColor={{hex: bottomColor}} >
              <div className={["container", Classes.header].join(' ')}>
                  <div className="row middle-xs center-xs">
                      <div className="col col-xs-12 col-lg-8 text-center">
                          <h1>{ page.title }</h1>
                          <div className="space-xs-up" dangerouslySetInnerHTML={createMarkup(page.subtitle)}></div>
                          { categories.length > 0 ? categories.map((cat, i) => <CategoryLabel key={i} category={cat.node.category} link={`/blog/${cat.node.slug}`} large />) : null }
                      </div>
                  </div>
              </div>
          </SwayTop>
          <section className="section">
            <div className="container">
              <div className="row">
                <BlogPosts blogPosts={posts} offset={0} fixedMax={5} addedAmount={3} firstLarge/>
              </div>
            </div>
          </section>
          <section className="section bg-lightblue-sway">
            <div className="container">
              <div className="row center-xs space-xs-up middle-xs">
                <div className="col col-xs-12 col-sm-6 col-lg-4">
                  <h2 className="h1 text-left-xs text-right-sm">{page.promiseTitle}</h2>
                </div>
                <div className="col col-xs-12 col-sm-6  col-lg-4">
                  <ul className="list-unstyled price-list">
                  {page.promiseList.map((l, i) => <li key={i}>{l}</li>)}
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className={["col col-xs-12 text-left-xs text-center-sm flex center-sm middle-xs", Classes.cobiroPromise].join(' ')}>
                  {page.promiseSignature && page.promiseSignature.fixed ?
                    <Img fixed={page.promiseSignature.fixed} alt={page.promiseSignature.alt || 'Cobiro promise signature'} />
                  : page.promiseSignature && page.promiseSignature.url ?
                    <img src={page.promiseSignature.url} alt={page.promiseSignature.alt || 'Cobiro promise signature'} />
                  : null
                  }
                  <p>{ page.promiseSignatureTitle }</p>
                </div>
              </div>
              </div>
            </section>
            <section className="section">
              <div className="container">
              <div className="row">
                <BlogPosts blogPosts={posts} offset={5} addedAmount={6} />
              </div>
            </div>
          </section>
          <BlogSearch data={data.localSearchBlogposts}/>
          <JumboCta data={{topGradiantColor: {hex: topColor}, bottomGradiantColor: {hex: bottomColor}, backgroundColor: true, title: page.footerCtaTitle, text: page.footerCtaText, linkTitle: page.ctaLinks && page.ctaLinks[0] ? page.ctaLinks[0].linkTitle : null, link: page.ctaLinks && page.ctaLinks[0].internalLink ? {slug: `${page.ctaLinks[0].internalLink.__typename === "DatoCmsBlogPost" ? '/blog/' : ""}${page.ctaLinks[0].internalLink.slug}`} : null, externalLinkCta: (page.ctaLinks && page.ctaLinks[0].externalLink) ? page.ctaLinks[0].externalLink : null}}  />
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
      topGradiantColor {
        hex
      }
      bottomGradiantColor {
        hex
      }
      promiseSignature {
        fixed(width: 150) {
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
          category {
            category
            slug
          }
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
          slug
        }
      }
    }
    localSearchBlogposts {
      store
      index
    }
  }
    
`

export default Blog