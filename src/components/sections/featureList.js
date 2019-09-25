import { Link } from "gatsby"
import React from "react"
import Img from "gatsby-image"


const FeatureList = ({ data }) => {
  return (
  <section className="section">
    <div className="container">
    {data.features.features.map((f, index) => (
      <div key={index} className={ [index > 0 ? 'feature-list-border' : null, "row middle-xs section-inner"].join(' ') } >
        <div className="col col-sm-12 col-md-4">
          <div className="img-responsive space-sm space-xs">
            <Img fluid={f.image.fluid} alt={f.image.alt ? f.image.alt : f.title} />
          </div>
        </div>
        <div className="col col-sm-12 col-md-8">
          <div className="text-padding">
            <h3 className="">{f.title}</h3>
            <p>
              {f.text}
            </p>
            <Link to={f.link.slug} target="_blank">
              {f.link.title}
            </Link>
          </div>
        </div>
      </div>
    ))}
    </div>
  </section>
)}

export default FeatureList
