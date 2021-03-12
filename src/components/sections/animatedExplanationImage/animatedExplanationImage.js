import React, { useEffect, useState } from 'react'

import * as Classes from './animatedExplanationImage.module.scss'
import Section from '../../UiElements/Section/Section'
import HeaderWText from '../../UiElements/HeaderWText/HeaderWText'
import ImageAll from '../../UiElements/ImageAll/ImageAll'

const AnimatedExplanationImage = ({ data }) => {

    const [visibleImage, setVisibleImage] = useState()

    useEffect(() => {
        // Get element with ".animated" class, which has "data-sal" attribute
        const element = document.querySelector(`.${Classes.section}`);

        console.log('element', element, Classes.sections)

        element.addEventListener('sal:in', ({ detail }) => {
            console.log('entering', detail.target.dataset.index);
            setVisibleImage(detail.target.dataset.index)
        });
        element.addEventListener('sal:out', ({ detail }) => {
            console.log('exiting', detail.target.dataset.index);

            if(visibleImage === detail.target.dataset.index) {
                setVisibleImage(null)
            }
        });
    }, [])

    useEffect(() => {
        console.log(visibleImage)
    }, [visibleImage])
    
    

    return (
        <Section bgColor={data.bgColor && data.bgColor.hex} classes={Classes.section}>
            <div className="container">
           
                {data.explanationImageSection && data.explanationImageSection.section && data.explanationImageSection.section.map((s, i) => {
                    return (
                    <div key={i} className={["section", Classes.sections].join(' ')} data-sal="fade" data-sal-duration={i > 0 && i < data.explanationImageSection.section.length ? "500" : "250"} data-index={i}>
                        <div className={Classes.inner}>
                        <div className={["row middle-xs", s.alignment === 'text_left' ? Classes.reverseMobile : "reverse", Classes.imageAside].join(' ')}>
                            <div className="col col-xs-12 col-lg-6">
                                <HeaderWText 
                                    classes={Classes.text}
                                    title={s.title}
                                    h2
                                    text={s.text}
                                    light={s.textColor === 'light'}
                                    links={[
                                        {
                                            link: s.internalLink ? s.internalLink.slug : s.externalLink ? s.externalLink : null,
                                            internal: s.internalLink,
                                            external: s.externalLink,
                                            title: s.linkTitle,
                                            button: true,
                                            large: false
                                        }
                                    ]}
                                    />
                            </div>
                            <div className="col col-xs-12 col-lg-6">
                                <div className={[Classes.image, visibleImage == i ? Classes.visibleImage : null].join(' ')}>
                                <ImageAll 
                                        image={s.image}
                                        alt={s.image && s.image.alt}
                                        />
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    
                )})}
                
            </div>
        </Section>
    )
}

export default AnimatedExplanationImage