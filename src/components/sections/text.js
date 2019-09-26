import React from "react"

  const Text = ({ data }) => {

  const bgImageUrl = data.backgroundImage ? `url(${data.backgroundImage.url})` : null;
  
  return (
  <section className={['section', data.backgroundImage ? 'bg-splash' : null ].join(' ')} style={{backgroundImage: bgImageUrl}} >
    <div className="container">
      <div className="row center-xs">
        <div className="col col-xs-12 col-md-8 text-editor-wrapper">
          <h2>{data.title}</h2>
          <p>{data.text}</p>
        </div>
      </div>
    </div>
  </section>
)}

export default Text
