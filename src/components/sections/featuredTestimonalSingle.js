import React from "react"
import Img from "gatsby-image"

const FeaturedTestimonialsSingle = ({ data }) => (
  <section className={[data.backgroundColor ? "bg-sway" : null, "section"].join(' ')} style={{ overflow: "hidden" }}>
    <div className={data.backgroundColor ? "bg-sway-inner" : null}>
    <div className="container">
      <div className="row middle-xs">
        <div className="col col-xs-12 col-lg-6 space-xs space-sm space-md">
          <div className="testimonial-text-wrapper">
            { data.quote ? <h2>{data.quote}</h2> : null }
            { data.person ? <p className="small">{data.person}</p> : null}
          </div>
        </div>
        <div className="col col-xs-12 col-lg-6">
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
    </div>
  </section>
)

export default FeaturedTestimonialsSingle
