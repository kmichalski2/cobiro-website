/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */
import React from "react";

export const onRenderBody = ({ setPostBodyComponents }) => {
        setPostBodyComponents([
            <script
                src="https://cdn.polyfill.io/v3/polyfill.min.js"
            />
        ])
    }
