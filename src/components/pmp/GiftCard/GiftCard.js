import React from 'react'

import GiftCardStyles from './GiftCard.module.scss'

import googleAds from '../../../images/google_ads.png'

const GiftCard = () => {

    return (
        <section className="section">
            <div className="container">
                <div className="row middle-xs">
                    <div className="col col-xs-12 col-lg-6 text-center-xs text-left-lg">
                        <h3>Get Gift Card</h3>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <br/>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur</p>
                        <a href="#" className="btn">See more</a>
                    </div>
                    <div className="col col-xs-12 col-lg-6 text-left first-xs last-lg space-xs space-sm space-md">
                        <div className={["card card-visible", GiftCardStyles.card].join(' ')}>
                            <div className="flex between-xs space-xs-up">
                                <div className="text-left">
                                    <img className={GiftCardStyles.googleAdsImg} src={googleAds} />
                                    <h2 className={["h1 no-mb", GiftCardStyles.voucherAmount].join(' ')}>Get $75</h2>
                                    <p className="text-grey">When you spend $25</p>
                                </div>
                                <div>
                                    <img className={GiftCardStyles.giftImg} src="" />
                                </div>
                            </div>
                            <hr className={['space-xs-up', GiftCardStyles.hr].join(' ')}/>
                            <div className={["flex between-xs middle-xs", GiftCardStyles.footer].join(' ')}>
                                <p className="small text-black no-mb">Free voucher for you!</p>
                                <h3 className="no-mb">$75</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GiftCard