import React, {useState} from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import Classes from './blogSearch.module.scss'
import { graphql } from 'gatsby'

const BlogSearch = ({ data }) => {

  const index = data.localSearchBlogposts.index
  const store = data.localSearchBlogposts.store
  const [query, setQuery] = useState('')

  const results = useFlexSearch(query, index, store)

  console.log(results, 'results')
  // console.log(index, 'index')
  // console.log(store, 'store)

  const [searchTerm, setSearchTerm] = useState("")
  const [searchResult, setSearchResult] = useState("")
  
    const searchHandler = (e) => {
        e.preventDefault()
        // setQuery(searchTerm)
        // setSearchResult(`You just searhed for "${searchTerm}". However, the search is not ready yet :( Stay tuned!`)
      }

    return (
        <section className="section">
        <div className="container">
          <div className="row center-xs">
            <div className="col col-xs-12 col-md-8 col-lg-6 text-center">
              <form className={["flex stretch-xs", Classes.form].join(' ')}>
                <input type="text" name="query" onChange={(e) => setQuery(e.target.value)} />
                { /* <button className="btn" onClick={searchHandler} type="submit">Search</button> */ }
              </form>
              <h4>Results:</h4>
              <ul>
                { /* results.map(result => (
                  <li key={result.id}>{result.title}</li>
                )) */ }
              </ul>
                { /* searchResult ? <p>{searchResult}</p> : null */ }
            </div>
          </div>
        </div>
    </section>
    )
}

export default BlogSearch