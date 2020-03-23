import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"

import expImageStyles from './explanationImage.module.scss'

const ExplanationImage = ({ data }) => {

  const createMarkup = (text)  => {
    return {__html: text}
  }



  const image = (
    <div className={["space-sm space-xs", data.leftText && data.imageToEdge ? expImageStyles.imageLeftEdge : !data.leftText && data.imageToEdge ? expImageStyles.imageRightEdge : "img-responsive"].join(' ')}>
      {data.image.fluid ?
        <Img
        fluid={data.image.fluid}
        alt={data.image.alt ? data.image.alt : data.title}
        />
        :
        <img
        src={data.image.url}
        alt={data.image.alt ? data.image.alt : data.title}
        />
        }
    </div>
  )

  const text = (
    <div className="text-padding">
      {data.title ? <h3 className="">{data.title}</h3> : null}
      {data.text ? <div className="space-xs-up" dangerouslySetInnerHTML={createMarkup(data.text)}></div> : null}
      {data.link ? 
      <Link className={data.showAsButton ? "btn" : null} to={data.link.slug ? `/${data.link.slug}` : '/'}>{data.linkTitle}</Link>
      : data.externalLinkUrl ?
      <a className={data.showAsButton ? "btn" : null} href={data.externalLinkUrl}>{data.linkTitle}</a>
      : null}
    </div>
  )

  return (
    <section className={[data.backgroundColor ? "bg-sway" : null, "section", expImageStyles.section].join(' ')}>
      <div className={data.backgroundColor ? "bg-sway-inner" : null}>
        <div className="container">
          <div className="row middle-xs reverse">
            <div className={[data.leftText ? "last-xs last-sm first-md first-lg first-xl" : null, "col col-sm-12 col-md-6"].join(' ')}>
              {data.leftText ? text : image}
            </div>
            <div className="col col-sm-12 col-md-6">
              {data.leftText ? image : text}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExplanationImage
