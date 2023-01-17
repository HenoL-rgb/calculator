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
    if(state.currentValue === '0' && newDigit === '0') return {...state}; 
    const newCurrentValue = state.currentValue + newDigit;

    const newValue = !state.values[0] ? newCurrentValue
    : !state.value.includes('(') ? state.values[0] + state.operation +  newCurrentValue
    : state.values[0] + state.operation +  newCurrentValue + ')'
  

    return {...state, value: newValue, currentValue: newCurrentValue}
}


export function addDegree(state, payload) {
    if(state.currentValue === '') return {...state};
    const degree = payload.split('^')[1];

    let newValue = state.value + payload;

    return {...state, 
        value: newValue,
        currentValue: payload.split('^')[1], 
        operation: '^',
        secondValue_tmp: null, 
        values: !state.values[0] ? [...state.values, '0', state.currentValue]
        : [...state.values, state.currentValue]
    };
}

export function clearAllAndAddDigit(state, newDigit) {
    const newState = {...initialState};
    return addDigit(newState, newDigit);
}


export function addOperation(state, payload) {
    let newValue = state.value + payload;
    const newOperation = !payload.includes('^') ? payload
    : '^';
    const newCurrentValue = !payload.includes('^') ? ''
    : payload.split('^')[1]
    
    return {...state, 
        value: newValue,
        currentValue: newCurrentValue, 
        operation: newOperation,
        secondValue_tmp: null, 
        values: state.currentValue ?     
        [...state.values,  state.currentValue]
        : !state.values[0] ? [...state.values, '0']
        : [...state.values]
    };
}


export function addOperationAndCalc(state, payload) {
    const newState = calculate({...state, values: [...state.values, state.currentValue]});
    
    return addOperation(newState, payload)
}


export function undoOperation(state) {
    if(!state.history.length) return {...state}
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
    const newState = calculate({...state, values: [...state.values, state.currentValue]});

    return calculate({...newState, values: ['1', ...newState.values], operation: '/'})

}


export function factorial(state, payload) {

    const newState = calculate({...state, values: [...state.values, state.currentValue]});

    return calculate({...newState, operation: payload})
}


export function tenPowX(state, payload) {

    const newState = calculate({...state, values: [...state.values, state.currentValue]});
    return calculate({...newState, operation: payload})
}