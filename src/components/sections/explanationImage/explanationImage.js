import React from "react"

import expImageStyles from './explanationImage.module.scss'
import Section from "../../UiElements/Section/Section"
import HeaderWText from "../../UiElements/HeaderWText/HeaderWText"
import ImageAll from "../../UiElements/ImageAll/ImageAll"

const ExplanationImage = ({ data }) => {

  const image = (
    <div className={["space-sm space-xs", data.leftText && data.imageToEdge ? expImageStyles.imageLeftEdge : !data.leftText && data.imageToEdge ? expImageStyles.imageRightEdge : null].join(' ')}>
      <ImageAll 
        image={data.image}
        alt={data.image.alt ? data.image.alt : data.title}
        />
    </div>
  )

  const text = (
    <div className="text-padding">
      <HeaderWText
        title={data.title}
        h2
        text={data.text}
        light={data.textColor === 'light'}
        links={[
          {
            link: data.link ? data.link.slug : data.externalLinkUrl ? data.externalLinkUrl : null,
            internal: data.link,
            external: data.externalLinkUrl,
            title: data.linkTitle,
            button: data.showAsButton,
            large: data.showAsButton
          }
        ]}
      />
    </div>
  )

  return (
   <Section bgColor={data.bgColor && data.bgColor.hex} >
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
  </Section>
  )
}

export default ExplanationImage
