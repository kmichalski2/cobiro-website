import React from 'react'
import searchMarketingStyles from './SearchMarketingAd.module.scss'

import GoogleSearchBrowser from '../../UiElements/GoogleSearchBrowser/GoogleSearchBrowser'

const searchMarketing = ({searchTerm, title, text, linkText, link, domain, ads, backgroundColor}) => {
    const domainName = domain ? domain.charAt(0).toUpperCase() + domain.slice(1) : null

    return (
        <section className={[backgroundColor ? "bg-sway" : null, "section", searchMarketingStyles.section].join(' ')}>
            <div className={backgroundColor ? "bg-sway-inner" : null}>
                <div className="container">
                    <div className="row middle-xs">
                        <div className="col col-xs-12 col-lg-6">
                        <div className="text-padding">
                        {title ? <h2>{title}</h2> : null}
                        {text ? <p>{text}</p> : null}
                        {link && linkText ?
                            <a href={link} className="btn space-xs-up">
                                {linkText}
                            </a>
                        : null }
                        </div>
                        </div>
                        <div className="col col-xs-12 col-lg-6 first-xs last-lg space-xs space-sm space-md">
                            <GoogleSearchBrowser searchTerm={searchTerm}>
                                <div className={["card card-visible text-left", searchMarketingStyles.card].join(' ')}>
                                    <p className="text-blue">{ads.headline_1} | {ads.headline_2}</p>
                                    <p className={["small", searchMarketingStyles.AdLink].join(' ')}><span className={searchMarketingStyles.AdText}>Ad</span> {domain}</p>
                                    <p className="small text-lightblack">{ads.description}</p>
                                </div>
                                <div className={["card card-visible text-left", searchMarketingStyles.card].join(' ')}>
                                    <p className="text-blue">{ads.headline_1} | {ads.headline_2}</p>
                                    <p className={["small", searchMarketingStyles.AdLink].join(' ')}><span className={searchMarketingStyles.AdText}>Ad</span> {domain}</p>
                                    <p className="small text-lightblack">{ads.description}</p>
                                </div>
                            </GoogleSearchBrowser>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default searchMarketing

