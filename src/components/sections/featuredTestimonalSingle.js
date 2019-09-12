import React from "react"
import quote from '../../images/quote.png'

const FeaturedTestimonialsSingle = ({ data }) => (
    <section className="section" style={{overflow: 'hidden'}}>
        <div className="container">
            <div className="row middle-xs">
                <div className="col col-xs-12 col-md-6">
                    <h4>“My vet clinic went from just a few customers at all to an increase in customers and revenue with Cobiro”</h4>
                    <p className="small">- Simon Mogensen, Small Vet Clinic</p>
                </div>
                <div className="col col-xs-12 col-md-6">
                    <img src={quote} className="testimonial-image" style={{width: '40vw', marginLeft: '10vw', maxWidth: 'none', position: 'relative'}} alt="testimonial person"/>
                </div>
            </div>
        </div>
    </section>
)

export default FeaturedTestimonialsSingle
