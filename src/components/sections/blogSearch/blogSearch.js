import React, {useState} from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import Classes from './blogSearch.module.scss'
import { graphql } from 'gatsby'

const BlogSearch = ({ data }) => {

  const index = data.localSearchBlogposts.index
  const store = data.localSearchBlogposts.store
  const results = useFlexSearch(query, index, store)

  const [searchTerm, setSearchTerm] = useState("")
  const [searchResult, setSearchResult] = useState("")
  const [query, setQuery] = useState(null)

    const searchHandler = (e) => {
        e.preventDefault()
        setSearchResult(`You just searhed for "${searchTerm}". However, the search is not ready yet :( Stay tuned!`)
      }

    return (
        <section className="section">
        <div className="container">
          <div className="row center-xs">
            <div className="col col-xs-12 col-md-8 col-lg-6 text-center">
              <form className={["flex stretch-xs", Classes.form].join(' ')}
              defaultValue={{ query: '' }}
                // initialValues={{ query: '' }}
                onSubmit={(values, { setSubmitting }) => {
                  setQuery(values.query)
                  setSubmitting(false)
                }}
              >
                <input type="text" name="query" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="btn" onClick={searchHandler} type="submit">
                  Search
                </button>
              </form>
              <h4>Results:</h4>
              <ul>
                {results ? results.map(result => (
                  <li key={result.id}>{result.title} you searched!</li>
                )) : <p>No results</p>}
              </ul>
                { /* searchResult ? <p>{searchResult}</p> : null */ }
            </div>

          </div>
        </div>
    </section>
    )
}

export default BlogSearch
