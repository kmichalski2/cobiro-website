import React, { useState } from 'react'

import Classes from './switch.module.scss'

const Switch = ({leftEl, rightEl}) => {

    const [active, setActive] = useState('left')

    const onClickHandler = (pos) => {
        setActive(pos)

        if(pos === 'left') {
            leftEl.clickHandler()
        }
        if(pos === 'right') {
            rightEl.clickHandler()
        }

    }


    return (
        <div className={Classes.switchWrapper}>
            <button className="btn-text" onClick={() => onClickHandler('left')}>
                {leftEl.title}{leftEl.extraText && <span className={Classes.extraText}>{leftEl.extraText}</span>}
            </button>
            <div className={[Classes.switch, active === 'left' ? Classes.left : Classes.right].join(' ')}></div>
             <button className="btn-text" onClick={() =>  onClickHandler('right')}>
                {rightEl.title}{rightEl.extraText && <span className={Classes.extraText}>{leftEl.extraText}</span>}
            </button>
        </div>
    )
}

export default Switch