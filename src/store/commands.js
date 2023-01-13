import {calculate} from './calculate'
import { initialState } from './rootReducer';

export function addCommand(firstValue, secondValue) {
    return firstValue + secondValue;
}

export function multiplyCommand(firstValue, secondValue) {
    return firstValue * secondValue;
}

export function subCommand(firstValue, secondValue) {
    return firstValue - secondValue;
}

export function divideCommand(firstValue, secondValue) {
    if(secondValue === 0) throw Error('divide by zero');

    return firstValue / secondValue;
}

export function factorialCommand(value) {
    let newValue = 1;
    console.log(value)
    for(let i = 2; i <= value; i++) {
        newValue *= i;
    }

    return newValue;
}

export function addDigit(state, newDigit) {

    const newCurrentValue = state.currentValue + newDigit;

    const newValue = !state.values[0] ? newCurrentValue
    : state.values[0] + state.operation + newCurrentValue

    return {...state, value: newValue, currentValue: newCurrentValue}
}


export function addDegree(state, newDigit) {
    if(state.currentValue === '') return {...state};
    return addDigit(state, newDigit);
}

export function addSqrt(state, newDigit) {
    if(state.currentValue === '') return {...state};
    return addDigit(state, newDigit);
}


export function clearAllAndAddDigit(state, newDigit) {
    const newState = {...initialState};
    return addDigit(newState, newDigit);
}


export function addOperation(state, payload) {
    let newValue = state.value + payload;

    if(newValue.includes('(') && !newValue.includes(')')){
        newValue = state.value + ')' + payload;
    }

    const newCurrentValue = calcDegree(state.currentValue);

    return {...state, 
        value: newValue,
        currentValue: '', 
        operation: payload,
        secondValue_tmp: null, 
        values: state.currentValue ? [...state.values, newCurrentValue]
        : [...state.values]
    };
}


export function addOperationAndCalc(state, payload) {
    console.log(state)
    const newCurrentValue = calcDegree(state.currentValue);
    const newValues = [...state.values];

    newValues[newValues.length - 1] = newCurrentValue;

    const newState = calculate({...state, values: [...newValues]});

    return {...newState, value: newState.value + payload, operation: payload}
}


export function calcDegree(value) {
    if(!value.includes('^')) return value;

    let number = parseFloat(value.split('^')[0]);
    const degree = value.split('^')[1].split('/');
    if(value.includes('(') && !value.includes(')')){
        degree[1] = (degree[1] ? degree[1] : '1') + ')';
    }

    const degreeDecimal = !value.includes('(') ? parseFloat(degree[0])
    : parseInt(degree[0].slice(1)) / parseFloat(degree[1].slice(0, degree[1].length - 1));

    number = number ** degreeDecimal;
    return `${number}`;
}


export function undoOperation(state) {
    const newHistory = [...state.history];
    const prevState = newHistory.pop();
    const newValues = [...prevState.values];
    newValues.pop();
    return {...prevState, values: [...newValues], history: newHistory};
}


export function changeSign(state) {
    const newCurrentValue = state.currentValue * (-1);
    const newValues = [...state.values];
    newValues.pop();

}


export function divideOneByX(state) {
    if(state.value === '0') return {...state}

    let valueToDivideBy = 
    parseFloat(state.currentValue != '' ? state.currentValue
    : state.values[0]);

    const value = divideCommand(1, valueToDivideBy);
    const newCurrentValue = state.currentValue.includes('^') ? 
    state.currentValue + value
    : value;
    const valueToShow = `1/${valueToDivideBy}`;
    let newValue = state.currentValue.includes('^') ? ''
    : ''

    return {
        ...state,
        currentValue: `${newCurrentValue}`,
        value: newValue,
    }
}


export function factorial(state) {

    let valueToFactorial = 
    parseFloat(state.currentValue != '' ? state.currentValue
    : state.values[0]);

    const factorial = factorialCommand(valueToFactorial)
    const newCurrentValue = state.currentValue.includes('^') ? 
    state.currentValue + factorial
    : factorial;
    const valueToShow = `${newCurrentValue}`;
    const newValue = state.value != '0' ? !state.value.includes('^')
    ? state.operation === null ? valueToShow
    : valueToShow
    : valueToShow
    : state.value

    return {
        ...state,
        currentValue: `${newCurrentValue}`,
        value: newValue,
    }
}