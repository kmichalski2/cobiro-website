import React from "react"
import ImageAll from "../../UiElements/ImageAll/ImageAll"

import Classes from "./image.module.scss"
import Section from "../../UiElements/Section/Section"
import HtmlText from "../../UiElements/HtmlText/HtmlText"

const ImageSection = ({ data }) => {

    return (
        <Section bgColor={data.bgColor && data.bgColor.hex}>
            <div className="container">
                <div className={["row center-xs", data.textColor === 'light' ? "text-white" : null].join(' ')}>
                    <div className="col col-xs-12 col-md-8 text-center">
                        { data.title ? <h2 className={["space-xs-up", data.textColor === 'light' ? "text-white" : null].join(' ')}>{data.title}</h2> : null }
                        {data.image ? 
                            <ImageAll image={data.image} fullWidth alt={data.image.alt || data.title} classes={[data.narrowImage ? null : Classes.fullWidth, data.text || data.featuresWIcon ? "space-xs-up" : null].join(' ')} />
                        : null}
                        {data.videoEmbedCode && !data.image ?
                            <div className={["embed-responsive", data.narrowImage ? null : [Classes.fullWidth, Classes.noBorderRadius].join(' '), data.text || data.featuresWIcon ? "space-xs-up" : null].join(' ')}>
                                <iframe src={data.videoEmbedCode} width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                            </div>
                        : null }
                        <HtmlText RawHtml={data.text} classes={["space-xs-up", data.textColor === 'light' ? "text-white" : null].join(' ')}/>
                        {data.featuresWIcon ?
                            <div className="row center-xs">
                            {data.featuresWIcon.features.map((f, i) => 
                                <div key={i} className="col col-xs-6 col-md-3 space-xs-up">
                                    <ImageAll image={f.icon} classes={Classes.icon}/>
                                    <p  className="small">{f.text}</p>
                                </div>
                            )}
                            </div>
                        : null }
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default ImageSection
