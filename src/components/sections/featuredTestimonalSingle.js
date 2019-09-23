import React from "react"
import Img from "gatsby-image"

import splash from "../../images/splash_testimonial_single.svg"

const FeaturedTestimonialsSingle = ({ data }) => (
  <section className="section" style={{ overflow: "hidden" }}>
    <div className="container">
      <div className="row middle-xs">
        <div className="col col-xs-12 col-md-6 space-xs space-sm">
          <h4>{data.quote}</h4>
          <p className="small">{data.person}</p>
        </div>
        <div className="col col-xs-12 col-md-6">
          <Img
            fluid={data.image.fluid}
            className="testimonial-image"
            alt={data.image.alt ? data.image.alt : data.title}
          />
        </div>
      </div>
    </div>
    <img className="splash-right" src={splash} alt="splash shape testimonial" />
  </section>
)

export default FeaturedTestimonialsSingle
