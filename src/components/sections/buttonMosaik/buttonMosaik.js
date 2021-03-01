import React from 'react'
import AnyLink from '../../UiElements/AnyLink/AnyLink'
import HeaderWText from '../../UiElements/HeaderWText/HeaderWText'
import HtmlText from '../../UiElements/HtmlText/HtmlText'
import ImageAll from '../../UiElements/ImageAll/ImageAll'
import Section from '../../UiElements/Section/Section'

import Classes from './buttonMosaik.module.scss'


const ButtonMosaik = ({ data }) => {
    return (
        <Section bgColor={data.bgColor && data.bgColor.hex || null}>
            <div className="container">
                <div className="row center-xs">
                    <div className="col col-xs-12 col-md-8">
                        <HeaderWText
                            title={data.title}
                            text={data.text}
                            h2
                            centered
                            />
                    </div>
                </div>
                <div className="row stretch-xs">
                    <div className="col col-xs-12 col-lg-6">
                        <div className="row">
                            <div className="col col-xs-12">
                                <div className="row stretch-xs">
                                    <div className="col col-xs-12 col-lg-6 flex">
                                        <div className={["card card-visible flex flex-column-xs between-xs  middle-xs", Classes.card].join(' ')}>
                                            <HtmlText 
                                                RawHtml={data.narrowButtonTopLeftText}
                                                centered
                                                />
                                            
                                            <ImageAll 
                                                image={data.narrowButtonTopLeftImage}
                                                classes={Classes.narrowImage}
                                                />
                                        </div>
                                    </div>
                                    <div className="col col-xs-12 col-lg-6 flex center-xs">
                                    <div className={["card card-visible flex flex-column-xs between-xs middle-xs", Classes.card].join(' ')}>
                                        <ImageAll 
                                            image={data.narrowButtonTopMiddleImage}
                                            classes={[Classes.narrowImage, 'space-xs-up'].join(' ')}
                                            />
                                            <HtmlText 
                                                RawHtml={data.narrowButtonTopMiddleText}
                                                centered
                                                classes={'space-xs-up'}
                                                />
                                            <AnyLink 
                                                link={data.narrowButtonTopMiddleInternalLink && data.narrowButtonTopMiddleInternalLink.slug || data.narrowButtonTopMiddleExternalLink}
                                                title={data.narrowButtonTopMiddleLinkText}
                                                internal={data.narrowButtonTopMiddleInternalLink && data.narrowButtonTopMiddleInternalLink.slug}
                                                external={data.narrowButtonTopMiddleExternalLink}
                                                />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="col col-xs-12">
                            <div className={["card card-visible", Classes.card].join(' ')}>
                                
                                    <div className="row">
                                        <div className="col col-xs-12 col-lg-6">
                                            <HtmlText 
                                                RawHtml={data.wideButtonBottomLeftText}
                                                centered
                                                classes={'space-xs-up'}
                                                />
                                            <AnyLink 
                                                link={data.wideButtonBottomLeftInternalLink && data.wideButtonBottomLeftInternalLink.slug || data.wideButtonBottomLeftExternalLink}
                                                title={data.wideButtonBottomLeftLinkText}
                                                internal={data.wideButtonBottomLeftInternalLink && data.wideButtonBottomLeftInternalLink.slug}
                                                external={data.wideButtonBottomLeftExternalLink}
                                                />
                                        </div>
                                        <div className="col col-xs-12 col-lg-6">
                                            <ImageAll 
                                                image={data.wideButtonBottomLeftImage}
                                                classes={Classes.bottomWideImage}
                                                />
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-xs-12 col-lg-6 flex">
                        <div className={["card card-visible", Classes.card].join(' ')}>
                            <ImageAll 
                                image={data.buttonRightBigBackgroundImage}
                                classes={Classes.buttonRightBigBackground}
                                />
                            <HtmlText 
                                RawHtml={data.buttonRightBigText}
                                centered
                                classes={['space-xs-up', Classes.buttonBigText].join(' ')}
                                />
                            <AnyLink 
                                link={data.buttonRightBigInternalLink && data.buttonRightBigInternalLink.slug || data.wbuttonRightBigExternalLink}
                                title={data.buttonRightBigLinkText}
                                internal={data.buttonRightBigInternalLink && data.buttonRightBigInternalLink.slug}
                                external={data.buttonRightBigExternalLink}
                                />
                             <ImageAll 
                                image={data.buttonRightBigImage}
                                classes={Classes.buttonRightBigImage}
                                />
                        </div>
                    </div>
                </div>
            </div>
            
        </Section>
    )
}

export default ButtonMosaik