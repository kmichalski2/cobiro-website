import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"

import Classes from "./jumboHeader.module.scss"
import Section from "../../UiElements/section/Section"

const JumboHeader = ({ data }) => {

  const bgColor = data.bgColor ? data.bgColor.hex : null
  const alignment = data.alignment
  const imageToEdges = data.imageToEdges
  const textColor = data.textColor === 'dark' ? "text-black" : "text-white"
  const btnColor = data.textColor === 'light' ? "btn-white" : null

  const createMarkup = (text)  => {
    return {__html: text}
  }

  const textSide = (
    <div className={[
        "col col-xs-12", 
        alignment === 'centered' ? 'col-md-8 text-center space-xs-up' : 'col-lg-6 text-left-md',
        imageToEdges && alignment !== 'centered' ? "flex flex-column center-xs top-xs" : null
        ].join(' ')}>
      { data.heading ? <h1 className={textColor}>{data.heading}</h1> : null }
      { data.text ? <div className={["space-big-xs-up", textColor].join(' ')} dangerouslySetInnerHTML={createMarkup(data.text)}></div> : null }
      {data.externalLinkUrl ? (
        <a href={data.externalLinkUrl} className={["btn btn-large space-xs space-sm space-md", btnColor, alignment === 'centered' ? 'space-xs-up' : null].join(' ')} target="_blank" rel="noopener noreferrer">{data.linkTitle}</a>
      ) : data.link ?
      (
        <Link to={data.link.slug ? data.link.slug : '/'} className={["btn btn-large space-xs space-sm space-md", btnColor, alignment === 'centered' ? 'space-xs-up' : null ].join(' ')}>
          {data.linkTitle}
        </Link>
      ): null }
    </div>
  )
 
  const imageSide = (
    <div className={[
      "col col-xs-12", 
      alignment === 'centered' ? 'col-md-8' : 'col-lg-6',
      alignment === 'image-left' ? "end-xs space-xs space-sm space-md" : null,
      imageToEdges ? "flex bottom-xs" : null
      ].join(' ')}
      >
      {data.image.fluid ?
        <Img
          loading="eager"
          fadeIn={false}
          fluid={data.image.fluid}
          className={["img-responsive img-full-width", imageToEdges ? Classes.imageToEdges : null].join(' ')}
          alt={data.image.alt ? data.image.alt : data.heading}
          />
      : 
        <img src={data.image.url} 
          className="img-responsive img-full-width"
          alt={data.image.alt ? data.image.alt : data.heading} 
          />
      }
    </div> 
  )
  
  return (
    <Section 
      bgColor={bgColor} 
      noBottomPadding={imageToEdges}
      paddingBottomXsSm={alignment === 'image-left'}
      >
        <div className="container">
          <div
            className={[
              alignment === 'centered' ? ['center-xs', Classes.centered].join(' ') : null,
              imageToEdges && alignment !== 'centered' ? "stretch-xs" : "middle-xs",
              "row",
            ].join(" ")}
          >
            { alignment === 'image-right' ? textSide : alignment === 'image-left' ? imageSide : alignment === 'centered' ? textSide : null }
            { alignment === 'image-right' ? imageSide : alignment === 'image-left' ? textSide : alignment === 'centered' ? imageSide : null }
          </div>
        </div>
    </Section>  
  )
}

export default JumboHeader
