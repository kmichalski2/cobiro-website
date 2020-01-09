import React from 'react'

import AdsStyles from './Ads.module.scss'
import Ad from './Ad/Ad'

const Ads = ({title, text, linkText, link, logo, domain, ads, adType, sway}) => {
    const url = domain ? domain.charAt(0).toUpperCase() + domain.slice(1) : null
    
    return (
        <section className={["section", sway ? "bg-sway" : null].join(' ')}>
            <div className={sway ? "bg-sway-inner" : null }>
                <div className="container">
                    <div className="row middle-xs">
                        <div className="col col-xs-12 col-lg-6 text-center-xs text-left-lg">
                            <h3>{title}</h3>
                            <p>
                            {text}
                            </p>
                            <a href={link} className="btn">{linkText}</a>
                        </div>
                        <div className="col col-xs-12 col-lg-6 first-xs first-sm first-md last-lg center-xs end-lg flex">
                            <div className={AdsStyles.ads}>
                                <Ad url={url} ads={ads} type={adType} first={true} />
                                <Ad url={url} ads={ads} type={adType} first={false} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Ads