import React from "react"
import ImageAll from "../../UiElements/ImageAll/ImageAll"

import Classes from "./image.module.scss"
import Section from "../../UiElements/Section/Section"
import HtmlText from "../../UiElements/HtmlText/HtmlText"
import AnyLink from "../../UiElements/AnyLink/AnyLink"

const ImageSection = ({ data }) => {

    const text = (
        <>
            <HtmlText RawHtml={data.text} classes={["space-big-xs-up", data.textColor === 'light' ? "text-white" : null].join(' ')}/>
            {data.featuresWIcon ?
                <div className="row center-xs space-xs-up">
                {data.featuresWIcon.features.map((f, i) => 
                    <div key={i} className="col col-xs-6 col-md-3 space-xs-up">
                        <ImageAll image={f.icon} classes={Classes.icon}/>
                        <p  className="small">{f.text}</p>
                    </div>
                )}
                </div>
            : null }
        </>
    )

    return (
        <Section bgColor={data.bgColor && data.bgColor.hex}>
            <div className="container">
                <div className={["row center-xs", data.textColor === 'light' ? "text-white" : null].join(' ')}>
                    <div className="col col-xs-12 col-md-8 text-center">
                        { data.title ? <h2 className={["space-xs-up", data.textColor === 'light' ? "text-white" : null].join(' ')}>{data.title}</h2> : null }
                        {data.textAboveImage ? text : null }
                    </div>
                </div>
                <div className={["row center-xs", data.textColor === 'light' ? "text-white" : null].join(' ')}>
                    <div className={["col col-xs-12 text-center", data.narrowImage ? "col-md-8" : ""].join(' ')}>
                        {data.image ? 
                            <ImageAll image={data.image} fullWidth alt={data.image.alt || data.title} classes={[data.narrowImage || data.wideImage ? null : Classes.fullWidth, data.text || data.featuresWIcon ? "space-big-xs-up" : null].join(' ')} />
                        : null}
                        {data.videoEmbedCode && !data.image ?
                            <div className={["embed-responsive", data.narrowImage ? null : [Classes.fullWidth, Classes.noBorderRadius].join(' '), data.text || data.featuresWIcon ? "space-big-xs-up" : null].join(' ')}>
                                <iframe src={data.videoEmbedCode} width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                            </div>
                        : null }
                    </div>
                </div>
                {!data.textAboveImage || (data.linkTitle && data.internalLinkImage) ? 
                <div className={["row center-xs", data.textColor === 'light' ? "text-white" : null].join(' ')}>
                    <div className="col col-xs-12 col-md-8 text-center">
                        {!data.textAboveImage ? text : null }
                        {data.linkTitle && data.internalLinkImage ?
                            <AnyLink 
                                link={data.internalLinkImage.slug} 
                                internal
                                title={data.linkTitle} 
                                button
                                light={ true }
                            />
                        : null }
                    </div>
                </div>
                : null }
            </div>
        </Section>
    )
}

export default ImageSection
