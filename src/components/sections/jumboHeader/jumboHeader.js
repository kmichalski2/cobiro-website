import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"

import JumboHeaderStyles from "./jumboHeader.module.scss"
import Waves from "../../waves/waves"

const JumboHeader = props => {
  const data = props.data

  const backgroundColor = data.backgroundColor
  const topColor = data.topGradiantColor ? data.topGradiantColor.hex : null
  const bottomColor = data.bottomGradiantColor ? data.bottomGradiantColor.hex : null
  const imageBehind = data.imageBehindWave
  const alignment = data.alignment

  const createMarkup = (text)  => {
    return {__html: text}
  }

  const textSide = (
    <div className={["col col-xs-12", alignment === 'centered' ? 'col-md-8 text-center space-xs-up' : 'col-md-6 text-left-md'].join(' ')}>
      <div className={[JumboHeaderStyles.text, imageBehind ? JumboHeaderStyles.textPadding : null, "text-padding"].join(" ")}>
        { data.heading ? <h1 className={backgroundColor ? 'text-white' : null}>{data.heading}</h1> : null }
        { data.text ? <div className={["space-xs-up", backgroundColor ? 'text-white' : null].join(' ')} dangerouslySetInnerHTML={createMarkup(data.text)}></div> : null }
        {data.externalLinkUrl ? (
          <a href={data.externalLinkUrl} className={["btn btn-large space-xs space-sm", backgroundColor ? 'btn-white' : null, alignment === 'centered' ? 'space-xs-up' : null].join(' ')} target="_blank" rel="noopener noreferrer">{data.linkTitle}</a>
        ) : data.link ?
        (
          <Link to={data.link.slug ? data.link.slug : '/'} className={["btn btn-large space-xs space-sm", backgroundColor ? 'btn-white' : null, alignment === 'centered' ? 'space-xs-up' : null ].join(' ')}>
            {data.linkTitle}
          </Link>
        ): null }
      </div>
    </div>
  )
 
  const imageSide = (
    <div className={["col col-xs-12", alignment === 'centered' ? 'col-md-8' : 'col-md-6 '].join(' ')}>
      {data.image.fluid ?
      <Img
      loading="eager"
      fadeIn={false}
      fluid={data.image.fluid}
      className="img-responsive img-full-width"
      alt={data.image.alt ? data.image.alt : data.heading}
      />
      : 
      <img src={data.image.url} 
        className="img-responsive img-full-width"
        alt={data.image.alt ? data.image.alt : data.heading} />
      }
    </div> 
  )
  
  return (
    <section className={JumboHeaderStyles.Section} style={{backgroundImage: backgroundColor ? `linear-gradient(${topColor}, ${bottomColor})` : null, position: 'relative' }}>
      <div
        className={[
          JumboHeaderStyles.JumboHeader,
          "section-inner",
          "jubmoheader-inner",
          alignment === 'centered' ? JumboHeaderStyles.centered : null,
        ].join(" ")}
        style={{zIndex: imageBehind ? 1 : 5}}
      >
        <div>
          <div className="container">
            <div
              className={[
                alignment === 'centered' ? 'flex-column ' : null,
                imageBehind ? 'bottom-xs middle-lg' : null,
                "row middle-xs",
              ].join(" ")}
            >
              { alignment === 'image-right' ? textSide : alignment === 'image-left' ? imageSide : alignment === 'centered' ? textSide : null }
              { alignment === 'image-right' ? imageSide : alignment === 'image-left' ? textSide : alignment === 'centered' ? imageSide : null }
            </div>
          </div>
        </div>      
      </div>
      <Waves whiteSway={backgroundColor ? true : false} transparentSways={backgroundColor ? true : false} highWaveRight={alignment === 'image-right' || alignment === 'centered' ? true : false}/>
    </section>
  )
}

export default JumboHeader
