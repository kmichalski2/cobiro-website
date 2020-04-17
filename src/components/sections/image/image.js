import React from "react"
import ImageAll from "../../UiElements/ImageAll/ImageAll"

import Classes from "./image.module.scss"
import Section from "../../UiElements/Section/Section"
import HtmlText from "../../UiElements/HtmlText/HtmlText"

const ImageSection = ({ data }) => {

    return (
        <Section>
            <div className="container">
                <div className="row center-xs">
                    <div className="col col-xs-12 col-md-8 text-center">
                        <h2>{data.title}</h2>
                        <ImageAll image={data.image} fullWidth alt={data.image.alt || data.title} />
                        <HtmlText RawHtml={data.text} classes="space-xs-up"/>
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
