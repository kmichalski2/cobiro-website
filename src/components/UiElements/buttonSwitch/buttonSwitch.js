import React, { useState } from 'react'

import * as Classes from './buttonSwitch.module.scss'

const ButtonSwitch = ({buttons, xsColumn, inverted}) => {

    const [activeBtn, setActiveBtn] = useState(0)

    const switchClickHandler = (i) => {
        buttons[i].clickHandler()
        setActiveBtn(i)
    }
    
    return (
    <div className={[Classes.buttonSwitch, xsColumn ? Classes.xsColumn : null, inverted ? Classes.inverted : null].join(' ')}>
        {buttons.map((button, i) => 
            <button key={i} className={['btn btn-white', Classes.button, !button.active ? Classes.inactive : null].join(' ')} onClick={() => switchClickHandler(i)}>
                {button.title}{button.extraText && <span className={Classes.extraText}>{button.extraText}</span>}
            </button>
        )}
    </div>
)}

export default ButtonSwitch