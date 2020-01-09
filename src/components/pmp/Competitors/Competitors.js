import React from 'react'

import CompetitorStyles from './Competitors.module.scss'

const Competitors = ({competitors}) => {

    return (
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12 text-center section-header">
                        <h2>Competitors and Similiar sites</h2>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut</p>
                    </div>
                    {competitors ? competitors.map((c, i) =>
                    <div key={i} className="col col-xs-6 col-md-4">
                        <div className={["card card-visible text-center", CompetitorStyles.card].join(' ')}>
                            <p className="text-black small">{c}</p>
                            <img className={CompetitorStyles.screenshot} src="" />
                            <div className="flex between-xs center-xs">
                                <p className="text-black small no-mb">{c}</p>
                                <img src="" className={CompetitorStyles.flag} />
                            </div>
                        </div>
                    </div>
                    ) : null }
                </div>
            </div>
        </section>
    )
}

export default Competitors