import React from 'react'

import ComparisonStyles from './SetupComparison.module.scss'
import Logo from '../../../images/logo.svg'

const SetupComparison = ({pageSpeed}) => {
    console.log(pageSpeed)

    const speedIndex = 302 - (pageSpeed * 3.02 - 20)

    console.log(speedIndex)

    return (
        <section className="section">
            <div className="container">
                <div className="row center-xs middle-xs">
                    <div className="col col-xs-12 text-center section-header">
                        <h2>Your current setup comparison</h2>
                        <p>Lorem ipsum dolor sit amet, consetetur se ipsum dolor sit amet, consetetur se</p>
                    </div>
                    <div className={["col col-xs-12 col-md-6 col-lg-4", ComparisonStyles.currentCard].join(' ')}>
                        <div className={["card card-visible", ComparisonStyles.card].join(' ')}>
                            <p className="text-bold small text-black space-xs-up">Current</p>
                            <div className={[ComparisonStyles.circle].join(' ')}>
                                 <svg className={ComparisonStyles.circleChart}  viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle className={ComparisonStyles.circleBg} cx="50" cy="50" r="45" fill="none"></circle>
                                    <circle className={ComparisonStyles.circle} cx="50" cy="50" r="45" fill="none" strokeLinecap="round" strokeDasharray="302" style={{strokeDashoffset: speedIndex}}></circle>
                                </svg>
                                    <div className={ComparisonStyles.circleText}>
                                        <h3>{pageSpeed}</h3>
                                        <p>Your speed</p>
                                    </div>
                            </div>
                               
                            <h3 className={ComparisonStyles.pricingHeadline}>
                                Price: <span className="text-bold">$$$</span><span className="text-grey">$$</span>
                            </h3>
                            <ul className={["text-left", ComparisonStyles.list].join(' ')}>
                                <li>Shopify</li>
                                <li>Your domain</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col col-xs-12 col-md-6 col-lg-4">
                        <div className={["card card-visible", ComparisonStyles.card].join(' ')}>
                            <img src={Logo} className="space-xs-up"/>
                            <div className={[ComparisonStyles.circle, ComparisonStyles.greenCircle].join(' ')}>
                                <div className={ComparisonStyles.innerCircle}>
                                    <div className={ComparisonStyles.circleText}>
                                        <h3>100</h3>
                                        <p>Potential speed</p>
                                    </div>
                                </div>
                            </div>
                            <h3 className={ComparisonStyles.pricingHeadline}>
                                Price: <span className="text-bold">FREE</span>
                            </h3>
                            <ul className={["price-list list-unstyled text-left", ComparisonStyles.list].join(' ')}>
                                <li>Your Domain</li>
                                <li>Facebook Marketing</li>
                                <li>Google My Business</li>
                                <li>Google Search</li>
                                <li>Google Shopping</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default SetupComparison