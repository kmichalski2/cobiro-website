import React, {useState} from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import { useStaticQuery, graphql } from "gatsby"

import Classes from './blogSearch.module.scss'
import { Link } from 'gatsby'
import BlogPosts from '../../UiElements/blogPosts/blogPosts'


const BlogSearch = ({ title }) => {

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

  const results = useFlexSearch(query, index, JSON.parse(store))
  
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
        <BlogPosts blogPosts={results} shadow addedAmount={6} animate/>
        </>
    )
}


export default BlogSearch