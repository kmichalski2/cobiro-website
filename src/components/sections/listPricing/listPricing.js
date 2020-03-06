import React, { useEffect } from "react"
import Waves from "../../waves/waves"
import priceStyles from './listPricing.module.scss'

const ListPricing = ({ data }) => {
  const backgroundColor = data.backgroundColor
  const topColor = data.topGradiantColor ? data.topGradiantColor.hex : null
  const bottomColor = data.bottomGradiantColor ? data.bottomGradiantColor.hex : null

  useEffect(() => {
    const priceCaptions = document.getElementsByClassName("price-caption")

    if (priceCaptions.length > 1) {
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
                  <p className="price h1">${data.tier1Price}{data.tier1RecurringDescriptor ? <span className="h3 text-normal"> / {data.tier1RecurringDescriptor}</span> : null}</p>
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
            { data.tier2Title ? 
            <div className="col col-xs-12 col-md-6 col-lg-4">
              <div className={["card card-visible flex center list-pricing", priceStyles.card].join(' ')} >
                <div>
                  <h4>{data.tier2Title}</h4>
                  {data.tier2Price ? <p className="price h1">${data.tier2Price}</p> : null }
                  {data.tier2Text ? 
                  <p className="small price-caption">
                  {data.tier2Text}
                  </p>
                  : null}
                  {data.tier2ExternalLink && data.tier2LinkText ?
                  <a href={data.tier2ExternalLink} className="btn space-xs-up" target="_blank" rel="noopener noreferrer">
                  {data.tier2LinkText}
                  </a>
                  : null}
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
            : null }
          </div>
        </div>
      <Waves className={priceStyles.whiteSways} bottom="25%" whiteSway={backgroundColor ? true : false} transparentSways={backgroundColor ? true : false} highWaveRight={true}/>
    </section>
  )
}

export default ListPricing
