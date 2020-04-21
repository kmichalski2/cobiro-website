import React from 'react'
import Section from '../../UiElements/Section/Section'
import HeaderWText from '../../UiElements/HeaderWText/HeaderWText'
import ImageAll from '../../UiElements/ImageAll/ImageAll'

import Classes from './gallery.module.scss'
import AnyLink from '../../UiElements/AnyLink/AnyLink'

const Gallery = ({ data }) => {

    return (
        <Section bgColor={data.bgColor && data.bgColor.hex}>
            <div className="container">
                <div className="row center-xs">
                    <div className="col col-xs-12 col-md-8 col-lg-6">
                        <HeaderWText
                            title={data.title}
                            text={data.text}
                            h2
                            centered
                            light={data.textColor === 'light'}
                            />
                    </div>
                </div>
                <div className={["row center-xs", Classes.gallery].join(' ')}>
                    { data.images ? 
                        data.images.map((im, i) => (
                            <div className="col col-xs-6 col-md-4">
                                <ImageAll image={im} alt={im.alt} classes={Classes.image}/>
                            </div>
                        )) 
                    : null }
                </div>
                <div className="row center-xs">
                    <AnyLink 
                        link={data.secondaryInternalLink ? data.secondaryInternalLink.slug : data.secondaryExternalLink ? data.secondaryExternalLink : null}
                        title={data.secondaryLinkTitle}
                        internal={data.secondaryInternalLink}
                        external={data.secondaryExternalLink}
                        button
                        large
                        secondary
                        light={data.textColor === 'light'}
                        />
                    <AnyLink 
                        link={data.primaryInternalLink ? data.primaryInternalLink.slug : data.primaryExternalLink ? data.primaryExternalLink : null}
                        title={data.primaryLinkTitle}
                        internal={data.primaryInternalLink}
                        external={data.primaryExternalLink}
                        button
                        large
                        classes={Classes.btnLast}
                        light={data.textColor === 'light'}
                        />
                </div>
            </div>
           
        </Section>
    )
}

export default Gallery