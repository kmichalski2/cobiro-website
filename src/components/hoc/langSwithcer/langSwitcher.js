import React, { useEffect, useState, useContext } from 'react'
import { Link, navigate } from "gatsby"
import browserLang from 'browser-lang';

import {cookieAccepted, cookieConsent} from '../../layout/cookieConsent'
import {CurrentLocaleContext} from '../../layout/layout'
import langStyles from './langSwitcher.module.scss'

const LangSwitcher = ({ locales, currentLocale, redirect }) => {
  const [wrapperXY, setWrapperXY] = useState(null)
  
    let currentLang = React.createRef();
    const chosenLangCookie = 'chosenLang'

    const location = useContext(CurrentLocaleContext).location
    const [search, setSearch] = useState()
    
    useEffect(() => {
        setSearch(location.search)
    }, [location.search])

    
    useEffect(() => {

      if(currentLang && currentLang.current) {
          setWrapperXY({y: currentLang.current.clientHeight + 16 + 2, x: currentLang.current.clientWidth + 24 + 2})
        }

        const getCookie = (cname) => {
          const name = cname + "=";
          const decodedCookie = decodeURIComponent(document.cookie);
          const ca = decodedCookie.split(';');
          for(let i = 0; i <ca.length; i++) {
            const c = ca[i];
            while (c.charAt(0) == ' ') {
              c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
            }
          }
          return "";
        }

        const redirectUser = (path) => {
            navigate(`/${path}`, 
              {
                state: { redirect: false },
              }
            )
        }

        if(redirect !== false && locales) {

          const localesArr = locales.map((l => l.locale))
    
          const myLanguage = browserLang({
            languages: localesArr, 
            fallback: 'en',
          });
          
          const exactMatchLocale = localesArr.some(l => l === browserLang())
          const partialMatchLocale = localesArr.find(l => l.includes(browserLang()))

          const chosenLang = getCookie(chosenLangCookie)
          let lang

          if(chosenLang) {
            lang = chosenLang
          } else {
            lang = (partialMatchLocale && !exactMatchLocale) ? partialMatchLocale : myLanguage
          }
          const currLocalePath = `${lang === 'en' ? '' : (locales && locales.length > 0 && locales.find(l => l.locale === lang) && locales.find(l => l.locale === lang).customLang || lang) || null}/${locales && locales.length > 0 && locales.find(l => l.locale === lang) && locales.find(l => l.locale === lang).value || ''}`


          if(lang !== currentLocale || chosenLang !== currentLocale) {
            redirectUser(currLocalePath + search || '')
          }
        }  
                

    }, [])

    const langSwitcherClickHandler = (e, l) => {
      e.preventDefault()

      const path = `${l.locale === 'en' ? '/' : `/${l.customLang || l.locale}`}/${l.value || ''}${search || ''}`
      if(cookieAccepted(cookieConsent)) {

        // Setting Cookie
        let d = new Date()
        d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000)
        const expires = `expires=${d.toUTCString()}`
        document.cookie = `${chosenLangCookie}=${l.locale};${expires};path=/`
        navigate(path)
      } else {
        navigate(`/${path}`, 
          {
            state: { redirect: false },
          }
        )
      }
    }

    return (
      locales && locales.length > 1 ?
        <div className={[langStyles.wrapper, langStyles.up].join(' ')} style={wrapperXY ? {height: wrapperXY.y + 'px', width: wrapperXY.x + 'px'} : null}>
          <ul className={["list-unstyled", langStyles.otherLangs].join(' ')}>
            {locales.map((l, i) => 
              currentLocale !== l.locale ?<li key={i}>
                
                  <Link 
                    onClick={(e) => langSwitcherClickHandler(e, l)}
                    to={`${l.locale === 'en' ? '' : `/${l.customLang || l.locale}`}/${l.value || ''}${search || ''}`} style={{color: 'white'}}
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