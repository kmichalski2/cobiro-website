import React from 'react'
import ImageAll from '../ImageAll/ImageAll'

import Classes from './Section.module.scss'

const Section = ({ left, right, bgColor, noBottomPadding, paddingBottomXsSm, centered, children, textColor, id, addedPadding, classes, gradiantBottom, gradiantAtBottom, bottomBgColor, backgroundImage }) => {
    return (
        <section 
            className={[classes ? classes : null, Classes.section, noBottomPadding ? Classes.noBottomPadding : null, paddingBottomXsSm ? Classes.paddingBottomXsSm : null, gradiantBottom ? Classes.gradiantBottom : null, backgroundImage ? Classes.backgroundImageSection : null].join(' ')} 
            style={ bgColor ? { backgroundColor: bgColor } : null }
            id={id}
            >
                { backgroundImage ?
                <ImageAll image={backgroundImage} alt={backgroundImage.alt} backgroundImage classes={Classes.backgroundImage}/>
                : null }

                {gradiantBottom ? 
                    <div className={[Classes.backgroundGradiant, gradiantAtBottom ? Classes.gradiantAtBottom : null].join(' ')}></div>
                : null}
                {bottomBgColor ? 
                    <div className={Classes.bottomBgColor} style={{backgroundColor: bottomBgColor}}></div>
                : null}
                {addedPadding ? <div style={{ height: addedPadding + 'px', width: '100%'}} ></div> : null}

                {children ? 
                    children
                :
                    <div className="container">
                        <div className={["row middle-xs", centered ? "flex-column" : null].join(' ')}>
                            <div className={["col col-xs-12", centered ? "col-sm-8" : "col-lg-6"].join(' ')}>
                                { left }
                            </div>
                            <div className={["col col-xs-12", centered ? "col-sm-8" : "col-lg-6"].join(' ')}>
                                { right }
                            </div>
                        </div>
                    </div>
                }
                
        </section>
    )
}

export default Section