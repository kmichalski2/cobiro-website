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

  const textSide = (
    <div className={["col col-xs-12", alignment === 'centered' ? 'col-md-8 text-center space-xs-up' : 'col-md-6 text-left-md'].join(' ')}>
      <div className={[JumboHeaderStyles.text, imageBehind ? JumboHeaderStyles.textPadding : null, "text-padding"].join(" ")}>
        { data.heading ? <h1 className={backgroundColor ? 'text-white' : null}>{data.heading}</h1> : null }
        { data.text ? <p className={backgroundColor ? 'text-white' : null}>{data.text}</p> : null }
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

  // const transparentSways = (
  //   <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" x="0" y="0" viewBox="0 0 1900 288" className={JumboHeaderStyles.whiteSways} style={{transform: alignment === 'image-left' ? 'scaleX(-1)' : null}}><g data-name="Lag 2"><g data-name="Lag 1"><path data-name="Path 4909" className="cls-1" d="M0,181.54c230.83,28.07,530,27.7,759.25-1,130.46-16.31,237.69-40.75,371.12-55.86C1383.67,96,1718.66,107.54,1920,151.86l.28,107.42L0,259.19Z" fill="#fff" opacity="0.1"/><path data-name="Path 4978" className="cls-1" d="M0,139.81c230.83,54.1,530,53.4,759.25-1.87C889.71,106.5,996.94,59.41,1130.37,30.28,1383.67-25,1718.66-2.82,1920,82.61l.28,177H0Z" fill="#fff" opacity="0.1"/></g></g></svg>
  // )

  // const whiteSway = (
  //   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 150" preserveAspectRatio="xMidYMid slice" x="0" y="0" className={JumboHeaderStyles.whiteSways} style={{transform: alignment === 'image-left' ? 'scaleX(-1)' : null, bottom: alignment === 'image-left' || alignment === 'image-right' ? '-1px' : 0, zIndex: 2}}><path d="M0,72.55c230.83,28.07,530,27.7,759.25-1C889.71,55.23,996.94,30.8,1130.37,15.69,1383.67-13,1718.66-1.45,1920,42.87V150H0Z" fill="#fff"/></svg>
  // )
  
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
      {/* { backgroundColor ? whiteSway : null }
      { backgroundColor ? transparentSways : null } */}
      <Waves whiteSway={backgroundColor ? true : false} transparentSways={backgroundColor ? true : false} highWaveRight={alignment === 'image-right' || alignment === 'centered' ? true : false}/>
    </section>
  )
}

export default JumboHeader
