import { Link } from "gatsby"
import React, { useEffect, useState } from "react"

const CookieBanner = ({ data }) => {
  const [isCookieAccepted, setIsCookieAccepted] = useState(false)

  useEffect(() => {
    // check if cookie is set
    const cookieAccepted = () => {
      var re = new RegExp("cookieConsent=([^;]+)")
      var value = re.exec(document.cookie)
      return value != null ? unescape(value[1]) : null
    }

    // runs cookieAccepted and removes cookie banner if cookie is set, and if not set adds a cookie banner
    if (cookieAccepted() && isCookieAccepted !== true) {
      setIsCookieAccepted(true)
    }
    if (isCookieAccepted) {
      // Fire Google Tag Manager event
      fireGTM()
    }
  })

  // Fire Google Tag Manager event
  const fireGTM = () => {
    // window.dataLayer.push({'event': 'cookiesAccepted'});
  }

  // Sets cookie onclick and fires GTM
  const setCookie = () => {
    // Setting Cookie
    let d = new Date()
    d.setTime(d.getTime() + 30 * 24 * 60 * 60 * 1000)
    const expires = `expires=${d.toUTCString()}`
    document.cookie = `cookieConsent=${true};${expires};path=/`

    // Remove Cookie Banner
    setIsCookieAccepted(true)
  }

  // Set cookie banner
  let cookieBannerHtml = null

  if (!isCookieAccepted) {
    cookieBannerHtml = (
      <div id="cookie-banner">
        <p className="p-cookie">
          This website uses cookies to ensure you get the best experience on our
          website. <Link to="/privacy-policy">Learn more</Link>
        </p>
        <button className="btn btn-cookies" onClick={setCookie}>
          Got it!
        </button>
      </div>
    )
  }

  return cookieBannerHtml
}

export default CookieBanner
