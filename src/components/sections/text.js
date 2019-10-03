import React from "react"

  const Text = ({ data }) => {

  const bgImageUrl = data.backgroundImage ? `url(${data.backgroundImage.url})` : null;
  
  return (
  <section className={['section', data.backgroundImage ? 'bg-splash' : null ].join(' ')} style={{backgroundImage: bgImageUrl}} >
    <div className="container">
      <div className="row center-xs">
        <div className="col col-xs-12 col-md-8 text-editor-wrapper">
          { data.title ? <h2>{data.title}</h2> : null }
          { data.text ? <p>{data.text}</p> : null }
        </div>
      </div>
    </div>
  </section>
)}

export default Text
