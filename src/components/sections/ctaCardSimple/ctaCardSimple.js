import React from 'react'
import HeaderWText from '../../UiElements/HeaderWText/HeaderWText'
import ImageAll from '../../UiElements/ImageAll/ImageAll'
import Section from '../../UiElements/Section/Section'

import Classes from './ctaCardSimple.module.scss'

const CtaCardSimple = ({data}) => {

    return (
        <Section bgColor={data.sectionBgColor && data.sectionBgColor.hex}>
        <div className="container">
            <div className="row center-xs">
                <div className="col col-xs-12">
                    <div className={["card card-visible text-left", Classes.card].join(' ')} style={data.boxBgColor && data.boxBgColor.hex ? {backgroundColor: data.boxBgColor.hex} : null}>
                        <div className={Classes.backgroundLogoWrapper}>
                            {data.backgroundLogo ?
                            <ImageAll 
                                image={data.backgroundLogo}
                                alt={data.backgroundLogo && data.backgroundLogo.alt || data.title}
                                classes={Classes.backgroundLogo} />
                            : null}
                            {data.backgroundImage ?
                            <ImageAll 
                                image={data.backgroundImage}
                                alt={data.backgroundImage && data.backgroundImage.alt || data.title}
                                classes={Classes.backgroundImage} />
                            : null}
                        </div>
                        <div className={["row", data.imageOverflowing ? "stretch-xs" : "middle-xs"].join(' ')}>
                            <div className="col col-xs-12 col-lg-6">
                            <HeaderWText 
                                classes={Classes.textWrapper}
                                title={data.title}
                                h2
                                light={data.backgroundImage || false}
                                darkButton={true}
                                text={data.text}
                                centered={false}
                                links={[
                                    {
                                        link: data.externalLinkCtaCard || data.internalLinkCtaCard && data.internalLinkCtaCard.slug,
                                        title: data.linkTitle,
                                        external: data.externalLinkCtaCard && true,
                                        internal: !data.externalLinkCtaCard && data.internalLinkCtaCard && (data.internalLinkCtaCard.slug || data.internalLinkCtaCard.slug === null) && true,
                                        button: true,
                                        large: false,
                                      }
                                ]}/>
                            </div>
                            <div className="col col-xs-12 col-lg-6">
                                    {data.ctaImageBackground && ! data.imageOverflowing ?
                                        <ImageAll 
                                            image={data.ctaImageBackground}
                                            alt={data.ctaImageBackground && data.ctaImageBackground.alt || data.title}
                                            classes={[Classes.image, Classes.ctaImageBackground, data.imageOverflowing ? Classes.imageOverflow : null].join(' ')} />
                                    : null }
                                <ImageAll 
                                    image={data.image}
                                    alt={data.image && data.image.alt || data.title}
                                    classes={[Classes.image, data.imageOverflowing ? Classes.imageOverflow : null].join(' ')} />
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        </Section>
    )
}

export default CtaCardSimple