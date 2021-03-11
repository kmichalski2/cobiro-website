import React from 'react'
import Section from '../../UiElements/Section/Section'
import HeaderWText from '../../UiElements/HeaderWText/HeaderWText'
import ImageAll from '../../UiElements/ImageAll/ImageAll'
import Carousel from '@brainhubeu/react-carousel';
import AnyLink from '../../UiElements/AnyLink/AnyLink'

import * as Classes from './imageSlider.module.scss'

const ImageSlider = ({ data }) => {

    return (
        <Section bgColor={data.bgColor && data.bgColor.hex}>
            <div className="container">
                <div className="row center-xs">
                    <div className="col col-xs-12 col-md-8">
                        <HeaderWText
                            title={data.title}
                            h2
                            text={data.text}
                            centered
                            />
                    </div>
                </div>
                <div className="row center-xs"> 
                    { data.images ? 
                        <Carousel
                            itemWidth={500}
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
                            className={Classes.cards}
                            >
                            { data.images.map((im, i) => (
                                    <ImageAll image={im} alt={im.alt} classes={Classes.image}/>
                            ))}
                        </Carousel>
                    : null }
                </div>
                <div className="row center-xs">
                    <AnyLink 
                        link={data.internalLinkSlider ? data.internalLinkSlider.slug : data.externalLinkSlider ? data.externalLinkSlider : null}
                        title={data.linkTitle}
                        internal={data.secondaryInternalLink}
                        external={data.externalLinkSlider}
                        button
                        />
                </div>
            </div>
        </Section>
    )
}

export default ImageSlider