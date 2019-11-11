import React, { useEffect } from "react"

import priceStyles from './listPricing.module.scss'

const ListPricing = ({ data }) => {
  const backgroundColor = data.backgroundColor
  const topColor = data.topGradiantColor ? data.topGradiantColor.hex : null
  const bottomColor = data.bottomGradiantColor ? data.bottomGradiantColor.hex : null

  const transparentSways = (
    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" x="0" y="0" viewBox="0 0 1900 288" className={priceStyles.whiteSways}><g id="Lag_2" data-name="Lag 2"><g id="Lag_1-2" data-name="Lag 1"><path id="Path_4909" data-name="Path 4909" className="cls-1" d="M0,181.54c230.83,28.07,530,27.7,759.25-1,130.46-16.31,237.69-40.75,371.12-55.86C1383.67,96,1718.66,107.54,1920,151.86l.28,107.42L0,259.19Z" fill="#fff" opacity="0.1"/><path id="Path_4978" data-name="Path 4978" className="cls-1" d="M0,139.81c230.83,54.1,530,53.4,759.25-1.87C889.71,106.5,996.94,59.41,1130.37,30.28,1383.67-25,1718.66-2.82,1920,82.61l.28,177H0Z" fill="#fff" opacity="0.1"/></g></g></svg>
  )

  const whiteSway = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 150" preserveAspectRatio="xMidYMid slice" x="0" y="0" className={priceStyles.whiteSways} style={{zIndex: 2}}><path d="M0,72.55c230.83,28.07,530,27.7,759.25-1C889.71,55.23,996.94,30.8,1130.37,15.69,1383.67-13,1718.66-1.45,1920,42.87V150H0Z" fill="#fff"/></svg>
  )

  useEffect(() => {
    const priceCaptions = document.getElementsByClassName("price-caption")

    if (priceCaptions.length > 0) {
      if (priceCaptions[0].offsetHeight > priceCaptions[1].offsetHeight) {
        priceCaptions[1].style.height = priceCaptions[0].offsetHeight + "px"
      } else if (
        priceCaptions[0].offsetHeight < priceCaptions[1].offsetHeight
      ) {
        priceCaptions[0].style.height = priceCaptions[1].offsetHeight + "px"
      }
    }
  })

  return (
    <section className={[priceStyles.section, backgroundColor ? priceStyles.whiteBox : null, "section"].join(' ')} style={{backgroundImage: backgroundColor ? `linear-gradient(${topColor}, ${bottomColor})` : null, paddingBottom: backgroundColor ? 0 : null }} >
        <div className="container">
          <div className="row center-xs" style={{paddingTop: '7.5rem'}}>
            <div className="col col-xs-12 col-md-8 text-center section-header">
              { data.title ? <h1 className={backgroundColor ? 'text-white' : null}>{data.title}</h1> : null }
              { data.text ? <p className={backgroundColor ? 'text-white' : null}>{data.text}</p> : null }
            </div>
          </div>
          <div className="row center-xs">
            <div className="col col-xs-12 col-md-6 col-lg-4">
              <div className={["card card-visible flex center list-pricing", priceStyles.card].join(' ')}>
                <div>
                  <h4>{data.tier1Title}</h4>
                  <p className="price h1">${data.tier1Price}</p>
                  <p className="small price-caption">{data.tier1Text}</p>
                  <a
                    href={data.tier1ExternalLink}
                    className="btn btn-secondary space-xs-up"
                    target="_blank" rel="noopener noreferrer"
                  >
                    {data.tier1LinkText}
                  </a>
                  {data.tier1Features ? (
                    <ul className="text-left-xs price-list list-unstyled">
                      {data.tier1Features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="col col-xs-12 col-md-6 col-lg-4">
              <div className={["card card-visible flex center list-pricing", priceStyles.card].join(' ')} >
                <div>
                  <h4>{data.tier2Title}</h4>
                  <p className="price h1">${data.tier2Price}</p>
                  <p className="small price-caption">
                  {data.tier2Text}
                  </p>
                  <a href={data.tier2ExternalLink} className="btn space-xs-up" target="_blank" rel="noopener noreferrer">
                  {data.tier2LinkText}
                  </a>
                  { /*data.tier1Features ? (
                    <ul className="text-left-xs price-list list-unstyled">
                      {data.tier1Features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                      ) : null */}
                    {/* <hr className="extra-line" /> */} 
                  {data.tier2Features ? (
                    <ul className="text-left-xs price-list list-unstyled">
                      {data.tier2Features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      { backgroundColor ? whiteSway : null }
      { backgroundColor ? transparentSways : null }
    </section>
  )
}

export default ListPricing
