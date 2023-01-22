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
  clear: "CLEAR_CURRENT",
  undo: "UNDO",
  xPowY: "X_POW_Y",
  xSqrtY: "X_SQRT_Y",
  tenPowX: "TEN_POW_X",
  factorial: "FACTORIAL_VALUE",
  memClear: "MEMORY_CLEAR",
  memPlus: "MEMORY_PLUS",
  memMinus: "MEMORY_MINUS",
  memRestore: "MEMORY_RESTORE",
};

export default function Buttons({handleClick, topButtonsColor, color, sideButtonsColor, numButtonsColor}) {

  return (
    <div className={classes.container}>
        <div className={classes.topButtons}>
          <Button bgColor={topButtonsColor} fontColor={color} value={'U'} operation={operations.undo} handleClick={handleClick}/>
          <Button bgColor={topButtonsColor} fontColor={color} value={'MC'} operation={operations.memClear} handleClick={handleClick}/>
          <Button bgColor={topButtonsColor} fontColor={color} value={'M+'} operation={operations.memPlus} handleClick={handleClick}/>
          <Button bgColor={topButtonsColor} fontColor={color} value={'M-'} operation={operations.memMinus} handleClick={handleClick}/>
          <Button bgColor={topButtonsColor} fontColor={color} value={'MR'} operation={operations.memRestore} handleClick={handleClick}/>
          <Button bgColor={topButtonsColor} fontColor={color} value={'10^x'} operation={operations.tenPowX} handleClick={handleClick}/>
          <Button bgColor={topButtonsColor} fontColor={color} value={'AC'} operation={operations.clearAll} handleClick={handleClick}/>
          <Button bgColor={topButtonsColor} fontColor={color} value={'C'} operation={operations.clear} handleClick={handleClick}/>
          <Button bgColor={topButtonsColor} fontColor={color} value={'%'} operation={operations.percent} handleClick={handleClick}/>
          <Button bgColor={topButtonsColor} fontColor={color} value={'/'} operation={operations.addOperation} handleClick={handleClick}/>
        </div>
        <div className={classes.sideColumn}>
          <Select bgColor={sideButtonsColor} fontColor={color} values={['x^2', 'x^3', 'x^y']} operation={operations.addOperation} handleClick={handleClick}/>
          <Select bgColor={sideButtonsColor} fontColor={color} values={['√x', '∛x', `y√x`]} operation={operations.addOperation} handleClick={handleClick}/>

          <Button bgColor={sideButtonsColor} fontColor={color} value={'x!'} operation={operations.factorial} handleClick={handleClick}/>
          <Button bgColor={sideButtonsColor} fontColor={color} value={'1/x'} operation={operations.oneDivideX} handleClick={handleClick}/>
        </div>
        <div className={classes.numbers}>
          {numbers.map(item => 
          <Button bgColor={numButtonsColor} fontColor={color} key={item} value={`${item}`} operation={operations.addDigit} 
          handleClick={handleClick}/>)}
          <Button bgColor={numButtonsColor} fontColor={color} value={'+/-'} operation={operations.changeSign} handleClick={handleClick}/>
          <Button bgColor={numButtonsColor} fontColor={color} value={'.'} operation={operations.addDot} handleClick={handleClick}/>
        </div>

        <div className={classes.sideColumn}>
          <Button bgColor={sideButtonsColor} fontColor={color} value={'*'} operation={operations.addOperation} handleClick={handleClick}/>
          <Button bgColor={sideButtonsColor} fontColor={color} value={'-'} operation={operations.addOperation} handleClick={handleClick}/>
          <Button bgColor={sideButtonsColor} fontColor={color} value={'+'} operation={operations.addOperation} handleClick={handleClick}/>
          <Button bgColor={sideButtonsColor} fontColor={color} value={'='} operation={operations.calculate} handleClick={handleClick}/>
        </div>
    </div>
  )
}
