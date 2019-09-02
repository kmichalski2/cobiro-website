import React from "react"

const Video = ({ data }) => (
    <section className="section">
        <div className="container">
            <div className="row center-xs">
                <div className="col col-xs-12 col-md-8 text-editor-wrapper">
                    <div className="embed-responsive">
                        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" title="Embedded video" width="500" height="281" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen={true}></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>

)

export default Video
