import React from "react"

import TextStyles from "./text.module.scss"

  const Text = ({ data }) => {

  const bgImageUrl = data.backgroundImage ? `url(${data.backgroundImage.url})` : null;
  
  function createMarkup() {
    return {__html: data.text}
  }

  return (
  <section className={['section', data.backgroundImage ? 'bg-splash' : null, data.backgroundColor ? "bg-sway" : null].join(' ')} style={{backgroundImage: bgImageUrl}} >
    <div className={data.backgroundColor ? "bg-sway-inner" : null}>
      <div className="container">
        <div className="row center-xs">
          <div className="col col-xs-12 col-md-8 text-editor-wrapper">
            { data.title ? <h2>{data.title}</h2> : null }
            { data.text ? <p className={TextStyles.text} dangerouslySetInnerHTML={createMarkup()}></p> : null }
          </div>
        </div>
      </div>
    </div>
  </section>
)}

export default Text
