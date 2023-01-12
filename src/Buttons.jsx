import React from 'react';
import Button from './Button';
import Select from './Select';
import classes from './styles/buttons.module.scss'

const numbers = [1,2,3,4,5,6,7,8,9,0];

export const operations = {
  addDigit: "ADD_DIGIT",
  addDot: "ADD_DOT",
  addOperation: "ADD_OPERATION",
  plus: "ADD_VALUE",
  minus: "SUB_VALUE",
  multiply: "MULTIPLY_VALUE",
  divide: "DIVIDE_VALUE",
  oneDivideX: "DIVIDE_ONE_BY_VALUE",
  calculate: "CALC_VALUE",
  changeSign: "CHANGE_SIGN",
  percent: "PERCENT_VALUE",
  clearAll: "CLEAR_ALL",
  backspace: "CLEAR_LAST",
  undo: "UNDO",
  xPowY: "X_POW_Y",
  xSqrtY: "X_SQRT_Y",
  factorial: "FACTORIAL_VALUE",
  memClear: "MEMORY_CLEAR",
  memPlus: "MEMORY_PLUS",
  memMinus: "MEMORY_MINUS",
  memRestore: "MEMORY_RESTORE",
};

export default function Buttons({handleClick}) {

  return (
    <div className={classes.container}>
        <div className={classes.topButtons}>
          <Button value={'U'} operation={operations.undo} handleClick={handleClick}/>
          <Button value={'MC'} operation={operations.memClear} handleClick={handleClick}/>
          <Button value={'M+'} operation={operations.memPlus} handleClick={handleClick}/>
          <Button value={'M-'} operation={operations.memMinus} handleClick={handleClick}/>
          <Button value={'MR'} operation={operations.memRestore} handleClick={handleClick}/>
          <Button value={'+/-'} operation={operations.changeSign} handleClick={handleClick}/>
          <Button value={'AC'} operation={operations.clearAll} handleClick={handleClick}/>
          <Button value={'%'} operation={operations.percent} handleClick={handleClick}/>
          <Button value={'<-'} operation={operations.backspace} handleClick={handleClick}/>
          <Button value={'/'} operation={operations.addOperation} handleClick={handleClick}/>
        </div>
        <div className={classes.sideColumn}>
          <Select values={['x^2', 'x^3', 'x^y']} operation={operations.xPowY} handleClick={handleClick}/>
          <Select values={['√x', '∛x', `y√x`]} operation={operations.xSqrtY} handleClick={handleClick}/>

          <Button value={'x!'} operation={operations.factorial} handleClick={handleClick}/>
          <Button value={'1/x'} operation={operations.oneDivideX} handleClick={handleClick}/>
        </div>
        <div className={classes.numbers}>
          {numbers.map(item => 
          <Button key={item} value={`${item}`} operation={operations.addDigit} 
          handleClick={handleClick}/>)}
          <Button value={'.'} operation={operations.addDot} handleClick={handleClick}/>
        </div>

        <div className={classes.sideColumn}>
          <Button value={'*'} operation={operations.addOperation} handleClick={handleClick}/>
          <Button value={'-'} operation={operations.addOperation} handleClick={handleClick}/>
          <Button value={'+'} operation={operations.addOperation} handleClick={handleClick}/>
          <Button value={'='} operation={operations.calculate} handleClick={handleClick}/>
        </div>
    </div>
  )
}
