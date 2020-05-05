import React from 'react'
import Section from '../../UiElements/Section/Section'
import HeaderWText from '../../UiElements/HeaderWText/HeaderWText'
import ImageAll from '../../UiElements/ImageAll/ImageAll'
import Carousel from '@brainhubeu/react-carousel';

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
                            <div key={i} className={["col visible-md-up col-md-6 col-lg-4"].join(' ')}>
                                <ImageAll image={im} alt={im.alt} classes={Classes.image}/>
                            </div>
                        ))
                    : null }
                    
                { data.images ? 
                    <Carousel
                        itemWidth={250}
                        offset={0}
                        slidesPerPage={4}
                        centered={true} 
                        stopAutoPlayOnHover={false}
                        animationSpeed={1000}
                        autoPlay={3000}
                        infinite={true}
                        breakpoints={{
                            2800: {
                                slidesPerPage: 4,
                            },
                            2200: {
                                slidesPerPage: 3,
                            },
                            2000: {
                                slidesPerPage: 2,
                            },
                            950: {
                                slidesPerPage: 1,
                            },
                            650: {
                                slidesPerPage: 1,
                                animationSpeed: 1000,
                                // autoPlay: 5000,
                                offset: 0,
                                centered: true,
                            },
                        }}
                        className={[Classes.cards, Classes.slider, "hidden-md-up"].join(" ")}
                    >
                        
                        { data.images.map((im, i) => (
                            <div key={i} className={[Classes.cards, Classes.slider].join(" ")}>
                                <ImageAll image={im} alt={im.alt} classes={Classes.image}/>
                            </div>
                        ))}
                       
                    </Carousel>
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
                        classes={data.secondaryInternalLink || data.secondaryExternalLink ? Classes.btnLast : null}
                        light={data.textColor === 'light'}
                        />
                </div>
            </div>
           
        </Section>
    )
}

export default Gallery