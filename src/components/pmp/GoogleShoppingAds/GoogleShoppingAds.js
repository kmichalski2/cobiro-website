import React from 'react'

import GShoppingAdsStyles from './GoogleShoppingAds.module.scss'

import blueProduct from './images/gshopblue.svg'
import redProduct from './images/gshopred.svg'
import yellowProduct from './images/gshopyellow.svg'
import greenProduct from './images/gshopgreen.svg'

import GoogleSearchBrowser from '../../UiElements/GoogleSearchBrowser/GoogleSearchBrowser'

const GoogleShoppingAds = ({title, text, link, linkText, searchTerm, domain}) => {

    return (
        <section className="section bg-sway">
            <div className="bg-sway-inner">
                <div className="container">
                    <div className="row middle-xs">
                        <div className="col col-xs-12 col-lg-6">
                            <h2>{title}</h2>
                            <p>{text}</p>
                            <a className="btn" href={link}>{linkText}</a>
                        </div>
                        <div className="col col-xs-12 col-lg-6 first-xs last-lg space-xs space-sm space-md">
                            <GoogleSearchBrowser searchTerm={searchTerm}>
                                <div className={GShoppingAdsStyles.shoppingCards}>
                                    <div className={["card card-visible", GShoppingAdsStyles.card].join(' ')}>
                                        <img src={blueProduct} alt="Google shopping example product" />
                                        <div className={GShoppingAdsStyles.adText}>
                                            <p className={GShoppingAdsStyles.blue}>
                                                Hair Conditioner For Dry Hair
                                            </p>
                                            <p className="text-bold">$$$</p>
                                            <p className={GShoppingAdsStyles.green}>{domain}</p>
                                            <p className={[GShoppingAdsStyles.blue, GShoppingAdsStyles.footer].join(' ')}>From Comlyn</p>
                                        </div>
                                    </div>
                                    <div className={["card card-visible", GShoppingAdsStyles.card].join(' ')}>
                                        <img src={redProduct} alt="Google shopping example product" />
                                        <div className={GShoppingAdsStyles.adText}>
                                            <p className={GShoppingAdsStyles.blue}>
                                                Hair Conditioner For Dry Hair
                                            </p>
                                            <p className="text-bold">$$$</p>
                                            <p className={GShoppingAdsStyles.green}>{domain}</p>
                                            <p className={[GShoppingAdsStyles.blue, GShoppingAdsStyles.footer].join(' ')}>From Comlyn</p>
                                        </div>
                                    </div>
                                    <div className={["card card-visible", GShoppingAdsStyles.card].join(' ')}>
                                        <img src={yellowProduct} alt="Google shopping example product" />
                                        <div className={GShoppingAdsStyles.adText}>
                                            <p className={GShoppingAdsStyles.blue}>
                                                Hair Conditioner For Dry Hair
                                            </p>
                                            <p className="text-bold">$$$</p>
                                            <p className={GShoppingAdsStyles.green}>{domain}</p>
                                            <p className={[GShoppingAdsStyles.blue, GShoppingAdsStyles.footer].join(' ')}>From Comlyn</p>
                                        </div>
                                    </div>
                                    <div className={["card card-visible", GShoppingAdsStyles.card].join(' ')}>
                                        <img src={greenProduct} alt="Google shopping example product" />
                                        <div className={GShoppingAdsStyles.adText}>
                                            <p className={GShoppingAdsStyles.blue}>
                                                Hair Conditioner For Dry Hair
                                            </p>
                                            <p className="text-bold">$$$</p>
                                            <p className={GShoppingAdsStyles.green}>{domain}</p>
                                            <p className={[GShoppingAdsStyles.blue, GShoppingAdsStyles.footer].join(' ')}>From Comlyn</p>
                                        </div>
                                    </div>
                                </div>
                            </GoogleSearchBrowser>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GoogleShoppingAds