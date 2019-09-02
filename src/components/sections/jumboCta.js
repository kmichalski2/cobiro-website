import { Link } from "gatsby"
import React from "react"

const JumboCta = ({ data }) => (
    <section className="section">
        <div className="section-inner">
            <div className="container">
                <div className="row center-xs text-center">
                    <div className="col col-xs-12">
                        <h2>Jumbo CTA</h2>
                        <p>Text for jumbo CTA</p>
                        <Link to="/" className="btn btn-large space-xs space-sm">Read more</Link>
                    </div>
                </div>
            </div>
        </div>
    </section>

)

export default JumboCta
