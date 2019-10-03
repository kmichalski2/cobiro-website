import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"

import JumboHeaderStyles from "./jumboHeader.module.scss"

const JumboHeader = props => {
  const data = props.data
  console.log('jumbo data: ', data)
  const textSide = (
    <div className="col col-xs-12 col-md-6 text-left-md">
      <div className={[JumboHeaderStyles.text, "text-padding"].join(" ")}>
        { data.heading ? <h1>{data.heading}</h1> : null }
        { data.text ? <p>{data.text}</p> : null }
        {data.externalLinkUrl ? (
          <a href={data.externalLinkUrl} className="btn btn-large space-xs space-sm">{data.linkTitle}</a>
        ) : data.link ?
        (
          <Link to={data.link.slug ? data.link.slug : '/'} className="btn btn-large space-xs space-sm">
            {data.linkTitle}
          </Link>
        ): null }
      </div>
    </div>
  )

  const imageSide = (
    <div className="col col-xs-12 col-md-6">
      {data.image.fluid ?
      <Img
      fluid={data.image.fluid}
      className="img-responsive img-full-width"
      alt={data.image.alt ? data.image.alt : data.heading}
      />
      : 
      <img src={data.image.url} 
        className="img-responsive img-full-width"
        alt={data.image.alt ? data.image.alt : data.heading} />
      }
    </div> 
  )
  
  return (
    <section>
      <div
        className={[
          JumboHeaderStyles.JumboHeader,
          data.textLeftAlignment
            ? JumboHeaderStyles.textLeft
            : JumboHeaderStyles.textRight,
          "section-inner",
        ].join(" ")}
      >
        <div className="container">
          <div
            className={[
              props.imageToBottom ? "bottom-xs" : "middle-xs",
              "row",
            ].join(" ")}
          >
            {data.textLeftAlignment ? textSide : imageSide}
            {data.textLeftAlignment ? imageSide : textSide}
          </div>
        </div>
        {/* { props.textAlignment === 'left' ? swayHighLeft : swayHighRight } */}
      </div>
      {/* { props.jumboFooter ? jumboFooter : null }		 */}
    </section>
  )
}

export default JumboHeader
