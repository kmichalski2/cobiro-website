import React from "react"
import Img from "gatsby-image"
// import splash from "../../images/left-splash.png"
import GoogleLogo from '../googleLogo/googleLogo'

const FeaturedCompanies = ({ data }) => (
  <section className={[data.backgroundColor ? "bg-sway" : null, "section"].join(' ')} style={{ position: "relative" }}>
    <div className={[data.backgroundColor ? "bg-sway-inner" : null, "section-inner"].join(' ')}>
      <div className="container">
        <div className="row center-xs middle-xs text-center">
          <div className="col col-xs-12 section-header">
            { data.title ? <h2>{data.title}</h2> : null }
            { data.text ? <p>{data.text}</p> : null }
          </div>
          <div className="col col-xs-12 col-lg-8 center">
          {data.googlePartnerLogo ? <div style={{transform: "scale(0.8)"}}><GoogleLogo /></div> : null }
          {data.logos.map((l, index) => (
            l.fixed ? <Img key={index} className="customer-logo" fixed={l.fixed} alt={l.alt ? l.alt : `logo ${index + 1}`} />
            : <img src={l.url} alt={l.alt ? l.alt : `logo ${index + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
  
)

export default FeaturedCompanies
