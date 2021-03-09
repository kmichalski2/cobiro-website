import React from 'react'

const VideoEmbed = ({embedCode, autoplay, classes}) => (
    <div className={["embed-responsive", classes].join(' ')}>
        <iframe src={`${embedCode}${autoplay ? '/?rel=0&autoplay=1&modestbranding=1' : ''}`} width="500" height="281" frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen></iframe>
    </div>
)

export default VideoEmbed