import React from 'react'

import GiftCardStyles from './GiftCard.module.scss'
import googleAds from '../../../images/googleAds' 

const GiftCard = () => {

    return (
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
    )
}

export default GiftCard