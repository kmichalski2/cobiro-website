import React from 'react'

const HtmlText = ({ RawHtml, classes }) => {

    const createMarkup = (text)  => {
        return {__html: text}
      }

    return (
        RawHtml ?
            <div dangerouslySetInnerHTML={createMarkup( RawHtml )} className={classes}>
            </div>
        : null
        
    )
}

export default HtmlText