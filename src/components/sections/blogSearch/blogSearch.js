import React, {useState} from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import Classes from './blogSearch.module.scss'
import { Link } from 'gatsby'
import BlogPosts from '../../UiElements/blogPosts/blogPosts'


const BlogSearch = ({ data, title }) => {

  const index = data.index
  const store = data.store
  const [query, setQuery] = useState('')

  const results = useFlexSearch(query, index, JSON.parse(store))
  
  const searchHandler = (e) => {
    e.preventDefault()
  }
    return (
        <section className="section">
        <div className="container">
          <div className="row center-xs">
            <div className="col col-xs-12 col-md-8 col-lg-6 text-center space-xs-up">
            {title ? <h3 className="text-center space-xs-up">{ title }</h3> : null }
              <form className={["flex stretch-xs", Classes.form].join(' ')}>
                <input type="text" name="query" placeholder="Type to start searching..." onChange={(e) => setQuery(e.target.value)} />
              </form>
            </div>
          </div>
          <div className="row center-xs">
            <BlogPosts blogPosts={results} addedAmount={6} animate/>
          </div>
        </div>
    </section>
    )
}

export default BlogSearch