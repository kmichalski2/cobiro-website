import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"
import AnyLink from "../components/UiElements/AnyLink/AnyLink"

// const location = window.location && window.location.search || ''

const NotFoundPage = ({location}) => (
  <Layout 
    menuInverted
    location={location}
    >
    <SEO title="404: Not found" />
    <section className="section" style={{padding: '10rem 0'}}>
      <div className="container">
        <div className="row center-xs">
          <div className="col col-xs-12 col-sm-6 text-center">
            <h1>Missing page</h1>
            <p>This is not the page you are looking for.</p>
            <AnyLink internal noArrow link="/" title="Go to the frontpage" classes="btn btn-large" />
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default NotFoundPage
