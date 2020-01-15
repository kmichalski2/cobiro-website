import React from 'react'

import GiftCardStyles from './GiftCardSection.module.scss'

import googleAds from '../../../images/google_ads.png'
import GiftCard from '../../UiElements/GiftCard/GiftCard'

const GiftCardSection = () => {

    return (
        <section className="section">
            <div className="container">
                <div className="row middle-xs">
                    <div className="col col-xs-12 col-lg-6 text-center-xs text-left-lg">
                        <h2>Get Gift Card</h2>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. <br/>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur</p>
                        <a href="#" className="btn">See more</a>
                    </div>
                    <div className="col col-xs-12 col-lg-6 text-left first-xs last-lg space-xs space-sm space-md">
                        <GiftCard />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GiftCardSection