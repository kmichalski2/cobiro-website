import React from 'react'

import ScoreStyles from './Score.module.scss'

const Score = ({imgSrc, imgHalfSrc, score, total}) => {

    if(!imgHalfSrc) {
        imgHalfSrc = imgSrc
    }

    let lastStar
    const scoreDecimal = ((score * 10) % 10) / 10

    if(scoreDecimal > 0) {
        if (scoreDecimal * 10 >= 3 && scoreDecimal * 10 <= 7) {
            lastStar = {opacity: 1, src: imgHalfSrc}
        } else if(scoreDecimal * 10 < 3) {
            lastStar = {opacity: 0.5, src: imgSrc}
        } else {
            lastStar = {opacity: 1, src: imgSrc}
        }
    }

    const imageStars = []

    for( let i = 0; i < total; i++){

        // if the index is smaller than the score excluding decimals
        if (i < score - (score % 1)) {
            imageStars.push({opacity: 1, src: imgSrc})

        // else if the score has decimals
        } else if(scoreDecimal > 0 && i === score - scoreDecimal) {
            imageStars.push(lastStar)
        } else {
            imageStars.push({opacity: 0.5, src: imgSrc})
        }
    }

    return (
        <div className={ScoreStyles.scoreWrapper}>
        {imageStars.map((star, i) => 
            <img key={i} src={star.src} style={{opacity: star.opacity}}/>
        )}
        </div>
    )
}

export default Score