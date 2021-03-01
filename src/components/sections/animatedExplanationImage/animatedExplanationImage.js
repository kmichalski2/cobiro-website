import React, { useEffect } from 'react'

import Classes from './animatedExplanationImage.module.scss'
import Section from '../../UiElements/Section/Section'
import HeaderWText from '../../UiElements/HeaderWText/HeaderWText'
import ImageAll from '../../UiElements/ImageAll/ImageAll'

import Sticky from 'react-sticky-el';

const AnimatedExplanationImage = ({ data }) => {

    const scrollArea = React.createRef()
    let scrollAreaEl

    useEffect(() => {
        scrollAreaEl = scrollArea.current
    }, [])
    
    

    return (
        <Section bgColor={data.bgColor && data.bgColor.hex}>
            <div className="container" ref={scrollArea}>
           
                {data.explanationImageSection && data.explanationImageSection.section && data.explanationImageSection.section.map((s, i) => {
                    return (
                    <div key={i} className={`sticky-wrapper-${i}`} style={{position: 'relative', display: 'block'}} >
                    <Sticky stickyClassName={Classes.sticky} boundaryElement={`.sticky-wrapper-${i}`} topOffset={-50} bottomOffset={-160} >
                    <div className="section">
                        <div className={["row middle-xs", s.alignment === 'text_left' ? "" : "reverse", Classes.imageAside].join(' ')}>
                            <div className="col col-xs-12 col-lg-6">
                                <HeaderWText 
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
                                <ImageAll 
                                        image={s.image}
                                        alt={s.image && s.image.alt}
                                        />
                            </div>
                        </div>
                    </div>
                    </Sticky>
                    </div>
                )})}
                
            </div>
        </Section>
    )
}

export default AnimatedExplanationImage