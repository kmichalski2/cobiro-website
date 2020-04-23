import React from 'react'
import Classes from './contactPerson.module.scss'
import Section from '../../UiElements/Section/Section'
import ImageAll from '../../UiElements/ImageAll/ImageAll'

const PersonContact = ({ data }) => {

    console.log(data)

    const bgColor = data.bgColor ? data.bgColor.hex : null
    const textColor = data.textColor === 'light' ? "text-white" : "text-black"
    const title = data.sectionTitle
    const email = data.personEmail
    const personImage = data.personImage
    const personName = data.personName
    const personWorkTitle = data.personWorkTitle
    
    return (
        <Section
            bgColor={bgColor}
        >
            <div className="container text-black">
                <div className="row center-sm">
                    <div className="col col-sm-10 col-md-10 col-lg-8">
                        <h2 className={["text-center space", textColor].join(' ')}>{title}</h2>
                        <div className={["card card-square flex center", Classes.contactCard].join(' ')}>
                            <div className={["col-xs-12 col-md-6 center"].join(' ')}>
                                <div className={[Classes.icon].join(' ')}>
                                    <ImageAll image={personImage} alt={personName}/>
                                </div>
                                <div className={Classes.personText}>
                                    <p className={["text-bold text-left", Classes.personText].join(' ')}>{personName}</p>
                                    <p className={["text-left", Classes.personWorkTitle].join(' ')}>{personWorkTitle}</p>
                                </div>
                            </div>
                            <div className="col-xs-12 col-md-6 center">
                                <a className={["btn", Classes.contactButton].join(' ')} href={`mailto:${email}`}>Contact</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </Section>    
    )
}

export default PersonContact
