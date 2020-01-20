import React from 'react'

import BusinessStyles from './GoogleMyBusiness.module.scss'
import Map from '../Map/Map'
import GoogleSearchBrowser from '../../UiElements/GoogleSearchBrowser/GoogleSearchBrowser'
import Score from '../../UiElements/Score/Score'

const GoogleMyBusiness = ({domain, category, address, phone, searchTerm}) => {

    return (
        <section className="section bg-sway">
            <div className="bg-sway-inner">
                <div className="container">
                    <div className="row middle-xs">
                        <div className="col col-xs-12 col-lg-6">
                            <h2>Google My Business</h2>
                            <p className="space-xs-up">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur</p>
                            <a href="#" className="btn">Sign up</a>
                        </div>
                        <div className="col col-xs-12 col-lg-6 first-xs last-lg space-xs space-sm space-md">
                            <GoogleSearchBrowser searchTerm={searchTerm}>
                           
                                <div className={["card card-visible text-left", BusinessStyles.cardInner].join(' ')}>
                                    <div className={BusinessStyles.map}>
                                        <Map lat={55.687169} lng={12.591030} customLook={false} />
                                    </div>
                                    <h3 className="text-normal space-xs-up">{domain.charAt(0).toUpperCase() + domain.slice(1)}</h3>
                                    <div className={["space-xs-up", BusinessStyles.btns].join(' ')}>
                                        <a href={`https://${domain}`} target="_blank">Website</a>
                                        <a href="#">Directions</a>
                                        <a href="#">Save</a>
                                    </div>
                                    <div className={["flex start-xs middle-xs", BusinessStyles.reviews].join(' ')}>
                                        <p className={["small no-mb", BusinessStyles.orange].join(' ')}>3.5</p>
                                        <div className={BusinessStyles.stars}>
                                        <Score imgSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='15.777' height='15' viewBox='0 0 15.777 15'%3E%3Cdefs%3E%3Cstyle%3E.a%7Bfill:%23e7711b;fill-rule:evenodd;%7D%3C/style%3E%3C/defs%3E%3Cg transform='translate(-42.213 -61.121)'%3E%3Cg transform='translate(42.213 61.121)'%3E%3Cpath class='a' d='M52.33,66.314c7.431.373,7.182-.435,1.366,4.243,1.946,7.182,2.649,6.686-3.6,2.608-6.23,4.078-5.526,4.574-3.581-2.608-5.816-4.678-6.085-3.871,1.366-4.243C50.509,59.442,49.66,59.339,52.33,66.314Z' transform='translate(-42.213 -61.121)'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E" imgHalfSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='15.775' height='15' viewBox='0 0 15.775 15'%3E%3Cdefs%3E%3CclipPath id='a'%3E%3Crect width='7.89' height='15' transform='translate(835 756)' fill='%23fff'/%3E%3C/clipPath%3E%3C/defs%3E%3Cg transform='translate(-835 -756)'%3E%3Cg transform='translate(792.786 694.879)' opacity='0.499'%3E%3Cg transform='translate(42.213 61.121)'%3E%3Cpath d='M52.33,66.314c7.431.373,7.182-.435,1.366,4.243,1.946,7.182,2.649,6.686-3.6,2.608-6.23,4.078-5.526,4.574-3.581-2.608-5.816-4.678-6.085-3.871,1.366-4.243C50.509,59.442,49.66,59.339,52.33,66.314Z' transform='translate(-42.213 -61.121)' fill='%23e7711b' fill-rule='evenodd'/%3E%3Cpath d='M52.33,66.314c7.431.373,7.182-.435,1.366,4.243,1.946,7.182,2.649,6.686-3.6,2.608-6.23,4.078-5.526,4.574-3.581-2.608-5.816-4.678-6.085-3.871,1.366-4.243C50.509,59.442,49.66,59.339,52.33,66.314Z' transform='translate(-42.213 -61.121)' fill='%23e7711b' fill-rule='evenodd'/%3E%3C/g%3E%3C/g%3E%3Cg clip-path='url(%23a)'%3E%3Cg transform='translate(792.786 694.879)'%3E%3Cg transform='translate(42.213 61.121)'%3E%3Cpath d='M52.33,66.314c7.431.373,7.182-.435,1.366,4.243,1.946,7.182,2.649,6.686-3.6,2.608-6.23,4.078-5.526,4.574-3.581-2.608-5.816-4.678-6.085-3.871,1.366-4.243C50.509,59.442,49.66,59.339,52.33,66.314Z' transform='translate(-42.213 -61.121)' fill='%23e7711b' fill-rule='evenodd'/%3E%3Cpath d='M52.33,66.314c7.431.373,7.182-.435,1.366,4.243,1.946,7.182,2.649,6.686-3.6,2.608-6.23,4.078-5.526,4.574-3.581-2.608-5.816-4.678-6.085-3.871,1.366-4.243C50.509,59.442,49.66,59.339,52.33,66.314Z' transform='translate(-42.213 -61.121)' fill='%23e7711b' fill-rule='evenodd'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E" score={3.5} total={5} />
                                        
                                            
                                        </div>
                                        <p className={["small no-mb", BusinessStyles.blue].join(' ')}>14 Google reviews</p>
                                    </div>
                                    <p className={["small space-xs-up", BusinessStyles.cat].join(' ')}>
                                        {category}
                                    </p>
                                    <div className={BusinessStyles.meta}>
                                        <p className="small no-mb text-black"><strong>Address:</strong> {address}</p>
                                        <p className={["small no-mb text-black", BusinessStyles.arrowDown].join(' ')}><strong>Hours: <span className={BusinessStyles.green}>Open</span></strong> Closes 6PM</p>
                                        <p className="small no-mb  text-black"><strong>Phone:</strong> {phone}</p>
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

export default GoogleMyBusiness