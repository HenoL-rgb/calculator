import React, { useState } from 'react'

export default function Select({values, operation, handleClick}) {

    function handleChange(value){
        const degree = value.split('^')[1]
        const newValue = '^' + (degree === 'y' ? '' : degree);
        handleClick(operation, newValue)
    }

    return (
        <div>
            <select value={values.at(-1)} onChange={(e) => handleChange(e.target.value)}>
                <option selected hidden>{values.at(-1)}</option>
                {values.map(item =>
                <option key={item} value={`${item}`}>{item}</option>
                )}
            </select>
        </div>
    )
}
