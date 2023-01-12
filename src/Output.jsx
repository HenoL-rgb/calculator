import React from 'react'
import classes from './styles/output.module.scss'

export default function Output({value}) {
  return (
    <div className={classes.container}>
        {value}
    </div>
  )
}
