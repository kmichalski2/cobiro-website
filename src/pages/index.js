import React from "react"
import Layout from "../components/layout/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1 style={{ textAlign: 'center', margin: '2rem 0'}}>Hi people</h1>
  </Layout>
)

export default IndexPage
