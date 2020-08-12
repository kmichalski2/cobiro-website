import React, {useContext} from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Section from '../UiElements/Section/Section'
import HeaderWText from '../UiElements/HeaderWText/HeaderWText'
import BlogPosts from '../UiElements/blogPosts/blogPosts'
import {CurrentLocaleContext} from '../layout/layout'
import cloneDeep from 'lodash/cloneDeep';

const BlogLatest = ({ data }) => {

    const query = useStaticQuery(graphql`
        query BlogQuery {
            allDatoCmsBlogPost(sort: {fields: date}, filter: {title: {ne: null}}, limit: 3) {
                nodes {
                  title
                  readLength
                  subtitle
                  slug
                  locale
                  category {
                    category
                    slug
                    _allCategoryLocales {
                        locale
                        value
                    }
                    _allSlugLocales {
                        locale
                        value
                      }
                  }
                  _allSlugLocales {
                    locale
                    value
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

    const locale = useContext(CurrentLocaleContext)
        
    const posts = query.allDatoCmsBlogPost.nodes.filter(post => {
           
        if(post.locale === locale) {
          return true
        } else {
         if(!post._allSlugLocales.some(sl => sl.locale === locale)) {
             return true
         } else {
           return false
         }
        }
      }).map(post => {
        if(post.locale !== locale && post.locale === 'en') {
          let newPost = cloneDeep(post)
  
          newPost.locale = locale
          newPost.category.map(c => {
            if(c.locale !== locale) {
  
  
              let newCat = c
  
              c._allCategoryLocales.map(cl => {
                if(cl.locale === locale) {
                 newCat.category = cl.value
                }
              })
  
              c._allSlugLocales.map(cl => {
               if(cl.locale === locale) {
                 newCat.slug = cl.value
               }
             })
              
  
             return newCat
            } else {
              return c
            }
          })
  
          return newPost
        } else {
          return post
        }
      })


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
                        blogPosts={posts}
                        shadow={data.textColor !== 'light'}
                        />
                </div>
            </div>
        </Section>
    )
}

export default BlogLatest