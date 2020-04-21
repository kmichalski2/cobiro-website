import { Link } from "gatsby"
import React from "react"
import Section from '../../UiElements/Section/Section'
import ImageAll from '../../UiElements/imageAll/imageAll'
import Classes from "./jumboCta.module.scss"
// import Waves from "../../waves/waves"


const JumboCta = ({ data }) => {

  const bgColor = data.ctaBgColor && data.ctaBackgroundColor ? data.ctaBackgroundColor.hex : null
  const textColor = data.ctaBgColor && data.textColor === 'light' ? "text-white" : "text-black"
  const btnColor = data.ctaBgColor && data.textColor === 'light' ? "btn-white" : null
  const backgroundImage = data.backgroundImage
  // const backgroundImage = null
  const icon = data.icon


  // const bgColor = data.testimonialBgColor && data.testimonialColor ? data.testimonialColor.hex : null
  // const textColor = data.testimonialBgColor && data.testimonialTextColor  === 'light' ? "text-white" : "text-black"
  

  console.log(icon)

  return (
    <Section
      bgColor={bgColor && !backgroundImage ? bgColor : null}
    >
        <div className="container">
          <div className="row text-center center-xs">
            <div className="col-xs-10 col-xl-8">
              <div className={backgroundImage ? Classes.content : null}>
              
                { icon ? <div className={Classes.iconWrapper}><ImageAll image={icon} classes={Classes.icon}/></div> : null }
                { data.title ? <h2 className={textColor}>{data.title}</h2> : null }
                { data.text ? <p className={textColor}>{data.text}</p> : null }
                {data.link ?
                <Link
                to={data.link.slug ? data.link.slug : '/'}
                className="btn btn-large space-xs space-sm"
                >
                  {data.linkTitle}
                </Link>
                : data.externalLinkCta ?
                <a
                href={data.externalLinkCta}
                className={["btn btn-large space-xs space-sm", btnColor].join(' ')} target="_blank"
                rel="noopener noreferrer">
                  {data.linkTitle}
                </a>
                : null }
              </div>
            </div>
          </div>
        </div>
      { backgroundImage ? <ImageAll backgroundImage image={backgroundImage}/> : null }
    </Section>
  )
}

export default JumboCta
