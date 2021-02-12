import React from 'react'
import HeaderWText from '../../UiElements/HeaderWText/HeaderWText'
import ImageAll from '../../UiElements/ImageAll/ImageAll'
import Section from '../../UiElements/Section/Section'

import Classes from './officeLocations.module.scss'

const OfficeLocations = ({data}) => {

    return (
    <Section bgColor={data.bgColor && data.bgColor.hex}>
        <div className="container">
            <div className="row center-xs">
                <div className="col col-xs-12 col-md-8 col-lg-6">
                    <HeaderWText 
                        title={data.title}
                        h2
                        text={data.text}
                        centered/>
                </div>
            </div>
            <div className={["row center-xs", Classes.imageRow].join(' ')}>
                <ImageAll 
                    image={data.mapImage}
                    alt={data.mapImage && data.mapImage.alt || data.title}
                    classes={Classes.mapImage}
                    />
                {data.offices && data.offices.map((o, i) => (
                    <div key={i} className="col col-xs-12 col-md-4">
                        <ImageAll 
                            image={o.image}
                            alt={o.image && o.image.alt || o.title}
                            classes="space-xs-up img-full-width"
                        />
                            <HeaderWText 
                                title={o.title}
                                h4
                                text={o.text}
                                />
                    </div>  
                ))}
                
            </div>
        </div>
    </Section>
    )
}

export default OfficeLocations