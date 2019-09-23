import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"

import JumboHeaderStyles from "./jumboHeader.module.scss"

// import image from "../../../images/placeholder_new_jumbo.png"
// import imageFloating from "../../../images/placeholder_jumboimage.png"
// import fb_iamge from "../../../images/placeholder_fb_jumbo.png"
// import gPartner from "../../../images/placeholder_google_partner.png"
// import gcss from "../../../images/placeholder_css.png"

const JumboHeader = props => {
  const data = props.data
  console.log(data)
  const textSide = (
    <div className="col col-xs-12 col-md-6 text-left-md">
      <div className={[JumboHeaderStyles.text, "text-padding"].join(" ")}>
        <h1>{data.heading}</h1>
        <p>{data.text}</p>
        {data.externalLink ? (
          <a href={data.externalLinkUrl}>{data.linkTitle}</a>
        ) : (
          <Link to={data.link.slug} className="btn btn-large space-xs space-sm">
            {data.linkTitle}
          </Link>
        )}
      </div>
    </div>
  )

  const imageSide = (
    <div className="col col-xs-12 col-md-6">
      <Img
        fluid={data.image.fluid}
        className={[
          data.textLeftAlignment
            ? JumboHeaderStyles.toRight
            : JumboHeaderStyles.notToBottom,
          JumboHeaderStyles.jumboImage,
          "img-responsive img-full-width",
        ].join(" ")}
        alt={data.image.alt ? data.image.alt : data.heading}
      />
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
