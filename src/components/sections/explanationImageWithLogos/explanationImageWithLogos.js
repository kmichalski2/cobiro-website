import React from 'react'
import HeaderWText from '../../UiElements/HeaderWText/HeaderWText'
import ImageAll from '../../UiElements/ImageAll/ImageAll'
import Section from '../../UiElements/Section/Section'

import Classes from './explanationImageWithLogos.module.scss'

const ExplanationImageWithLogos = ({data}) => {
    

    return (
        <Section bgColor={data.bgColor && data.bgColor.hex} classes={Classes.section}>
            <div className="container">
                <div className="row middle-xs space-big-xs-up">
                    <div className="col col-sm-12 col-md-6">
                            <HeaderWText
                                title={data.title}
                                h2
                                text={data.text}
                            />
                    </div>
                    <div className="col col-sm-12 col-md-6">
                        <div className={["space-sm space-xs", Classes.imageWrapper].join(' ')}>
                            <ImageAll 
                                image={data.image}
                                alt={data.image.alt ? data.image.alt : data.title} />
                            <ImageAll 
                                image={data.backgroundImage}
                                // alt={data.backgroundImage && data.backgroundImag.alt ? data.backgroundImag.alt : data.title} 
                                classes={Classes.backgroundImage}/>
                        </div>
                    </div>
                </div>
                <div className="row middle-xs">
                    <div className="col col-sm-12 col-md-6">
                            <HeaderWText
                                title={data.logosTitle}
                                h2
                                text={data.logosText}
                            />
                    </div>
                </div>
                <div className="row">
                    {data.logos && data.logos.map((l, i) => (
                        <div key={i} className="col col-xs-4">
                            <ImageAll 
                                image={l}
                                alt={l.alt ? l.alt : data.title} />
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    )
}

export default ExplanationImageWithLogos