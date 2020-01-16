import React from 'react'

import ComparisonStyles from './SetupComparison.module.scss'
import Logo from '../../../images/logo.svg'

const SetupComparison = ({pageSpeed}) => {

    const speedIndex = 100 - pageSpeed

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
                                 <svg className={ComparisonStyles.circleChart} width="100%" height="100%" viewBox="0 0 35.8309886184 35.8309886184" xmlns="http://www.w3.org/2000/svg">
                                    <circle className={ComparisonStyles.circleBg} cx="17.91549430918954" cy="17.91549430918954" r="15.91549430918954" strokeWidth="3" fill="none"></circle>
                                    <circle className={[ComparisonStyles.circle, ComparisonStyles.circleGrey].join(' ')} cx="17.91549430918954" cy="17.91549430918954" r="15.91549430918954" fill="none"  strokeDasharray="100" style={{strokeDashoffset: speedIndex}} strokeDasharray="100" strokeDashoffset={speedIndex} strokeWidth="3"></circle>
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
                            <img className={ComparisonStyles.sways} src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 450 118.28'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:url(%23a);%7D.b%7Bfill:%23fff;opacity:0.25;isolation:isolate;%7D.c%7Bfill:%23fefefe;%7D%3C/style%3E%3ClinearGradient id='a' x1='-71.34' y1='480.81' x2='-71.34' y2='480.12' gradientTransform='matrix(450, 0, 0, -112, 32328.14, 53891.58)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23e5e6e6'/%3E%3Cstop offset='1' stop-color='%23c4c4c4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ctitle%3Egreyswaybottom%3C/title%3E%3Crect class='a' y='14.56' width='450' height='103.72'/%3E%3Cpath class='b' d='M450,79.78c-54.09,13.9-124.19,13.72-177.92-.48-30.58-8.08-55.7-20.18-87-27.67C125.75,37.42,47.25,43.13.06,65.08L0,118.28l450,0Z'/%3E%3Cpath class='c' d='M0,18.91c54.09-6.83,124.19-6.74,177.92.24,30.58,4,55.7,9.91,87,13.59,59.36,7,137.86,4.18,185.05-6.6L450,0,0,0Z'/%3E%3Cpath class='b' d='M450,99.37c-54.09,6.83-124.19,6.74-177.92-.24-30.58-4-55.7-9.91-87-13.59-59.36-7-137.86-4.18-185,6.61L0,118.28l450,0Z'/%3E%3C/svg%3E" alt="Grey sways"/>
                        </div>
                    </div>
                    <div className="col col-xs-12 col-md-6 col-lg-4">
                        <div className={["card card-visible", ComparisonStyles.card].join(' ')}>
                            <img src={Logo} className="space-xs-up"/>
                            <div className={[ComparisonStyles.circle, ComparisonStyles.greenCircle].join(' ')}>
                                <svg className={ComparisonStyles.circleChart} width="100%" height="100%" viewBox="0 0 35.8309886184 35.8309886184" xmlns="http://www.w3.org/2000/svg">
                                    <linearGradient id="gradient1" gradientTransform="rotate(78)">
                                        <stop id="stop1" offset="0%" stopColor="#92E2A1" />
                                        <stop id="stop2" offset="100%" stopColor="#00AF21"/>
                                    </linearGradient>
                                    <circle className={ComparisonStyles.circle} cx="17.91549430918954" cy="17.91549430918954" r="15.91549430918954" fill="none" stroke="url(#gradient1)" strokeDasharray="100" style={{strokeDashoffset: 0}} strokeDasharray="100" strokeDashoffset={0} strokeWidth="3"></circle>
                                </svg>
                                {/* <div className={ComparisonStyles.innerCircle}> */}
                                    <div className={ComparisonStyles.circleText}>
                                        <h3>100</h3>
                                        <p>Potential speed</p>
                                    </div>
                                {/* </div> */}
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
                            <img className={ComparisonStyles.sways} src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 450 120.28'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:url(%23a);%7D.b,.c,.d%7Bfill:%23fff;%7D.b%7Bopacity:0.05;%7D.b,.d%7Bisolation:isolate;%7D.d%7Bopacity:0.1;%7D%3C/style%3E%3ClinearGradient id='a' x1='-68.11' y1='429.65' x2='-68.11' y2='428.71' gradientTransform='matrix(450, 0, 0, -112, 30874.25, 48135.69)' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23415ca9'/%3E%3Cstop offset='1' stop-color='%2367beed'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ctitle%3Eblueswaysbottom_1%3C/title%3E%3Crect class='a' y='14.56' width='450' height='105.72'/%3E%3Cpath class='b' d='M450,81.78c-54.09,13.9-124.19,13.72-177.92-.48-30.58-8.08-55.7-20.18-87-27.67C125.75,39.42,47.25,45.13.06,67.08L0,120.28l450,0Z'/%3E%3Cpath class='c' d='M0,18.91c54.09-6.83,124.19-6.74,177.92.24,30.58,4,55.7,9.91,87,13.59,59.36,7,137.86,4.18,185.05-6.6L450,0,0,0Z'/%3E%3Cpath class='d' d='M450,101.37c-54.09,6.83-124.19,6.74-177.92-.24-30.58-4-55.7-9.91-87-13.59-59.36-7-137.86-4.18-185,6.61L0,120.28l450,0Z'/%3E%3C/svg%3E" alt="Grey sways"/>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default SetupComparison