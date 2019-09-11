import { Link } from "gatsby"
import React,  { useEffect } from "react"

const ListPricing = ({ data }) => {

    useEffect(() => {
        const priceCaptions = document.getElementsByClassName("price-caption");

        if( priceCaptions.length > 0 ) {

            if ( priceCaptions[0].offsetHeight > priceCaptions[1].offsetHeight) {

                priceCaptions[1].style.height = priceCaptions[0].offsetHeight + 'px';

            } else if ( priceCaptions[0].offsetHeight < priceCaptions[1].offsetHeight ) {

                priceCaptions[0].style.height = priceCaptions[1].offsetHeight + 'px';

            }
        }

    });

    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12 text-center section-header">
                        <h2>Pricing</h2>
                        <p>Get the power and customization you need to run great ads. </p>
                    </div>
                    <div className="col col-xs-12 col-md-6 col-lg-4 col-lg-offset-2">
                        <div className="card card-visible flex center list-pricing">
                            <div>
                                <h4>Cobiro Free</h4>
                                <p className="price h1">$0</p>
                                <p className="small price-caption">For advertisers with teams from 1-50 people and 1 market.</p>
                                <Link to="/" className="btn btn-secondary space-xs-up">Get started</Link>
                                <ul className="text-left-xs price-list list-unstyled">
                                    <li>Google Search</li>
                                    <li>Google Shopping</li>
                                    <li>Google CSS (Basic)</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col col-xs-12 col-md-6 col-lg-4">
                        <div className="card card-visible flex center list-pricing">
                            <div>
                                <h4>Cobiro Premium</h4>
                                <p className="price h1">$49</p>
                                <p className="small price-caption">Billed monthly. For advertisers with a large team and multiple markets.</p>
                                <Link to="/" className="btn space-xs-up">Get started</Link>
                                <ul className="text-left-xs price-list list-unstyled">
                                    <li>Google Search</li>
                                    <li>Google Shopping</li>
                                    <li>Google CSS (Basic)</li>
                                </ul>
                                <hr className="extra-line"/>
                                <ul className="text-left-xs price-list list-unstyled">
                                    <li>Multiple Accounts (Up to 3)</li>
                                    <li>Google CSS (Premium)</li>
                                    <li>Custom Feed Integration</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ListPricing
