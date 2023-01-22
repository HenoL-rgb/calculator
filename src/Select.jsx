import React, { useState } from 'react'

export default function Select({values, operation, handleClick, fontColor, bgColor}) {

    function handleChange(value){
        const newValue = sendDegree(value);
   
        handleClick(operation, newValue)
    }

    function sendDegree(value) {
        switch(value) {
            case '√x':
                return '^(1/2)';
            case '∛x':
                return '^(1/3)';
            case 'y√x':
                return '^(1/';
            default:
                const degree = value.split('^')[1]
                const newValue = '^' + (degree === 'y' ? '' : degree);
                return newValue;
        }
        
    }

    function sendSqrt(value) {
        
    }

    return (
        <div>
            <select style={{background: bgColor, color: fontColor}} value={values.at(-1)} onChange={(e) => handleChange(e.target.value)}>
                <option selected hidden>{values.at(-1)}</option>
                {values.map(item =>
                <option key={item} value={`${item}`}>{item}</option>
                )}
            </select>
        </div>
    )
}
