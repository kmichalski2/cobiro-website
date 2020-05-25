import React from 'react'

import Classes from './Section.module.scss'

const Section = ({ left, right, bgColor, noBottomPadding, paddingBottomXsSm, centered, children, textColor, id, addedPadding }) => {
    console.log('ADDED  PADDING: ', addedPadding)
    return (
        <section 
            className={[Classes.section, noBottomPadding ? Classes.noBottomPadding : null, paddingBottomXsSm ? Classes.paddingBottomXsSm : null].join(' ')} 
            style={ bgColor ? { backgroundColor: bgColor } : null }
            id={id}
            >
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