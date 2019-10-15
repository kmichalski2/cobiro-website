import { Link } from "gatsby"
import React from "react"
import Img from "gatsby-image"


const FeatureList = ({ data }) => {
  return (
    <section className={[data.backgroundColor ? "bg-sway" : null, "section"].join(' ')}>
      <div className={data.backgroundColor ? "bg-sway-inner" : null}>
        <div className="container">
        {data.features.features.map((f, index) => (
          <div key={index} className={ [index > 0 ? 'feature-list-border' : null, "row middle-xs section-inner"].join(' ') } >
            <div className="col col-sm-12 col-md-4">
              <div className="img-responsive space-sm space-xs">
                {f.image.fluid ?
                <Img fluid={f.image.fluid} alt={f.image.alt ? f.image.alt : f.title} />
                :
                <img src={f.image.url} alt={f.image.alt ? f.image.alt : f.title} />
                }
              </div>
            </div>
            <div className="col col-sm-12 col-md-8">
              <div className="text-padding">
                { f.title ? <h3 className="">{f.title}</h3> : null }
                { f.text ? <p>{f.text}</p> : null }
                {f.link ?
                  <Link to={f.link.slug ? f.link.slug : '/'} target="_self">
                  {f.link.title}
                  </Link>
                  : null
                }
              </div>
            </div>
          </div>
        ))}
        </div>
    </div>
  </section>
)}

export default FeatureList
