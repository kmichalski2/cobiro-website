import React from "react"

import Classes from './explanationImage.module.scss'
import Section from "../../UiElements/Section/Section"
import HeaderWText from "../../UiElements/HeaderWText/HeaderWText"
import ImageAll from "../../UiElements/ImageAll/ImageAll"
import IconCard from "../../UiElements/IconCard/IconCard"

const ExplanationImage = ({ data }) => {
  const image = (
    <div className={["space-sm space-xs", data.leftText && data.imageToEdge ? Classes.imageLeftEdge : !data.leftText && data.imageToEdge ? Classes.imageRightEdge : null, data.imageToBottom ? Classes.imageToBottom : null].join(' ')}>
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
        proFeature={data.proFeature}
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
            large: false
          }
        ]}
      >
      {data.iconWText && data.iconWText.features && data.iconWText.features.length > 0 ?
      <div className={[Classes.featureWrapper, data.stackIconWTextVertically ? Classes.vertical : null].join(' ')}>
        {!data.showIconWTextAsCards && data.iconWText && data.iconWText.features.map((f, i) => {
          return (
          <div key={i} className={Classes.feature}>
            <ImageAll image={f.icon} alt={f.icon.alt} classes={Classes.featureIcon}/>
            <p>{f.text}</p>
          </div>
        )})}
        </div>
      : null}
      {data.iconsBelowText && data.iconsBelowText && data.iconsBelowText.length > 0 ?
      <div className={Classes.iconsBottomWrapper}>
        {data.iconsBelowText.map((icon, i) => {
          return (
            <ImageAll key={i} image={icon} alt={icon.alt} classes={Classes.iconBottom}/>
        )})}
        </div>
      : null}
      </HeaderWText>
    </div>
  )

  return (
   <Section bgColor={data.bgColor && data.bgColor.hex} >
    <div className="container">
      <div className="row middle-xs reverse">
        <div className={[data.leftText && !data.imageToBottom ? "last-xs last-sm first-md first-lg first-xl" : null, !data.imageToBottom  ? "col col-sm-12 col-md-6" : "col col-xs-12 col-lg-6", data.imageToBottom && !data.leftText ? "last-xs last-sm last-md last-lg last-xl" : "space-xs space-sm space-md"].join(' ')}>
          {data.leftText ? text : image}
        </div>
        <div className={!data.imageToBottom ? "col col-sm-12 col-md-6" : !data.leftText ? "col col-xs-12 col-lg-6 space-xs space-sm space-md" : "col col-xs-12 col-lg-6"}>
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
      {data.imageGridBottom && data.imageGridBottom.length > 0 ?
      <div className={["row", Classes.imageGrid].join(' ')}>
        {data.imageGridBottom.map((im, i) => (
          <div className="col col-xs-12 col-md-4 space-xs space-sm">
            <ImageAll image={im} alt={im && im.alt} />
          </div>
        ))}
      </div>
      : null}
      </div>
      {data.backgroundImage ? 
        <ImageAll backgroundImage image={data.backgroundImage}/> 
      : null}
  </Section>
  )
}

export default ExplanationImage
