import React, { useEffect, useState } from 'react'
import { Link } from "gatsby"

import langStyles from './langSwitcher.module.scss'

const LangSwitcher = ({ locales, currentLocale }) => {
    const [wrapperXY, setWrapperXY] = useState(null)
const localesLong = {
    en: "English",
    es: "Spanish",
    fr: "French",
    ge: "German",
    it: "Italian"
}

// const locales = [
//     {locale: "en", value: "/fd"},
//     {locale: "es", value: "/fd"},
//     {locale: "fr", value: "/fd"},
//     {locale: "ge", value: "/fd"},
// ]

    let currentLang = React.createRef();

    useEffect(() => {
        
        setWrapperXY({y: currentLang.current.clientHeight, x: currentLang.current.clientWidth})
    }, [])

    console.log(currentLang.current)

    return (
        locales && locales.length > 1 ?
            <div className={[langStyles.wrapper, langStyles.up].join(' ')} style={wrapperXY ? {height: wrapperXY.y + 'px', width: wrapperXY.x + 'px'} : null}>
              
                <ul className={["list-unstyled", langStyles.otherLangs].join(' ')}>
                  {locales.map((l, i) => 
                    currentLocale !== l.locale ?<li key={i}>
                      
                        <Link to={`${l.locale === 'en' ? '/' : `/${l.locale}`}/${l.value}`} style={{color: 'white'}}>
                          {localesLong[l.locale]}
                        </Link>
                      
                    </li>
                    : null
                  )}
                  <li ref={currentLang} className={[langStyles.currLang, "no-mb text-small"].join(' ')}>{localesLong[currentLocale]}</li>
                </ul>
                {/* <p className={[langStyles.currLang, "no-mb text-small"].join(' ')}>{currentLocaleFull}</p> */}
            </div>
          : null
    )
}

export default LangSwitcher