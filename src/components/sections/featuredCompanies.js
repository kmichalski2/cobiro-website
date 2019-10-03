import React from "react"
import Img from "gatsby-image"
// import splash from "../../images/left-splash.png"

const FeaturedCompanies = ({ data }) => (
  <section className="section" style={{ position: "relative" }}>
    {/* <img src={splash} className="splash-left" alt="splash left" /> */}
    <div className="section-inner">
      <div className="container">
        <div className="row center-xs middle-xs text-center">
          <div className="col col-xs-12 section-header">
            { data.title ? <h2>{data.title}</h2> : null }
            { data.text ? <p>{data.text}</p> : null }
          </div>
          {data.logos.map((l, index) => (
            <div key={index} className="customer-logo col col-xs-6 col-md-3">
              {l.fixed ?
              <Img fixed={l.fixed} alt={l.alt ? l.alt : `logo ${index + 1}`} />
              :
              <img src={l.url} alt={l.alt ? l.alt : `logo ${index + 1}`} />
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

export default FeaturedCompanies
