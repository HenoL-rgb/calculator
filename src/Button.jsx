import React from 'react'
import classes from './styles/buttons.module.scss'


export default function Button({value, operation, handleClick, bgColor, fontColor}) {
   
    return (
        <button style={{background: bgColor, color: fontColor}} onClick={() => handleClick(operation, value)}>{value}</button>
    )
}
