import React from "react"
import { Link } from "gatsby"

import Section from '../../UiElements/Section/Section'
import ImageAll from '../../UiElements/ImageAll/ImageAll'

import * as Classes from "./jumboCta.module.scss"
import HeaderWText from "../../UiElements/HeaderWText/HeaderWText"
// import Waves from "../../waves/waves"


const JumboCta = ({ data }) => {

  const bgColor = data.ctaBgColor && data.ctaBackgroundColor ? data.ctaBackgroundColor.hex : null
  const textColor = data.textColor === 'light' || null
  // const btnColor = data.textColor === 'light' ? "btn-white" : null
  const backgroundImage = data.backgroundImage
  const icon = data.icon
  const jumboCtaImage = data.jumboCtaImage

  console.log(data, 'data')

  return (
    <Section
      bgColor={bgColor && !backgroundImage ? bgColor : null}
    >
      {backgroundImage && bgColor ?
                <div className={Classes.overlay} style={{backgroundColor: bgColor}}></div>
                : null}
        <div className="container">
          <div className={["row", !jumboCtaImage ? "center-xs" : null ].join(' ')}>
            <div className={["col col-xs-12", jumboCtaImage ? "col-lg-6" : "col-lg-6 col-md-8"].join(' ')}>
              <div className={backgroundImage ? Classes.content : null}>
                
                <HeaderWText
                  jumboCtaImage={jumboCtaImage}
                  icon={icon}
                  iconLarge
                  centered={!jumboCtaImage}
                  title={data.title}
                  h2
                  text={data.text}
                  links={[
                    {
                      link: data.externalLinkCta || data.link && data.link.slug,
                      internal: !data.externalLinkUrl && data.link && (data.link.slug || data.link.slug === null) ? true : false,
                      external: data.externalLinkCta ? true : false,
                      title: data.linkTitle,
                      button: true,
                      large: true
                    },
                    data.secondaryLinkTitle && (data.secondaryLink || data.secondaryExternalLinkUrl) ?
                    {
                      link: data.secondaryExternalLinkUrl || data.secondaryLink && data.secondaryLink.slug,
                      title: data.secondaryLinkTitle,
                      external: data.secondaryExternalLinkUrl && true,
                      internal: !data.secondaryExternalLinkUrl && data.secondaryLink && (data.secondaryLink.slug || data.secondaryLink.slug === null) && true,
                      button: true,
                      large: true,
                      secondary: true
                    }
                    : ""
                  ]}
                  light={textColor}
                />
                
              </div>
            </div>
            <div className={[Classes.jumboCtaImage, "col-xs-12 col-lg-6"].join(' ')}>
              <ImageAll image={jumboCtaImage} />
            </div>
          </div>
        </div>
      { backgroundImage ? <ImageAll backgroundImage image={backgroundImage}/> : null }
    </Section>
  )
}

export default JumboCta
