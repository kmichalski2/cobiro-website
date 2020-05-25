import React, { useEffect } from 'react'
import HtmlText from '../HtmlText/HtmlText'

import Classes from './notification.module.scss'

const Notification = ({ text, textColor, bgColor, notifyerHeightHandler }) => {
 
    const notifiyerRef = React.createRef()

    useEffect(() => {
        notifyerHeightHandler(notifiyerRef.current && notifiyerRef.current.offsetHeight)
    }, [notifiyerRef])

    return (
        <div className="container" ref={notifiyerRef}>
            <div className="row">
                <div className="col col-xs-12">
                    <div className={Classes.notification} style={bgColor && bgColor.hex ? {backgroundColor: bgColor.hex} : null}>
                        <HtmlText RawHtml={text} classes={[Classes.text, textColor === 'light' ? 'text-white' : null].join(' ')}/>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default Notification