import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout/layout"
import SEO from "../components/seo"

const Sites = () => {
const url = window.location.href.split("/sites/").pop().replace('www.', '').replace('https://', '').replace('http://', '');
const urlToName = url.charAt(0).toUpperCase() + url.slice(1);
const urlToHref = `http://${url}`;
const urlPrettyfied = 'www.' + url;

return (
  <Layout>
    <SEO title="Sites" />
    <section className="section">
      <div className="container">
        <div className="row center-xs">
          <div className="col col-xs-12 col-sm-6 text-center">
            <h1>Hello {urlToName}</h1>
            <p>This is the page you are looking for.</p>
            <a href={urlToHref} className="btn btn-large">
              {urlPrettyfied}
            </a>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)}

export default Sites
