import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"

import expImageStyles from './explanationImage.module.scss'

const ExplanationImage = ({ data }) => {

  const createMarkup = (text)  => {
    return {__html: text}
  }

  const topColor = data.topGradiantColor ? data.topGradiantColor.hex : null
  const bottomColor = data.bottomGradiantColor ? data.bottomGradiantColor.hex : null


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
      {data.title ? <h3 className={bottomColor && topColor ? "text-white" : null}>{data.title}</h3> : null}
      {data.text ? <div className={[bottomColor && topColor ? "text-white" : null, "space-xs-up"].join(' ')} dangerouslySetInnerHTML={createMarkup(data.text)}></div> : null}
      {data.link ? 
      <Link className={[bottomColor && topColor && data.showAsButton ? "btn-white" : bottomColor && topColor ? "text-white" : null, data.showAsButton ? "btn" : null].join(' ')} to={data.link.slug ? `/${data.link.slug}` : '/'}>{data.linkTitle}</Link>
      : data.externalLinkUrl ?
      <a className={[bottomColor && topColor && data.showAsButton ? "btn-white" : bottomColor && topColor ? "text-white" : null, data.showAsButton ? "btn" : null].join(' ')} href={data.externalLinkUrl}>{data.linkTitle}</a>
      : null}
    </div>
  )

  return (
    <section className={[data.backgroundColor ? "bg-sway" : null, "section", expImageStyles.section].join(' ')} style={bottomColor && topColor ? {backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='1920' height='991' preserveAspectRatio='none' viewBox='0 0 1920 991'%3E%3Cdefs%3E%3ClinearGradient id='linear-gradient' x1='0.5' x2='0.5' y2='1' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='${topColor.replace('#', '%23')}'/%3E%3Cstop offset='1' stop-color='${bottomColor.replace('#', '%23')}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath id='Union_1' data-name='Union 1' d='M.131,962.464,0,890.961,1920,891v51.7c-230.811-18.689-529.927-18.448-759.2.643-130.454,10.863-237.672,27.13-371.091,37.193C696.169,987.6,591.484,991,486.5,991,307.236,991,127.107,981.076.131,962.464ZM0,890.961V48.295c230.811,18.689,529.927,18.448,759.2-.643,130.454-10.863,237.672-27.13,371.091-37.193,253.279-19.1,588.247-11.433,789.581,18.077l.13,71.5h-.13V890.961Z' transform='translate(0 0)' fill='url(%23linear-gradient)'/%3E%3C/svg%3E%0A")`, backgroundSize: '100% 100%'} : null}>
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
