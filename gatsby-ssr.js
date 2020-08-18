/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

// import React from "react";

// export function onRenderBody(
//   { setHeadComponents, setPreBodyComponents }
// ) {
//  setHeadComponents([
//     <script src="https://apis.google.com/js/platform.js" async defer></script>
//   ]);
//   setPreBodyComponents([
//     <script src="https://apis.google.com/js/platform.js" async defer></script>
// ]);
// }

import React from "react";


export const onRenderBody = ({ setPostBodyComponents }) => {
        setPostBodyComponents([
            <script
                src="https://cdn.polyfill.io/v3/polyfill.min.js"
            />
        ])
    }