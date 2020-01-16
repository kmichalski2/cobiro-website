import React from 'react'

const Score = ({}) => {

    const imgSrc = ""
    const score = 4.9
    const total = 5

    const imageScore = []

    for( let i = 0; i > total; i++){
        imageScore.push(i < score)
    }

    return (
        imageScore.map(score, i) => {
            <img key={i} src={imgSrc} style={{opacity: i < score ? 1 : 0.5}}/>
        }
    )
}

export default Score