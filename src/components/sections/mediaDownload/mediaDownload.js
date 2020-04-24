import React from 'react'
import Classes from './mediaDownload.module.scss'
import Section from '../../UiElements/Section/Section'

const MediaDownload = ({data}) => {

    const title = data.mediaDownloadTitle ? data.mediaDownloadTitle : null
    const text = data.mediaDownloadText ? data.mediaDownloadText : null
    const cardTitle = data.mediaDownloadCardTitle ? data.mediaDownloadCardTitl : null
    const cardText = data.mediaDownloadCardText ? data.mediaDownloadCardText : null
    const downloadIcon = data.mediaDownloadIcon ? data.mediaDownloadIcon : null
    const downloadFile = data.downloadFile ? data.downloadFile : null
    const bgColor = data.ctaBgColor ? data.ctaBackgroundColor.hex : null
    const textColor = data.textColor === 'light' ? "text-white" : "text-black"
    
    return (
        <Section
            bgColor={bgColor ? bgColor : null}
        >
        <div className="container">
            <div className="row text-center center-xs">
                <div className="col-xs-10 col-xl-8">
                <h1>{title}</h1>
                </div>
            </div>
        </div>
        
        </Section>
    )
}

export default MediaDownload
