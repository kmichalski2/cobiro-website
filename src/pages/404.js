import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <section class="section">
      <div class="container">
        <div class="row center-xs">
          <div class="col col-xs-12 col-sm-6 text-center">
            <h1>Missing page</h1>
            <p>This is not the page you are looking for.</p>
            <Link to="/" class="btn btn-large">Go to the frontpage</Link>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default NotFoundPage
