import React, {useState} from 'react'
import { useFlexSearch } from 'react-use-flexsearch'
import Classes from './blogSearch.module.scss'
import { Link } from 'gatsby'


const BlogSearch = ({ data }) => {

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
            <div className="col col-xs-12 col-md-8 col-lg-6 text-center">
            <h3 className="text-center space-xs-up">Looking for something specific?</h3>
              <form className={["flex stretch-xs", Classes.form].join(' ')}>
                <input type="text" name="query" placeholder="Type to start searching..." onChange={(e) => setQuery(e.target.value)} />
                { /* <button className="btn" onClick={searchHandler} type="submit">Search</button> */ }
              </form>
              <ul>

                {results.length >= 1 ? results.map(result => (
                  <Link to={`/blog/${result.slug}`} key={result.slug}>
                    <li className={["space-xs-up card card-visible card-link", Classes.results].join(' ')}>
                      <h4 className="text-blue">{result.title}</h4>
                      {result.writer ? 
                          <div>
                            <p className={["text-xs-small text-mediumblack", Classes.writer, Classes.categoryCard].join(' ')}>{result.writer}</p>
                          </div>
                      : null }
                      <p className="text-xs-small text-lightblack">{result.subtitle}</p>
                    </li>
                  </Link>
                 
                )) 
                : null }
                </ul>
            </div>
          </div>
        </div>
    </section>
    )
}

export default BlogSearch