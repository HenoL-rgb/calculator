import React from 'react'
import classes from './styles/output.module.scss'

export default function Output({value, color}) {
  
  return (
    <div className={classes.container}>
        <span>{value}</span>
    </div>
  )
}
