import React from "react"
import Img from "gatsby-image"
import Section from '../UiElements/Section/Section'
import ImageAll from '../UiElements/ImageAll/ImageAll'


const FeaturedTestimonialsSingle = ({ data }) => {

  const bgColor = data.testimonialColor ? data.testimonialColor.hex : null
  const textColor = data.testimonialTextColor  === 'light' ? "text-white" : null
  
  return (
    <Section
      bgColor={bgColor}
    >
      <div className="container">
        <div className="row middle-xs">
          <div className="col col-xs-12 col-lg-6 space-xs space-sm space-md">
            <div className="testimonial-text-wrapper">
              { data.quote ? <h2 className={textColor}>{data.quote}</h2> : null }
              { data.person ? <p className={["small", textColor].join(' ')}>{data.person}</p> : null}
            </div>
          </div>
          <div className="col col-xs-12 col-lg-6">
          <ImageAll image={data.image} alt={data.image && data.image.alt ? data.image.alt : data.title}/>
          </div>
        </div>
      </div>
      </Section>
  )
}

export default FeaturedTestimonialsSingle