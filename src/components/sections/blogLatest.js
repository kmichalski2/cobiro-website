import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Section from '../UiElements/Section/Section'
import HeaderWText from '../UiElements/HeaderWText/HeaderWText'
import BlogPosts from '../UiElements/blogPosts/blogPosts'

const BlogLatest = ({ data }) => {

    const query = useStaticQuery(graphql`
        query BlogQuery {
            allDatoCmsBlogPost(filter: {title: {ne: null}}, limit: 3) {
                nodes {
                  title
                  readLength
                  subtitle
                  slug
                  category {
                    category
                    slug
                  }
                  writer
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
    `)
        
    return (
        <Section bgColor={data.bgColor && data.bgColor.hex}>
            <div className="container">
                <div className="row center-xs">
                    <div className="col col-xs-12 col-md-8 col-lg-6">
                        <HeaderWText
                            title={data.title}
                            h2
                            text={data.text}
                            light={data.textColor === 'light'}
                            centered
                            />
                    </div>
                </div>
                <div className="row center-xs">
                    <BlogPosts 
                        blogPosts={query.allDatoCmsBlogPost.nodes}
                        shadow={data.textColor !== 'light'}
                        />
                </div>
            </div>
        </Section>
    )
}

export default BlogLatest