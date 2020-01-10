import React from 'react'

import BusinessStyles from './GoogleMyBusiness.module.scss'
import Map from '../Map/Map'

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
                            <div className={["card card-visible", BusinessStyles.card].join(' ')}>
                                <div className={BusinessStyles.searchBar}>
                                    <p className="small text-left">{searchTerm}</p>
                                </div>
                                <div className={["card card-visible text-left", BusinessStyles.cardInner].join(' ')}>
                                    <div className={BusinessStyles.map}>
                                        <Map lat={55.687169} lng={12.591030} customLook={false} />
                                    </div>
                                    <h3 className="text-normal space-xs-up">{domain.charAt(0).toUpperCase() + domain.slice(1)}</h3>
                                    <div className={["space-xs-up", BusinessStyles.btns].join(' ')}>
                                        <a href="#">Website</a>
                                        <a href="#">Directions</a>
                                        <a href="#">Save</a>
                                    </div>
                                    <div className={["flex start-xs middle-xs", BusinessStyles.reviews].join(' ')}>
                                        <p className={["small no-mb", BusinessStyles.orange].join(' ')}>4,9</p>
                                        <div className={BusinessStyles.stars}>
                                            <div className={BusinessStyles.star}></div>
                                            <div className={BusinessStyles.star}></div>
                                            <div className={BusinessStyles.star}></div>
                                            <div className={BusinessStyles.star}></div>
                                            <div className={BusinessStyles.star}></div>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default GoogleMyBusiness