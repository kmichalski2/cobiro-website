import React from 'react'
import AnyLink from '../../UiElements/AnyLink/AnyLink'
import GradiantBar from '../../UiElements/gradiantBar/gradiantBar'
import HtmlText from '../../UiElements/HtmlText/HtmlText'
import Section from '../../UiElements/Section/Section'

import Classes from './ctaCardGradiantLine.module.scss'

const CtaCardGradiantLine = ({ data }) => {

    return (
        <Section bgColor={data.sectionBackgroundColor && data.sectionBackgroundColor.hex}>
            <div className="container">
                <div className="col col-xs-12">
                    <div className={["card card-visible text-left", Classes.card].join(' ')} style={data.boxBackgroundColor && data.boxBackgroundColor.hex ? {backgroundColor: data.boxBackgroundColor.hex} : null}>
                        <h2 className="h1">{data.title}</h2>
                        <GradiantBar wide />
                        <HtmlText
                            RawHtml={data.text}
                            classes="space-xs-up"
                            />
                        <AnyLink
                            link={data.externalLinkGradiantCard || data.internalLinkGradiantCard && data.internalLinkGradiantCard.slug}
                            title={data.linkTitle}
                            external={data.externalLinkGradiantCard && (!data.internalLinkGradiantCard || !data.internalLinkGradiantCard.slug) && true}
                            internal={data.internalLinkGradiantCard && data.internalLinkGradiantCard.slug && true}
                            button
                            large
                            />
                            
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default CtaCardGradiantLine