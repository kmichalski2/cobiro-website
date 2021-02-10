import React from 'react'
import AnyLink from '../../UiElements/AnyLink/AnyLink'
import HtmlText from '../../UiElements/HtmlText/HtmlText'
import ImageAll from '../../UiElements/ImageAll/ImageAll'
import Section from '../../UiElements/Section/Section'

import Classes from './ctaCard.module.scss'

const CtaCard = ({data}) => {

    return (
        <Section bgColor={data.ctaSectionBackgroundImage ? null : data.backgroundColorCtaCardSection && data.backgroundColorCtaCardSection.hex}>
        <ImageAll image={data.ctaSectionBackgroundImage} classes={Classes.backgroundImage}/>
        <div className="container">
            <div className={["row center-xs", data.textColor === 'light' ? "text-white" : null].join(' ')}>
                <div className="col col-xs-12 col-md-8 text-center">
                    { data.title ? <h2 className={["space-xs-up", data.textColor === 'light' ? "text-white" : null].join(' ')}>{data.title}</h2> : null }
                    {data.subtitle ? 
                        <HtmlText RawHtml={data.subtitle} classes={["space-big-xs-up", data.textColor === 'light' ? "text-white" : null].join(' ')}/>
                    : null }
                </div>
            </div>
            <div className={["row center-xs", data.textColor === 'light' ? "text-white" : null, "space-xs-up"].join(' ')}>
                <div className="col col-xs-12 text-center">
                    <div className={["card", Classes.card].join(' ')}>
                    <div className={Classes.label}>
                        {data.ctaCard.cardLabel}
                    </div>
                        <div className="row">
                            <div className="col col-xs-12 col-md-6 text-left">
                                <h3 className={[data.ctaCard.cardTextColor === 'light' ? "text-white" : null, "space-xs-up"].join(' ')}>{data.ctaCard.title}</h3>
                                {data.ctaCard.bullit && data.ctaCard.bullit.length > 0 ?
                                    data.ctaCard.bullit.map((b, i) => (
                                        <div key={i} className={Classes.bullit}>
                                            <ImageAll image={b.icon} classes={Classes.icon}/>
                                            <p className={[data.ctaCard.cardTextColor === 'light' ? "text-white" : null, "small"].join(' ')}>{b.text}</p>
                                        </div>
                                    ))
                                : null }
                                <h4 className={[Classes.price, data.ctaCard.cardTextColor === 'light' ? "text-white" : null, "h2"].join(' ')}>{data.ctaCard.price}</h4>
                                <p className={["small", Classes.paymentRate].join(' ')}>{data.ctaCard.paymentRate}</p>
                            </div>
                                <div className={Classes.imageWrapper}>
                                    <ImageAll image={data.ctaCard.cardImage} classes={Classes.image}/>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row center-xs">
                <div className="col col-xs-12 text-center">
                    {data.linkTitle && (data.internalLinkCtaCard || data.externalLinkCtaCard) ?
                            <AnyLink 
                                link={data.internalLinkCtaCard && data.internalLinkCtaCard.slug || data.externalLinkCtaCard} 
                                internal={data.internalLinkCtaCard && data.internalLinkCtaCard.slug}
                                title={data.linkTitle} 
                                button
                                light={ true }
                            />
                        : null }
                    </div>
                </div>
            </div>
        </Section>
    )
}

export default CtaCard