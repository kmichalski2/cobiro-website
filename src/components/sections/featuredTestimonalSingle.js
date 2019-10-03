import React from "react"
import Img from "gatsby-image"

const FeaturedTestimonialsSingle = ({ data }) => (
  <section className="section" style={{ overflow: "hidden" }}>
    <div className="container">
      <div className="row middle-xs">
        <div className="col col-xs-12 col-md-6 space-xs space-sm">
          <h4>{data.quote}</h4>
          <p className="small">{data.person}</p>
        </div>
        <div className="col col-xs-12 col-md-6">
          {data.image.fluid ?
          <Img
            fluid={data.image.fluid}
            className="testimonial-image"
            alt={data.image.alt ? data.image.alt : data.title}
          />
          :
          <img
            src={data.image.url}
            className="testimonial-image"
            alt={data.image.alt ? data.image.alt : data.title}
          />
          }
        </div>
      </div>
    </div>
  </section>
)

export default FeaturedTestimonialsSingle
