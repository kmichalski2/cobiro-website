import React from 'react'

import GiftCardStyles from './GiftCard.module.scss'
import googleAds from '../../../images/google_ads.png' 
import gift from '../../../images/gift.svg' 

const GiftCard = () => {

    return (
        <div className={["card card-visible", GiftCardStyles.card].join(' ')}>
            <div className="flex between-xs space-xs-up">
                <div className="text-left">
                    <img className={GiftCardStyles.googleAdsImg} src={googleAds} />
                    <h2 className={["h1 no-mb", GiftCardStyles.voucherAmount].join(' ')}>Get $100</h2>
                    <p className="text-grey">When you spend $100</p>
                </div>
                    <img className={GiftCardStyles.giftImg} src={gift} />
            </div>
            <hr className={['space-xs-up', GiftCardStyles.hr].join(' ')}/>
            <div className={["flex between-xs middle-xs", GiftCardStyles.footer].join(' ')}>
                <p className="text-black no-mb">Free voucher for you!</p>
                <h3 className="no-mb h2">$100</h3>
            </div>
        </div>
    )
}

export default GiftCard