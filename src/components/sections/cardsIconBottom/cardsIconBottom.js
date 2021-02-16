import React from 'react'
import AnyLink from '../../UiElements/AnyLink/AnyLink'
import HeaderWText from '../../UiElements/HeaderWText/HeaderWText'
import ImageAll from '../../UiElements/ImageAll/ImageAll'
import Section from '../../UiElements/Section/Section'

import Classes from './cardsIconBottom.module.scss'

const CardsIconBottom = ({ data }) => {

    return (
        <Section bgColor={data.bgColor && data.bgColor.hex}>
            <div className="container">
                <div className="row center-xs">
                    <div className="col col-xs-12 col-md-8 space-xs-up">
                        <HeaderWText 
                            h2
                            centered
                            title={data.title}
                            text={data.text}
                            />
                    </div>
                </div>
                <div className="row center-xs flex stretch-xs">
                    {data.cards && data.cards.cards && data.cards.cards.map((c, i) => (
                        <div key={i} className="col col-xs-12 col-md-6 col-lg-3 flex stretch-xs">
                            <div className="card card-visible text-left flex between-xs stretch-xs flex-column-xs">
                                <HeaderWText
                                    h3
                                    title={c.title}
                                    text={c.text}
                                    />
                                    <div>
                                        <AnyLink 
                                            link={c.externalLink || c.internalLink && c.internalLink.slug}
                                            title={c.linkTitle}
                                            external={c.externalLink && (!c.internalLink || !c.internalLink.slug) && true}
                                            internal={c.internalLink && c.internalLink.slug && true}
                                            button
                                            classes={Classes.button}
                                            />
                                        <ImageAll 
                                            image={c.icon}
                                            alt={c.icon && c.icon.alt || c.title}
                                            classes={Classes.icon}
                                            />
                                    </div>
                            </div>                        
                        </div>
                    ))}
                    
                </div>
            </div>
        </Section>
    )
}

export default CardsIconBottom