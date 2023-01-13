import React, { useState } from 'react'

export default function Select({values, operation, handleClick}) {

    function handleChange(value){
        let newValue = '';
        if(operation === 'X_POW_Y') {
            newValue = sendDegree(value);
        }
        if(operation === 'X_SQRT_Y') {
            newValue = sendSqrt(value);
        }
        handleClick(operation, newValue)
    }

    function sendDegree(value) {
        const degree = value.split('^')[1]
        const newValue = '^' + (degree === 'y' ? '' : degree);
        return newValue;
    }

    function sendSqrt(value) {
        switch(value) {
            case '√x':
                return '^(1/2)';
            case '∛x':
                return '^(1/3)';
            case 'y√x':
                return '^(1/';
            default:
                return '^1';
        }
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
