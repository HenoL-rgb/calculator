import React from 'react'
import classes from './styles/buttons.module.scss'


export default function Button({value, operation, handleClick}) {
    if(value == "0") {
        return (
            <button className={classes.zero} onClick={() => handleClick(operation, value)}>{value}</button>
          )
    }

    return (
        <button onClick={() => handleClick(operation, value)}>{value}</button>
    )
}
