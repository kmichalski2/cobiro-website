import React from 'react'
import ServicesStyles from './Services.module.scss'

const Services = () => {

    return (
        <section className="section">
             <div className="container">
                <div className="row center-xs middle-xs">
                    <div className="col col-xs-12 text-center section-header">
                        <h2>What we can do for you</h2>
                        <p>Lorem ipsum dolor sit amet, consetetur se ipsum dolor sit amet, consetetur se</p>
                    </div>
                </div>  
                <div className="row text-center">
                <div className={ServicesStyles.line}></div>
                    <div className="col col-xs-12 col-sm-2"><p className="text-bold text-black small">Google Search Marketing</p></div>
                    <div className="col col-xs-12 col-sm-2"><p className="text-bold text-black small">Google My Business</p></div>
                    <div className="col col-xs-12 col-sm-2"><p className="text-bold text-black small">Get Gift Card</p></div>
                    <div className="col col-xs-12 col-sm-2"><p className="text-bold text-black small">Facebook Marketing</p></div>
                    <div className="col col-xs-12 col-sm-2"><p className="text-bold text-black small">Instagram Marketing</p></div>
                    <div className="col col-xs-12 col-sm-2"><p className="text-bold text-black small">Competitors</p></div> 
                </div>
            </div>
        </section>
    )
}

export default Services