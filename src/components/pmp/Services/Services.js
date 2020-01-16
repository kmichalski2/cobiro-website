import React from 'react'
import ServicesStyles from './Services.module.scss'

// images
import business from './images/business.svg'
import fb from './images/fb.svg'
import giftcard from './images/giftcard.svg'
import search from './images/search.svg'
import googleAds from './images/google_ads_round.svg'
import instagram from './images/instagram.svg'
import people from './images/people.svg'

const Services = () => {

    return (
        <section className={["section", ServicesStyles.services].join(' ')}>
             <div className="container">
                <div className="row center-xs middle-xs space-xs space-sm space-md">
                    <div className="col col-xs-12 text-center section-header">
                        <h2>What we can do for you</h2>
                        <p>Lorem ipsum dolor sit amet, consetetur se ipsum dolor sit amet, consetetur se</p>
                    </div>
                </div>  
                <div className="row text-center">
                
                    <div className={["col col-xs-12 col-md-2", ServicesStyles.service].join(' ')}>
                        <div className={ServicesStyles.lineDot}>
                        <img className={ServicesStyles.circle} src={search} />
                        </div>
                        <div className={ServicesStyles.line}></div>
                        <p className="text-bold text-black small">Google Search Marketing</p>
                    </div>
                    <div className={["col col-xs-12 col-md-2", ServicesStyles.service].join(' ')}>
                        <div className={ServicesStyles.lineDot}>
                            <img className={ServicesStyles.circle} src={business} />
                        </div>
                        <p className="text-bold text-black small">Google My Business</p>
                    </div>
                    <div className={["col col-xs-12 col-md-2", ServicesStyles.service].join(' ')}>
                        <div className={ServicesStyles.lineDot}>
                        <img className={ServicesStyles.circle} src={giftcard} />
                        </div>
                        <p className="text-bold text-black small">Get Gift Card</p>
                    </div>
                    <div className={["col col-xs-12 col-md-2", ServicesStyles.service].join(' ')}>
                        <div className={ServicesStyles.lineDot}>
                        <img className={ServicesStyles.circle} src={googleAds} />
                        </div>
                        <p className="text-bold text-black small">Google Shopping Ads</p>
                    </div>
                    <div className={["col col-xs-12 col-md-2", ServicesStyles.service].join(' ')}>
                        <div className={ServicesStyles.lineDot}>
                        <img className={ServicesStyles.circle} src={fb} />
                        </div>
                        <p className="text-bold text-black small">Facebook Marketing</p>
                    </div>
                    <div className={["col col-xs-12 col-md-2", ServicesStyles.service].join(' ')}>
                        <div className={ServicesStyles.lineDot}>
                            <img className={ServicesStyles.circle} src={instagram} />
                        </div>
                        <p className="text-bold text-black small">Instagram Marketing</p>
                    </div>
                    <div className={["col col-xs-12 col-md-2", ServicesStyles.service].join(' ')}>
                        <div className={ServicesStyles.lineDot}>
                        <img className={ServicesStyles.circle} src={people} />
                        </div>
                        <p className="text-bold text-black small">Competitors</p>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Services