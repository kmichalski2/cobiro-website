import React, { useEffect, useState } from 'react'
import Classes from './iframeForm.module.scss'

const IframeForm = ({data}) => {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setLoaded(true)
    }, [])
    const createMarkup = (text)  => {
        return {__html: text}
    }

    const iframe = (
        <div className={Classes.iframeWrapper} dangerouslySetInnerHTML={createMarkup(data.iframeEmbed)}></div>
    )

    return (
        <section className="section">
            <div className="container">
                <div className="row middle-xs center-xs">
                    <div className="first-xs col col-xs-12 col-md-10 col-lg-6 space-xs-up">
                        <h2>{data.title}</h2>
                        <div className="space-xs-up" dangerouslySetInnerHTML={createMarkup(data.text)}></div> 
                    </div>
                    <div className="col col-xs-12 col-md-10 col-lg-6">
                        <div className="card card-visible text-left">
                            {loaded ? iframe : null}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default IframeForm