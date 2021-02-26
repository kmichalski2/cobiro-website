import React from "react"

import Classes from './explanationImage.module.scss'
import Section from "../../UiElements/Section/Section"
import HeaderWText from "../../UiElements/HeaderWText/HeaderWText"
import ImageAll from "../../UiElements/ImageAll/ImageAll"
import IconCard from "../../UiElements/IconCard/IconCard"

const ExplanationImage = ({ data }) => {
 console.log('DATA', data)
  const image = (
    <div className={["space-sm space-xs", data.leftText && data.imageToEdge ? Classes.imageLeftEdge : !data.leftText && data.imageToEdge ? Classes.imageRightEdge : null].join(' ')}>
      <ImageAll 
        image={data.image}
        alt={data.image.alt ? data.image.alt : data.title}
        />
    </div>
  )

  const text = (
    <div className="text-padding">
      {data.iconsTop && data.iconsTop.length > 0 ?
        <div className={Classes.iconsTop}>
          {data.iconsTop.map((icon, i) => (
            <ImageAll key={i} image={icon} alt={icon.alt} classes={Classes.icon} />
          ))}
        </div>
      : null}
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
      {data.iconWText && data.iconWText.features && data.iconWText.features.length > 0 ?
      <div className={Classes.featureWrapper}>
        {!data.showIconWTextAsCards && data.iconWText && data.iconWText.features.map((f, i) => {
          return (
          <div key={i} className={Classes.feature}>
            <ImageAll image={f.icon} alt={f.icon.alt} classes={Classes.featureIcon}/>
            <p>{f.text}</p>
          </div>
        )})}
        </div>
      : null}
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
      {data.showIconWTextAsCards && data.iconWText && data.iconWText.features && data.iconWText.features.length > 0 ?
      <div className="row center-xs stretch-xs mt space-top-xs-up">
            {data.iconWText.features.map((f, i) => {
              return (
                <div key={i} className="col col-xs-12 col-md-6 col-lg-4 flex">
                <IconCard 
                  image={f.icon}
                  alt={f.icon.alt || null }
                  text={f.text} 
                  classes={Classes.IconCardRounded}
                  checkmark
                  />
              </div>
            )})}
      </div>
      : null}
      </div>
  </Section>
  )
}

export default ExplanationImage
