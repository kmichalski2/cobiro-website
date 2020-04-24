import React from 'react'
import Classes from './mediaDownload.module.scss'
import Section from '../../UiElements/Section/Section'
import ImageAll from '../../UiElements/ImageAll/ImageAll'
import HtmlText from '../../UiElements/HtmlText/HtmlText'

const MediaDownload = ({data}) => {

    const title = data.mediaDownloadTitle ? data.mediaDownloadTitle : null
    const text = data.mediaDownloadText ? data.mediaDownloadText : null
    const cardTitle = data.mediaDownloadCardTitle ? data.mediaDownloadCardTitle : null
    const cardText = data.mediaDownloadCardText ? data.mediaDownloadCardText : null
    const downloadIcon = data.mediaDownloadIcon ? data.mediaDownloadIcon : null
    const mediaKitLink = data.mediaDownloadFiles ? data.mediaDownloadFiles : null
    // const bgColor = data.bgColor ? data.bgColor.hex : null - Remember to ad bgColor in node.js if this is activated
    const bgColor = null
    const textColor = null
    // const textColor = data.textColor === 'light' ? "text-white" : "text-black" - Remember to ad textColor in node.js if this is activated
    
    return (
        <Section
            bgColor={bgColor ? bgColor : null}
        >
            <div className="container">
                <div className="row center space">
                    <h2 className={textColor}>{title}</h2>
                </div>
                <div className="row center-xs">
                    <div className="col col-xs-12 col-lg-8 col-md-7 space-md space-sm space-xs">
                        <HtmlText RawHtml={text} classes={textColor}/>
                    </div>
                    <div className="col col-xs-12 col-lg-4 col-md-5 center">
                        <div className={["card card-square", Classes.downloadCard].join(' ')}>
                            <ImageAll image={downloadIcon}/>
                            <h3>{cardTitle}</h3>
                            <p className="small">{cardText}</p>
                            <a className={["btn", Classes.downloadButton].join(' ')} href={mediaKitLink} target="_blank" rel="noreferrer noopener">Get media kit</a>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default MediaDownload
