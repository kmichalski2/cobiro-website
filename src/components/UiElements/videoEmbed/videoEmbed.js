import React from 'react'

const VideoEmbed = ({embedCode, autoplay}) => (
    <div className="embed-responsive">
        <iframe src={`${embedCode}${autoplay ? '/?autoplay=1' : ''}`} width="500" height="281" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
    </div>
)

export default VideoEmbed