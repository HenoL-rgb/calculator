import {calculate} from './calculate'
import { initialState } from './rootReducer';

export function addDigit(state, newDigit) {
    const newValue = newDigit === '.' ? state.value + newDigit
    : state.value === '0' ? newDigit : state.value + newDigit

    const newCurrentValue = state.currentValue + newDigit;

    return {...state, value: newValue, currentValue: newCurrentValue}
}


export function addDegree(state, newDigit) {
    if(state.currentValue === '') return {...state};
    return addDigit(state, newDigit);
}

export function addSqrt(state, newDigit) {
    if(state.currentValue === '') return {...state};
    return addDigit(state, `1/${newDigit}`);
}


export function clearAllAndAddDigit(state, newDigit) {
    const newState = {...initialState};
    return addDigit(newState, newDigit);
}


export function addOperation(state, payload) {
    const newValue = (state.value === '0') && (payload === '-') ? payload
    : state.value + payload;

    const newCurrentValue = calcDegree(state.currentValue);

    return {...state, 
        value: newValue, 
        currentValue: '', 
        operation: payload, 
        values: state.currentValue ? [...state.values, newCurrentValue]
        : [...state.values]
    };
}


export function addOperationAndCalc(state, payload) {
    const newCurrentValue = calcDegree(state.currentValue);
    const newValues = state.values;
    newValues[newValues.length - 1] = newCurrentValue;

    const newState = calculate({...state, values: [...newValues]});

    return {...newState, value: newState.value + payload, operation: payload}
}


export function calcDegree(value) {
        if(!value.includes('^')) return value;

        let number = parseFloat(value.split('^')[0]);
        const degree = parseFloat(value.split('^')[1]);

        number = number ** degree;
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