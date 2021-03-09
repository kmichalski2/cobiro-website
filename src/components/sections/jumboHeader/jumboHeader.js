import { Link } from "gatsby"
import Img from "gatsby-image"
import React, { useState } from "react"

import Classes from "./jumboHeader.module.scss"
import Section from "../../UiElements/Section/Section"
import HeaderWText from "../../UiElements/HeaderWText/HeaderWText"
import ImageAll from "../../UiElements/ImageAll/ImageAll"

const JumboHeader = ({ data,  notificationPadding }) => {
  const bgColor = data.bgColor ? data.bgColor.hex : null
  const alignment = data.alignment
  const imageToEdges = data.imageToEdges
  const gradiantBottom = data.gradiantBottomWGradiantLine


  const textSide = (
    <div className={[
        "col col-xs-12", 
        alignment === 'centered' || alignment === 'centered-wide' || alignment === 'centered-fullscreen-image-to-bottom' ? 'col-md-8 text-center space-xs-up' : alignment === 'centered-wide-with-overlap' ? 'col-md-10 space-xs-up' : 'col-lg-6 text-left-md',
        imageToEdges && alignment !== 'centered' ? "flex flex-column center-xs" : null
        ].join(' ')}>
      <HeaderWText 
        classes={["space-xs space-sm space-md", alignment === 'centered' || alignment === 'centered-wide' || alignment === 'centered-wide-with-overlap' || alignment === 'centered-fullscreen-image-to-bottom' || imageToEdges ? 'space-xs-up' : null].join(' ')}
        centered={alignment === 'centered' || alignment === 'centered-wide' || alignment === 'centered-fullscreen-image-to-bottom' ? true : false}
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
            internal: !data.externalLinkUrl && data.link && (data.link.slug || data.link.slug === null) && true,
            button: true,
          },
          data.secondaryLinkTitle && (data.secondaryLink || data.secondaryExternalLinkUrl) ?
          {
            link: data.secondaryExternalLinkUrl || data.secondaryLink && data.secondaryLink.slug,
            title: data.secondaryLinkTitle,
            external: data.secondaryExternalLinkUrl && true,
            internal: !data.secondaryExternalLinkUrl && data.secondaryLink && (data.secondaryLink.slug || data.link.slug === null) && true,
            button: true,
            secondary: true
          }
          : ""
        ]}
        />
    </div>
  )
 
  const imageSide = data.image ? (
    <div className={[
      "col col-xs-12", 
      alignment === 'centered' ? 'col-md-8' : alignment === 'centered-wide' || alignment === 'centered-fullscreen-image-to-bottom' ? 'col-md-12' : alignment === 'centered-wide-with-overlap' ? 'col-md-12' : 'col-lg-6',
      alignment === 'image-left' ? "end-xs space-xs space-sm space-md" : null,
      imageToEdges ? "flex bottom-xs" : null
      ].join(' ')}
      >
        <ImageAll image={data.image} alt={data.image.alt || data.heading} classes={[imageToEdges ? Classes.imageToEdges : null, alignment === 'centered-wide-with-overlap' ? Classes.centerOverlap : null, alignment === 'centered-fullscreen-image-to-bottom' ? Classes.imageCenteredBottomFull : null].join(' ')} fullWidth />
    </div> 
  ) : null  
  
  return (
    <Section 
      bgColor={bgColor} 
      noBottomPadding={(imageToEdges && !data.paddingBottom) || alignment === 'centered-fullscreen-image-to-bottom'}
      paddingBottomXsSm={alignment === 'image-left'}
      addedPadding={notificationPadding}
      gradiantBottom={gradiantBottom}
      gradiantAtBottom={data.gradiantPositionAtBottom}
      bottomBgColor={data.bottomBgColor && data.bottomBgColor.hex || null}
      backgroundImage={data.backgroundImage}
      >
        <div className="container">
          <div
            className={[
              alignment === 'centered' || alignment === 'centered-wide' || alignment === 'centered-fullscreen-image-to-bottom' ? ['center-xs', Classes.centered].join(' ') : null,
              imageToEdges && alignment !== 'centered' ? "stretch-xs" : "middle-xs",
              "row",
            ].join(" ")}
          >
            { alignment === 'image-right' || alignment === 'centered' || alignment === 'centered-wide' || alignment === 'centered-fullscreen-image-to-bottom' || alignment === 'centered-wide-with-overlap' ? textSide : imageSide }
            { alignment === 'image-right' || alignment === 'centered' || alignment === 'centered-wide' || alignment === 'centered-fullscreen-image-to-bottom' || alignment === 'centered-wide-with-overlap' ? imageSide : textSide }
          </div>
        </div>
    </Section>  
  )
}

export default JumboHeader
