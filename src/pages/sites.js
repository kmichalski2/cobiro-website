import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"

const Sites = () => (
  <Layout>
    <SEO title="Sites" />
    <section class="section">
      <div class="container">
        <div class="row center-xs">
          <div class="col col-xs-12 col-sm-6 text-center">
            <h1>Sites</h1>
            <p>This is the page you are looking for.</p>
            <Link to="/" class="btn btn-large">
              Go to the page
            </Link>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default Sites
