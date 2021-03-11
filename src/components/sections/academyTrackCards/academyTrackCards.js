import React from 'react'
import HeaderWText from '../../UiElements/HeaderWText/HeaderWText'
import ImageAll from '../../UiElements/ImageAll/ImageAll'
import Section from '../../UiElements/Section/Section'

import * as Classes from './academyTrackCards.module.scss'


const AcademyTrackCards = ({ data }) => {
    const light = data.textColor === 'light'
    return (
        <Section bgColor={data.bgColor && data.bgColor.hex}>
            <div className="container">
                <div className="row center-xs">
                    <div className="col col-xs-12 col-md-8 col-lg-6">
                        <HeaderWText 
                            h2
                            title={data.title}
                            text={data.text}
                            light={light}
                            centered
                            />
                    </div>
                </div>
                <div className="row">
                    <div className="col col-xs-12">
                        <div className={Classes.cardsWrapper}>
                            {data.courseTrackCards && data.courseTrackCards.cards.length > 0 ?
                                data.courseTrackCards.cards.map((c, i) => (
                                    <div key={i} className={[Classes.card, light ? Classes.inverted : null, c.featuredCard ? Classes.featured : null].join(' ')}>
                                        {c.featuredCard ?
                                        <div className={Classes.label}>
                                            {c.blueLabelText}
                                        </div> 
                                        : null }
                                        <ImageAll
                                            image={c.icon}
                                            alt={c.icon.alt || c.title}
                                            classes="space-xs-up"
                                            />
                                       <HeaderWText
                                            h3
                                            title={c.title}
                                            text={c.text}
                                            light={light}
                                            links={[{
                                                link: c.externalLink,
                                                title: c.linkTitle,
                                                external: c.externalLink,
                                                button: true,
                                                secondary: !c.featuredCard,
                                                light: light
                                            }]}
                                            classes="space-big-xs-up"
                                            />
                                            <p className={["text-bold", light ? "text-white" : null].join(' ')}>{c.listTitle}</p>
                                            <ul className=" text-left price-list list-unstyled small">
                                            {JSON.parse(c.checkmarkList).map((c, i) => (
                                                
                                                    <li key={i}>{c}</li>
                                            
                                            ))}
                                            </ul>
                                    </div>
                                ))
                            : null}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default AcademyTrackCards