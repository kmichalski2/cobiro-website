import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"

const ExplanationImage = ({ data }) => {
  console.log("data: ", data)
  const image = (
    <div className="img-responsive space-sm space-xs">
      <Img
        fluid={data.image.fluid}
        alt={data.image.alt ? data.image.alt : data.title}
        style={{
          width: data.imageToEdge ? "50vw" : "",
          maxWidth: data.imageToEdge ? "none" : "",
        }}
      />
    </div>
  )

  const text = (
    <div className="text-padding">
      <h3 className="">{data.title}</h3>
      <p>{data.text}</p>
      <Link to={data.link.slug}>{data.linkTitle}</Link>
    </div>
  )

  return (
    <section className="section" style={{ overflow: "hidden" }}>
      <div className="container">
        <div className="row middle-xs reverse">
          <div className="col col-sm-12 col-md-6">
            {data.leftText ? text : image}
          </div>
          <div className="col col-sm-12 col-md-6">
            {data.leftText ? image : text}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExplanationImage
