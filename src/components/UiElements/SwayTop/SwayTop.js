import React from 'react'

import * as Classes from './SwayTop.module.scss'

const SwayTop = props => {
    const topColor = props.topColor ? props.topColor.hex : null
    const bottomColor = props.bottomColor ? props.bottomColor.hex : null

    const transparentSways = (
        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" x="0" y="0" viewBox="0 0 1900 288" className={Classes.whiteSways}><g data-name="Lag 2"><g data-name="Lag 1"><path data-name="Path 4909" className="cls-1" d="M0,181.54c230.83,28.07,530,27.7,759.25-1,130.46-16.31,237.69-40.75,371.12-55.86C1383.67,96,1718.66,107.54,1920,151.86l.28,107.42L0,259.19Z" fill="#fff" opacity="0.1"/><path data-name="Path 4978" className="cls-1" d="M0,139.81c230.83,54.1,530,53.4,759.25-1.87C889.71,106.5,996.94,59.41,1130.37,30.28,1383.67-25,1718.66-2.82,1920,82.61l.28,177H0Z" fill="#fff" opacity="0.1"/></g></g></svg>
      )
    
      const whiteSway = (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 150" preserveAspectRatio="xMidYMid slice" x="0" y="0" className={Classes.whiteSways} style={{bottom: '-1px', zIndex: 2}}><path d="M0,72.55c230.83,28.07,530,27.7,759.25-1C889.71,55.23,996.94,30.8,1130.37,15.69,1383.67-13,1718.66-1.45,1920,42.87V150H0Z" fill="#fff"/></svg>
      )

    return (
        <section className={Classes.header} style={{backgroundImage: `linear-gradient(${topColor}, ${bottomColor})`}}>
            <div className={[Classes.header, "section-inner"].join(" ")}>
                {React.cloneElement(props.children, { props })}
            </div>
            { whiteSway }
            { transparentSways }
        </section>
    )
}

export default SwayTop