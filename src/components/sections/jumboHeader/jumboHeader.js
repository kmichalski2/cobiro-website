import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"

import Classes from "./jumboHeader.module.scss"
import Section from "../../UiElements/Section/Section"
import HeaderWText from "../../UiElements/HeaderWText/HeaderWText"
import ImageAll from "../../UiElements/ImageAll/ImageAll"

const JumboHeader = ({ data }) => {

  const bgColor = data.bgColor ? data.bgColor.hex : null
  const alignment = data.alignment
  const imageToEdges = data.imageToEdges

  console.log(bgColor)

  const textSide = (
    <div className={[
        "col col-xs-12", 
        alignment === 'centered' ? 'col-md-8 text-center space-xs-up' : 'col-lg-6 text-left-md',
        imageToEdges && alignment !== 'centered' ? "flex flex-column center-xs top-xs" : null
        ].join(' ')}>
      <HeaderWText 
        classes={["space-xs space-sm space-md", alignment === 'centered' || imageToEdges ? 'space-xs-up' : null].join(' ')}
        centered={alignment === 'centered' ? true : false}
        icon={data.icon}
        iconTitle={data.iconTitle}
        title={data.heading}
        h1
        text={data.text}
        light={data.textColor === 'light'}
        links={[
          {
            link: data.externalLinkUrl || data.link && data.link.slug,
            title: data.linkTitle,
            external: data.externalLinkUrl && true,
            internal: data.link && data.link.slug && true,
            button: true,
            large: true,
          }
        ]}
        />
    </div>
  )
 
  const imageSide = data.image ? (
    <div className={[
      "col col-xs-12", 
      alignment === 'centered' ? 'col-md-8' : 'col-lg-6',
      alignment === 'image-left' ? "end-xs space-xs space-sm space-md" : null,
      imageToEdges ? "flex bottom-xs" : null
      ].join(' ')}
      >
        <ImageAll image={data.image} alt={data.image.alt || data.heading} classes={imageToEdges ? Classes.imageToEdges : null} fullWidth />
    </div> 
  ) : null  
  
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
            { alignment === 'image-right' || alignment === 'centered' ? textSide : imageSide }
            { alignment === 'image-right' || alignment === 'centered' ? imageSide : textSide }
          </div>
        </div>
    </Section>  
  )
}

export default JumboHeader
