import React, {useState} from 'react'
import Classes from './blogSearch.module.scss'
import { graphql } from 'gatsby'

const BlogSearch = ({ data }) => {
    console.log(data, "searchQuery")


    const [searchTerm, setSearchTerm] = useState("")
    const [searchResult, setSearchResult] = useState("")

    const searchHandler = (e) => {
        e.preventDefault()
        setSearchResult(`You just searhed for "${searchTerm}". However, the search is not ready yet :( Stay tuned!`)
      }

    return (
        <section className="section">
        <div className="container">
          <div className="row center-xs">
            <div className="col col-xs-12 col-md-8 col-lg-6 text-center">
              <form className={["flex stretch-xs", Classes.form].join(' ')}>
                <input type="text" name="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button className="btn" onClick={searchHandler}>
                  Search
                </button>
              </form>
              {searchResult ? <p>{searchResult}</p> : null}
            </div>
          </div>
        </div>
    </section>
    )
}

export const query = graphql`
  {
    localSearchBlogposts {
      engine
      id
      index
      store
    }
  }
`

export default BlogSearch
