import { Link } from "gatsby"
import React, { useEffect } from "react"

const ListPricing = ({ data }) => {
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
    <section className="section">
      <div className="container">
        <div className="row">
          <div className="col col-xs-12 text-center section-header">
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
          <div className="col col-xs-12 col-md-6 col-lg-4 col-lg-offset-2">
            <div className="card card-visible flex center list-pricing">
              <div>
                <h4>{data.tier1Title}</h4>
                <p className="price h1">${data.tier1Price}</p>
                <p className="small price-caption">{data.tier1Text}</p>
                <Link
                  to={data.tier1ExternalLink}
                  className="btn btn-secondary space-xs-up"
                >
                  {data.tier1LinkText}
                </Link>
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
            <div className="card card-visible flex center list-pricing">
              <div>
                <h4>Cobiro Premium</h4>
                <p className="price h1">$49</p>
                <p className="small price-caption">
                  Billed monthly. For advertisers with a large team and multiple
                  markets.
                </p>
                <Link to="/" className="btn space-xs-up">
                  Get started
                </Link>
                {data.tier1Features ? (
                  <ul className="text-left-xs price-list list-unstyled">
                    {data.tier1Features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                ) : null}
                <hr className="extra-line" />
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
    </section>
  )
}

export default ListPricing
