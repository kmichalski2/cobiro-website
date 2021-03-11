import React from "react"
import * as Classes from "./video.module.scss"

import splash from "../../../images/video-splash-left.png"

const Video = ({ data }) => (
  <section className={[data.backgroundColor ? "bg-sway" : null, "section relative"].join(' ')}>
    <div className={data.backgroundColor ? "bg-sway-inner" : null}>
    <div className="container">
      <div className="row center-xs">
        <div className="col col-xs-12">
          <div className="embed-responsive">
            <iframe
              className={Classes.video}
              src={data.videoEmbedUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              title="Embedded video"
              width="500"
              height="281"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowFullScreen={true}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
    </div>
    <img src={splash} className={Classes.splash} alt="splash" />
  </section>
)

export default Video
