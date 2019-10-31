import { Link } from "gatsby"
import Img from "gatsby-image"
import React from "react"

import JumboHeaderStyles from "./jumboHeader.module.scss"

const JumboHeader = props => {
  const data = props.data

  const backgroundColor = data.backgroundColor
  const topColor = data.topGradiantColor ? data.topGradiantColor.hex : null
  const bottomColor = data.bottomGradiantColor ? data.bottomGradiantColor.hex : null
  const imageBehind = data.imageBehindWave
  const alignment = data.alignment

  console.log(data)

  const textSide = (
    <div className={["col col-xs-12", data.alignment == 'centered' ? 'col-md-8 text-center space-xs-up' : 'col-md-6 text-left-md'].join(' ')}>
      <div className={[JumboHeaderStyles.text, "text-padding"].join(" ")}>
        { data.heading ? <h1 className={backgroundColor ? 'text-white' : null}>{data.heading}</h1> : null }
        { data.text ? <p className={backgroundColor ? 'text-white' : null}>{data.text}</p> : null }
        {data.externalLinkUrl ? (
          <a href={data.externalLinkUrl} className={["btn btn-large space-xs space-sm", backgroundColor ? 'btn-white' : null].join(' ')}>{data.linkTitle}</a>
        ) : data.link ?
        (
          <Link to={data.link.slug ? data.link.slug : '/'} className={["btn btn-large space-xs space-sm", backgroundColor ? 'btn-white' : null].join(' ')}>
            {data.linkTitle}
          </Link>
        ): null }
      </div>
    </div>
  )

  const imageSide = (
    <div className={["col col-xs-12 space-xs space-sm", data.alignment == 'centered' ? 'col-md-8' : 'col-md-6 '].join(' ')}>
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

  const transparentSways = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920.28 289.65" className={JumboHeaderStyles.whiteSways} style={{transform: data.alignment == 'image-left' ? 'scaleX(-1)' : null}}><g id="Lag_2" dataName="Lag 2"><g id="Lag_1-2" dataName="Lag 1"><g id="Group_1" dataName="Group 1"><path id="Path_4909" data-name="Path 4909" className="cls-1" d="M0,181.54c230.83,28.07,530,27.7,759.25-1,130.46-16.31,237.69-40.75,371.12-55.86C1383.67,96,1718.66,107.54,1920,151.86l.28,107.42L0,259.19Z" fill="#fff" opacity="0.1"/><path id="Path_4978" dataName="Path 4978" className="cls-1" d="M0,139.81c230.83,54.1,530,53.4,759.25-1.87C889.71,106.5,996.94,59.41,1130.37,30.28,1383.67-25,1718.66-2.82,1920,82.61l.28,207L0,289.47Z" fill="#fff" opacity="0.1"/></g></g></g></svg>
  )

  const whiteSway = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920.28 150.65" className={JumboHeaderStyles.whiteSways} style={{transform: data.alignment == 'image-left' ? 'scaleX(-1)' : null, bottom: data.alignment == 'image-left' ? '-1px' : 0}}><g id="Lag_2" dataName="Lag 2"><g id="Lag_1-2" dataName="Lag 1"><path id="Path_4929" dataName="Path 4929" d="M0,72.54c230.83,28.07,530,27.7,759.25-1,130.46-16.32,237.69-40.75,371.12-55.86C1383.67-13,1718.66-1.46,1920,42.86l.28,107.79H0Z" fill="#fff"/></g></g></svg>
  )
  
  return (
    <section style={{backgroundImage: backgroundColor ? `linear-gradient(${topColor}, ${bottomColor})` : null, position: 'relative' }}>
      <div
        className={[
          JumboHeaderStyles.JumboHeader,
          data.textLeftAlignment
            ? JumboHeaderStyles.textLeft
            : JumboHeaderStyles.textRight,
          "section-inner",
        ].join(" ")}
        style={{zIndex: imageBehind ? 0 : 1}}
      >
        <div>
          <div className="container">
            <div
              className={[
                data.alignment == 'centered' ? 'flex-column ' : null,
                "row middle-xs",
              ].join(" ")}
            >
              { data.alignment == 'image-right' ? textSide : data.alignment == 'image-left' ? imageSide : data.alignment == 'centered' ? textSide : null }
              { data.alignment == 'image-right' ? imageSide : data.alignment == 'image-left' ? textSide : data.alignment == 'centered' ? imageSide : null }
            </div>
          </div>
        </div>      
      </div>
      { backgroundColor ? whiteSway : null }
      { backgroundColor ? transparentSways : null }
    </section>
  )
}

export default JumboHeader
