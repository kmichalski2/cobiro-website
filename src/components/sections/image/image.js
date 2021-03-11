import React from "react"
import ImageAll from "../../UiElements/ImageAll/ImageAll"

import * as Classes from "./image.module.scss"
import Section from "../../UiElements/Section/Section"
import HtmlText from "../../UiElements/HtmlText/HtmlText"
import AnyLink from "../../UiElements/AnyLink/AnyLink"

const ImageSection = ({ data }) => {

    const text = (
        <>
            <HtmlText RawHtml={data.text} classes={["space-big-xs-up", data.textColor === 'light' ? "text-white" : null, data.backgroundImageOverflowingUpperSection ? "text-black" : null].join(' ')}/>
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
            {data.linkTitle && data.internalLinkImage ?
                <AnyLink 
                    link={data.internalLinkImage.slug} 
                    internal
                    title={data.linkTitle} 
                    button
                    classes="space-xs-up"
                />
            : null }
            {
                data.backgroundImageTop ?
                    <ImageAll
                        image={data.backgroundImageTop}
                        alt={data.backgroundImageTop.alt}
                        classes={Classes.backgroundTop}
                        />
                : null
            }
        </>
    )

    return (
        <Section bgColor={data.bgColor && data.bgColor.hex} classes={[Classes.section, data.backgroundImageOverflowingUpperSection ? Classes.paddingTopBig : null, data.noPaddingBottom ? Classes.noPaddingBottom : null].join(' ')}>
            {data.backgroundImageOverflowingUpperSection ?
                <ImageAll
                    image={data.backgroundImageOverflowingUpperSection}
                    alt={data.backgroundImageOverflowingUpperSection.alt}
                    classes={Classes.backgroundTopOverFlowing}
                    />
            : null}
            <div className="container">
                <div className={["row center-xs", data.textColor === 'light' ? "text-white" : null].join(' ')}>
                    <div className="col col-xs-12 col-md-8 text-center">
                        { data.title ? <h2 className={["space-xs-up", data.textColor === 'light' ? "text-white" : null].join(' ')}>{data.title}</h2> : null }
                        {data.textAboveImage ? text : null }
                    </div>
                </div>
                <div className={["row center-xs", data.textColor === 'light' ? "text-white" : null].join(' ')}>
                    <div className={["col col-xs-12 text-center", data.narrowImage ? "col-md-8" : data.imageContainerWidth ? "col-md-12" : ""].join(' ')}>
                        {data.image ? 
                            <ImageAll image={data.image} fullWidth alt={data.image.alt || data.title} classes={[data.narrowImage || data.imageContainerWidth ? null : data.wideImage ? Classes.extraFullWidth : Classes.fullWidth, data.text && !data.noPaddingBottom || data.featuresWIcon && !data.noPaddingBottom ? "space-big-xs-up" : null].join(' ')} />
                        : null}
                        {data.videoEmbedCode && !data.image ?
                            <div className={["embed-responsive", data.narrowImage ? null : [Classes.fullWidth, Classes.noBorderRadius].join(' '), data.text && !data.noPaddingBottom || data.featuresWIcon && !data.noPaddingBottom ? "space-big-xs-up" : null].join(' ')}>
                                <iframe src={data.videoEmbedCode} width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
                            </div>
                        : null }
                    </div>
                </div>
                {!data.textAboveImage || (data.linkTitle && data.internalLinkImage) ? 
                <div className={["row center-xs", data.textColor === 'light' ? "text-white" : null].join(' ')}>
                    <div className="col col-xs-12 col-md-8 text-center">
                        {!data.textAboveImage ? text : null }
                        
                    </div>
                </div>
                : null }
            </div>
        </Section>
    )
}

export default ImageSection
