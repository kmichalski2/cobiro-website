import React from 'react'

import AdStyles from './Ad.module.scss'

import actionsImg from './actions.png'
import bookmarkImg from './bookmark.png'

const Ad = ({url, ads, type, first}) => {

    return (
        <div className={["card card-visible text-left", AdStyles.card].join(' ')}>
            <div className="flex start-xs middle-xs space-xs-up">
                <div>
                    <img src="" style={{width: '3rem', height: '3rem', margin: 0}}/>
                </div>
                <div style={{marginLeft: '1rem'}}>
                    <p className="text-bold text-black no-mb">{url}</p>
                    <p className={["no-mb", AdStyles.small].join(' ')}>sponsored</p>
                </div>
            </div>
            
            {type === 'facebook' ? <p className={AdStyles.small}>{ads ? ads.description : null}</p> : null }
            <img className={AdStyles.image} src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='804' height='419' viewBox='0 0 804 419'%3E%3Cg transform='translate(-129 -165)'%3E%3Crect width='804' height='419' transform='translate(129 165)' fill='%23f0f0f0'/%3E%3Cpath d='M2638.954,463.3l41.127-68.3,29.321,38.538,66.412-84.3L2850.125,463.3Z' transform='translate(-2213.223 -7.987)' fill='%23bfbfbf'/%3E%3Cellipse cx='20.5' cy='21' rx='20.5' ry='21' transform='translate(458 320)' fill='%23bfbfbf'/%3E%3Cg transform='translate(408 283)' fill='none' stroke='%23bfbfbf' stroke-width='4'%3E%3Crect width='247' height='184' rx='12' stroke='none'/%3E%3Crect x='2' y='2' width='243' height='180' rx='10' fill='none'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"/>

            { type === 'facebook' ?
            <>
            <div className={AdStyles.fbCta}>
                <div>
                    <p className={["no-mb uppercase", AdStyles.small].join(' ')}>WWW.{url}</p>
                    <p className={["no-mb text-black text-bold", AdStyles.small].join(' ')}>{url}</p>
                    <p className={["no-mb", AdStyles.small].join(' ')}>{ads ? ads.headline_2 : null}</p>
                </div>
                <div>
                    <a href={`https://${url}`} className={[AdStyles.fbLink, AdStyles.small].join(' ')} target="_blank">SEE MORE</a>
                </div>
            </div>
            <hr className={AdStyles.hr}/>
            <div className="flex between-xs">
                <p className={["text-black text-bold no-mb", AdStyles.small].join(' ')}>Like</p>
                <p className={["text-black text-bold no-mb", AdStyles.small].join(' ')}>Comment</p>
                <p className={["text-black text-bold no-mb", AdStyles.small].join(' ')}>Share</p>
            </div>
            </>
            : null }

            { type === 'instagram' ?
            <>
            <a href={`https://${url}`} className={AdStyles.instaCta} target="_blank">
                Visit website
            </a>
            <div className={["flex between-xs", AdStyles.instaActions, first ? AdStyles.first : AdStyles.second].join(' ')} >
                <img src={actionsImg} />
                <img src={bookmarkImg} />
            </div>
            <p className={AdStyles.small}><span className="text-bold">{url}</span> {ads ? ads.description : null}</p>
            </>
            : null }
        </div>
    )
}

export default Ad