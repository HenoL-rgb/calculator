import React from 'react'
import classes from './styles/buttons.module.scss'


export default function Button({value, operation, handleClick}) {
   
    return (
        <button onClick={() => handleClick(operation, value)}>{value}</button>
    )
}
