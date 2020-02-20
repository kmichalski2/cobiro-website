// import React, { useState, useEffect } from "react"
// import { changeLocale, useIntl } from 'gatsby-plugin-intl'

// import langStyles from './langSwitcher.module.scss'

// const LangSwitcher = ({ direction, styling }) => {
//     const langs = [
//         {lang: 'da', label: 'DK'},
//         {lang: 'nb', label: 'NO'},
//         {lang: 'en', label: 'UK'}
//     ]
//     const currentLang = useIntl().locale
//     const [currentLangLabel, setCurrentLangLabel] = useState('')

//     useEffect(() => {
//         setCurrentLangLabel(currentLang === 'da' ? 'DK' : currentLang === 'nb' ? 'NO' : currentLang === 'en' ? 'UK' : '')
//     })

//     const langSwitchHandler = (lang) => {
//         changeLocale(lang, null)
//     }

//     return (
//         <>
//         {currentLang ? 
//         <div className={[langStyles.wrapper, direction === 'up' ? langStyles.up : direction === 'down' ? langStyles.down : null].join(' ')} style={styling}>
//             <p className={[langStyles.currLang, "text-bold no-mb text-small"].join(' ')}>{ currentLangLabel }</p>
//             <ul className={["list-unstyled", langStyles.otherLangs].join(' ')}>
//                 {langs.map((l, i) => currentLang !== l.lang ? <li key={i} onClick={() => langSwitchHandler(l.lang)}>{ l.label }</li> : null )}
//             </ul>
//         </div>
//         : null }
//         </>
//     )
// }

// export default LangSwitcher
