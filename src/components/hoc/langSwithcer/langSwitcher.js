import React, { useEffect, useState } from 'react'
import { Link, navigate } from "gatsby"
import browserLang from 'browser-lang';

import langStyles from './langSwitcher.module.scss'

const LangSwitcher = ({ locales, currentLocale, redirect }) => {
  const [wrapperXY, setWrapperXY] = useState(null)


    let currentLang = React.createRef();

    useEffect(() => {

      if(currentLang && currentLang.current) {
          setWrapperXY({y: currentLang.current.clientHeight + 16 + 2, x: currentLang.current.clientWidth + 24 + 2})
        }

        // const localesArr = locales.map((l => l.locale))
    
        // const myLanguage = browserLang({
        //   languages: localesArr, 
        //   fallback: 'en',
        // });
        
        // console.log('LANG: ', myLanguage, currentLocale, locales)

        // const currLocalePath = `${myLanguage === 'en' ? '' : myLanguage || null}/${locales.filter(l => l.locale === myLanguage)[0].value || ''}`

        // if(myLanguage !== currentLocale && redirect !== false) {
        //   console.log('navigating to ', currLocalePath)
        //   navigate(`/${currLocalePath}`, 
        //     {
        //       state: { redirect: false },
        //     }
        //   )
        // }

    }, [])

    return (
        locales && locales.length > 1 ?
            <div className={[langStyles.wrapper, langStyles.up].join(' ')} style={wrapperXY ? {height: wrapperXY.y + 'px', width: wrapperXY.x + 'px'} : null}>
              
                <ul className={["list-unstyled", langStyles.otherLangs].join(' ')}>
                  {locales.map((l, i) => 
                    currentLocale !== l.locale ?<li key={i}>
                      
                        <Link 
                          to={`${l.locale === 'en' ? '/' : `/${l.locale}`}/${l.value || ''}`} style={{color: 'white'}}
                          state={{ redirect: false }}>
                            {l.title}
                        </Link>
                      
                    </li>
                    : null
                  )}
                  <li ref={currentLang} className={[langStyles.currLang, "no-mb text-small"].join(' ')}>{locales.find(l => l.locale === currentLocale).title}</li>
                </ul>
            </div>
          : null
    )
}

export default LangSwitcher