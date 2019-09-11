import React from "react"
import QuoteStyles from "./quotes.module.scss"
import placeholderImage from '../../../images/placeholder_round.svg'
import placeholderFlag from '../../../images/placeholder_flag.png'

const Quotes = ({ data }) => (
    <section className="section">
        <div className="container-fluid">
            <div className="row section-header">
                <div className="col col-xs-12 text-center">
                    <h2>You’re in good company</h2>
                    <p>Join more than 50,000 customers who already manage ads better</p>
                </div>
            </div>
            <div className={[QuoteStyles.cards, 'flex'].join(' ')}>
            <div className={[QuoteStyles.quote, 'card card-visible text-left-xs between-xs flex flex-column'].join(' ')}>
                    <div className="flex start-xs middle-xs space-xs-up">
                        <img src={placeholderImage} className="img-fluid" alt="quote"/>
                        <div>
                            <p className="small text-bold">Person Name</p>
                            <div className="flex middle-xs"><img className={QuoteStyles.flag} src={placeholderFlag} alt="flag"/><p className="small">Person Country</p></div>
                        </div>
                    </div>
                    <p className="small">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis faucibus sem, sit amet vestibulum mauris vehicula quis. Fusce cursus venenatis diam et sagittis.</p>
                </div>
                <div className={[QuoteStyles.quote, 'card card-visible text-left-xs between-xs flex flex-column'].join(' ')}>
                    <div className="flex start-xs middle-xs space-xs-up">
                        <img src={placeholderImage} className="img-fluid" alt="quote"/>
                        <div>
                            <p className="small text-bold">Person Name</p>
                            <div className="flex middle-xs"><img className={QuoteStyles.flag} src={placeholderFlag} alt="flag"/><p className="small">Person Country</p></div>
                        </div>
                    </div>
                    <p className="small">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis faucibus sem, sit amet vestibulum mauris vehicula quis. Fusce cursus venenatis diam et sagittis.</p>
                </div>
                <div className={[QuoteStyles.quote, 'card card-visible text-left-xs between-xs flex flex-column'].join(' ')}>
                    <div className="flex start-xs middle-xs space-xs-up">
                        <img src={placeholderImage} className="img-fluid" alt="quote"/>
                        <div>
                            <p className="small text-bold">Person Name</p>
                            <div className="flex middle-xs"><img className={QuoteStyles.flag} src={placeholderFlag} alt="flag"/><p className="small">Person Country</p></div>
                        </div>
                    </div>
                    <p className="small">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis faucibus sem, sit amet vestibulum mauris vehicula quis. Fusce cursus venenatis diam et sagittis.</p>
                </div>
                <div className={[QuoteStyles.quote, 'card card-visible text-left-xs between-xs flex flex-column'].join(' ')}>
                    <div className="flex start-xs middle-xs space-xs-up">
                        <img src={placeholderImage} className="img-fluid" alt="quote"/>
                        <div>
                            <p className="small text-bold">Person Name</p>
                            <div className="flex middle-xs"><img className={QuoteStyles.flag} src={placeholderFlag} alt="flag"/><p className="small">Person Country</p></div>
                        </div>
                    </div>
                    <p className="small">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis faucibus sem, sit amet vestibulum mauris vehicula quis. Fusce cursus venenatis diam et sagittis.</p>
                </div>
                <div className={[QuoteStyles.quote, 'card card-visible text-left-xs between-xs flex flex-column'].join(' ')}>
                    <div className="flex start-xs middle-xs space-xs-up">
                        <img src={placeholderImage} className="img-fluid" alt="quote"/>
                        <div>
                            <p className="small text-bold">Person Name</p>
                            <div className="flex middle-xs"><img className={QuoteStyles.flag} src={placeholderFlag} alt="flag"/><p className="small">Person Country</p></div>
                        </div>
                    </div>
                    <p className="small">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis faucibus sem, sit amet vestibulum mauris vehicula quis. Fusce cursus venenatis diam et sagittis.</p>
                </div>
                <div className={[QuoteStyles.quote, 'card card-visible text-left-xs between-xs flex flex-column'].join(' ')}>
                    <div className="flex start-xs middle-xs space-xs-up">
                        <img src={placeholderImage} className="img-fluid" alt="quote"/>
                        <div>
                            <p className="small text-bold">Person Name</p>
                            <div className="flex middle-xs"><img className={QuoteStyles.flag} src={placeholderFlag} alt="flag"/><p className="small">Person Country</p></div>
                        </div>
                    </div>
                    <p className="small">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis faucibus sem, sit amet vestibulum mauris vehicula quis. Fusce cursus venenatis diam et sagittis.</p>
                </div>
                <div className={[QuoteStyles.quote, 'card card-visible text-left-xs between-xs flex flex-column'].join(' ')}>
                    <div className="flex start-xs middle-xs space-xs-up">
                        <img src={placeholderImage} className="img-fluid" alt="quote"/>
                        <div>
                            <p className="small text-bold">Person Name</p>
                            <div className="flex middle-xs"><img className={QuoteStyles.flag} src={placeholderFlag} alt="flag"/><p className="small">Person Country</p></div>
                        </div>
                    </div>
                    <p className="small">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis faucibus sem, sit amet vestibulum mauris vehicula quis. Fusce cursus venenatis diam et sagittis.</p>
                </div>
            </div>
        </div>
    </section>

)

export default Quotes
