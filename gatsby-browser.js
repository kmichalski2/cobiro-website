import {globalHistory} from '@reach/router';
import React from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

export const wrapRootElement = ({ element }) => {
  return (
      <GoogleReCaptchaProvider 
        reCaptchaKey="6LeS9RUUAAAAAI8WXv5GIxBG0EAxWOC-x_7LaUTN">
          {element}
      </GoogleReCaptchaProvider>
  )
}

export const onInitialClientRender = () => {
  /**
   * This is a workaround for a bug in Gatsby
   *
   * See https://github.com/gatsbyjs/gatsby/issues/8357 for more details
   */
  globalHistory._onTransitionComplete();
}

