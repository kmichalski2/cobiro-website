import React from 'react'
import AnyLink from '../../UiElements/AnyLink/AnyLink'
import HeaderWText from '../../UiElements/HeaderWText/HeaderWText'
import HtmlText from '../../UiElements/HtmlText/HtmlText'
import ImageAll from '../../UiElements/ImageAll/ImageAll'
import Section from '../../UiElements/Section/Section'

import Classes from './imageTextThreeUp.module.scss'

const ImageTextThreeUp = ({data}) => {

    const numbersArray = [1, 2, 3]

    let linkBoxes = false
    
    numbersArray.map(box => {
        if(data[`box${box}InternalLink`] && data[`box${box}InternalLink`].slug || data[`box${box}ExternalLink`]) {
            linkBoxes = true
        }
    })

    const boxes = (
        numbersArray.map((box, i) => {

            const hasContent = data[`box${box}Title`] || data[`box${box}Text`] || data[`box${box}SubTitle`]

            const link = data[`box${box}InternalLink`] && data[`box${box}InternalLink`].slug || data[`box${box}ExternalLink`]

            let element = null

            const content = (
                <>
                { data[`box${box}Title`] ? <h3 className="h1">{data[`box${box}Title`]}</h3> : null }
                <div className={Classes.gradiantBar}></div>
                { data[`box${box}Subtitle`] ? <h3 className="h4">{data[`box${box}Subtitle`]}</h3> : null }
                { data[`box${box}Text`] ? <HtmlText RawHtml={data[`box${box}Text`]} /> : null }
                </>
            )
            
            console.log('external:', data[`box${box}ExternalLink`], 'internal: ', link)

            if(linkBoxes && hasContent && link) {
                element = (
                    <AnyLink link={link} external={data[`box${box}ExternalLink`]} internal={data[`box${box}InternalLink`] && data[`box${box}InternalLink`].slug} classes={Classes.linkBox}>
                        <div className="card card-visible text-left">
                            {content}
                        </div>
                    </AnyLink>
                )
            } else if(linkBoxes && hasContent) {
                element = (
                    <div className="card card-visible text-left">
                        { content }
                    </div>
                )
            } else if(hasContent) {
                element = content
            }

            return (
                <div key={i} className={["col col-xs-12 space-xs space-sm", !linkBoxes ? "col-lg-3 col-md-4" : "col-lg-4"].join(' ')}>
                    {element}
                </div>
            )
        })
    )

    let boxesContent

    if(linkBoxes) {
        boxesContent = (
            boxes
        )
    } else {
        boxesContent = (
            <div className="col col-xs-12">
                <div className={["card card-visible text-left", Classes.singleCard].join(' ')}>
                    <div className="row between-xs">
                        {boxes}
                    </div>
                </div>
            </div>
        )
    }

    

    return ( 
        <Section bgColor={data.bgColor && data.bgColor.hex} classes={Classes.section}>
            <div className="container">
                <div className="row middle-xs space-xs-up">
                    <div className="col col-xs-12 col-lg-6">
                        <div className="space-md space-sm space-xs">
                            <ImageAll 
                                image={data.image}
                                alt={data.image.alt ? data.image.alt : data.title} />
                        </div>
                    </div>
                    <div className="col col-xs-12 col-lg-6">
                            <HeaderWText
                                title={data.title}
                                h2
                                text={data.text}
                            />
                    </div>
                </div>
                <div className="row">
                    {boxesContent}
                </div>
            </div>
        </Section>
    )
}

export default ImageTextThreeUp