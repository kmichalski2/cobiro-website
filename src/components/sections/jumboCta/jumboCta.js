import React from "react"
import { Link } from "gatsby"

import Section from '../../UiElements/Section/Section'
import ImageAll from '../../UiElements/ImageAll/ImageAll'

import Classes from "./jumboCta.module.scss"
import HeaderWText from "../../UiElements/HeaderWText/HeaderWText"
// import Waves from "../../waves/waves"


const JumboCta = ({ data }) => {

  const bgColor = data.ctaBgColor && data.ctaBackgroundColor ? data.ctaBackgroundColor.hex : null
  const textColor = data.ctaBgColor && data.textColor === 'light' ? "text-white" : "text-black"
  const btnColor = data.ctaBgColor && data.textColor === 'light' ? "btn-white" : null
  const backgroundImage = data.backgroundImage
  const icon = data.icon

  return (
    <Section
      bgColor={bgColor && !backgroundImage ? bgColor : null}
    >
        <div className="container">
          <div className="row text-center center-xs">
            <div className="col-xs-12 col-md-8 col-lg-6">
              <div className={backgroundImage ? Classes.content : null}>
                <HeaderWText 
                  icon={icon}
                  iconLarge
                  centered
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
                  light={data.textColor === 'light'}

                />
              </div>
            </div>
          </div>
        </div>
      { backgroundImage ? <ImageAll backgroundImage image={backgroundImage}/> : null }
    </Section>
  )
}

export default JumboCta
