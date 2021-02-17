import React from 'react'
import BoxLink from '../../UiElements/boxLink/boxLink'
import HeaderWText from '../../UiElements/HeaderWText/HeaderWText'
import Section from '../../UiElements/Section/Section'

import Classes from './multipleLinks.module.scss'

const MulitpleLinks = ({data}) => {

    return (
        <Section bgColor={data.bgColor && data.bgColor.hex}>
            <div className="container">
                <div className="row center-xs">
                    <div className="col col-xs-12 col-md-8 space-xs-up">
                        <HeaderWText 
                            h2
                            centered
                            title={data.title}
                            text={data.text} />
                    </div>
                </div>
                <div className="row center-xs">
                    {data.linkCollection.links.map((l, i) => 
                    l.internalLink && l.internalLink.slug || l.externalLink ? 
                    <div key={i} className="col col-xs-12 col-md-6 col-lg-4">
                        <BoxLink subtitle={l.title} text={l.text} link={l.internalLink && l.internalLink.slug || l.externalLink} internal={l.internalLink && l.internalLink.slug} />
                    </div>
                    : null
                    )}
                </div>
            </div>
        </Section>
    )
}

export default MulitpleLinks