import React, {useState, useContext, useEffect} from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import { useStaticQuery, graphql } from "gatsby"
import {CurrentLocaleContext} from '../../layout/layout'
import Classes from './blogSearch.module.scss'
import { Link } from 'gatsby'
import BlogPosts from '../../UiElements/blogPosts/blogPosts'
import cloneDeep from 'lodash/cloneDeep';

const BlogSearch = ({ title }) => {
  const locale = useContext(CurrentLocaleContext).locale
  
  const search = useStaticQuery(graphql`
        query SearchQuery {
          localSearchBlogposts {
            store
            index
          }
        }
    `)

  const index = search.localSearchBlogposts.index
  const store = search.localSearchBlogposts.store
  const [query, setQuery] = useState('')
  const [posts, setPosts] = useState([])

  const results = useFlexSearch(query, index, JSON.parse(store))
  
  // .filter(post => {
          
  //   if(post.locale === locale) {
  //     return true
  //   } else {
  //     if(!post._allSlugLocales.some(sl => sl.locale === locale)) {
  //         return true
  //     } else {
  //       return false
  //     }
  //   }
  // }).map(post => {
  //   if(post.locale !== locale && post.locale === 'en') {
  //     let newPost = cloneDeep(post)

  //     newPost.locale = locale
  //     newPost.category.map(c => {
  //       if(c.locale !== locale) {


  //         let newCat = c

  //         c._allCategoryLocales.map(cl => {
  //           if(cl.locale === locale) {
  //             newCat.category = cl.value
  //           }
  //         })

  //         c._allSlugLocales.map(cl => {
  //           if(cl.locale === locale) {
  //             newCat.slug = cl.value
  //           }
  //         })
          

  //         return newCat
  //       } else {
  //         return c
  //       }
  //     })

  //     return newPost
  //   } else {
  //     return post
  //   }
  // })


  
  useEffect(() => {
      if(results.length > 0) {
        setPosts(results.filter(post => {
          
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
      )
    }
  }, [query])
  
  const searchHandler = (e) => {
    e.preventDefault()
  }
    return (
      <>
            <div className="col col-xs-12 space-xs-up">
              <form className={["flex stretch-xs", Classes.form].join(' ')}>
                <input type="text" name="query" placeholder={title} onChange={(e) => setQuery(e.target.value)} />
              </form>
            </div>
        <BlogPosts blogPosts={posts} shadow addedAmount={6} animate/>
        </>
    )
}


export default BlogSearch