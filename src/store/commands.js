import { calculate } from './calculate'
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
    if(secondValue === 0) throw new Error('divide by zero');

    return firstValue / secondValue;
}

export function factorialCommand(value) {
    if(value < 0) throw new Error('negative factorial');

    let newValue = 1;
    
    for(let i = 2; i <= value; i++) {
        newValue *= i;
    }

    return newValue;
}

export function addDigit(state, newDigit) {
    if(state.currentValue === '0' && newDigit === '0') return {...state}; 
    const newCurrentValue = (state.currentValue === '' && newDigit === '.') ? '0' + state.currentValue + newDigit
    : state.currentValue + newDigit;

    const newValue = !state.values[0] ? newCurrentValue
    : !state.value.includes('(') ? state.values[0] + state.operation +  newCurrentValue
    : !state.value.includes(')') ? state.values[0] + state.operation +  newCurrentValue + ')'
    : state.value.split(state.operation)[0] + state.operation + newCurrentValue;
  

    return {...state, value: newValue, currentValue: newCurrentValue}
}


export function addDegree(state, payload) {
    if(state.currentValue === '') return {...state};
    const degree = payload.split('^')[1];

    let newValue = `(${state.value + payload})`;

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
    const newState = {...initialState, memory: state.memory};
    return addDigit(newState, newDigit);
}


export function addOperation(state, payload) {
    const currentValue = state.value.at(-1) === '.' ? state.value.split('.')[0]
    : state.value;

    let newValue = !payload.includes('^') ? currentValue + payload
    : `(${currentValue})` + payload;

    const newOperation = !payload.includes('^') ? payload
    : '^';

    const newCurrentValue = !payload.includes('^') ? ''
    : payload.split('^')[1]

    return {...state, 
        value: newValue,
        currentValue: newCurrentValue, 
        operation: newOperation,
        secondValue_tmp: null, 
        values: currentValue ?     
        [...state.values,  currentValue]
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
    if(state.currentValue == '') return {...state}
    const valueToChange = state.currentValue;
    const isSecondValue = state.values[0] ? true : false;
    const changedValue = parseFloat(valueToChange) < 0 ? `${(valueToChange * (-1))}` 
    : `(-${valueToChange})`
    
    const newValue = isSecondValue ? state.value.split(state.operation)[0] + state.operation + changedValue
    : state.operation ? changedValue + state.operation
    : changedValue

    return {
        ...state,
        value: newValue,
        currentValue: `${multiplyCommand(parseFloat(valueToChange), -1)}`
    }

}


export function divideOneByX(state) {
    const newState = calculate({
        ...state, 
        values: [...state.values, state.currentValue]
    });

    return calculate({...newState, values: ['1', ...newState.values], operation: '/'})

}


export function factorial(state, payload) {

    const newState = calculate({
        ...state, 
        values: [...state.values, state.currentValue]
    });

    return calculate({...newState, operation: payload})
}


export function tenPowX(state, payload) {

    const newState = calculate({
        ...state, 
        values: [...state.values, state.currentValue]
    });

    return calculate({...newState, operation: payload})
}

export function percent(state, payload) {

    const newState = calculate({
        ...state, 
        values: [...state.values, state.currentValue], 
        operation: payload, 
        lastOperation: state.operation,
    });

    return {
        ...newState,
        lastOperation: null,
        operation: null,
    }
}

export function percentCommand(firstValue, secondValue, state) {
    if(secondValue === 0 || state.lastOperation === '^') return 0;
    
    const newSecondValue = (state.lastOperation === '+' || state.lastOperation === '-') ?
    `${divideCommand(multiplyCommand(firstValue, secondValue), 100)}`
    : `${divideCommand(secondValue, 100)}`;

    const newFirstValue = calculate({
        ...state,
        values: [firstValue, newSecondValue],
        operation: state.lastOperation,
    })
    .values[0]

    return newFirstValue; 
}


export function addToMemory(state) {
    const newState = state.currentValue ? calculate({
        ...state, 
        values: [...state.values, state.currentValue]
    })
    : {...state};

    const newMemory = addCommand(parseFloat(state.memory || '0'), parseFloat(newState.values[0]))

    return {
        ...newState,
        memory: newMemory ? `${newMemory}` : '0'
    }
}

export function subFromMemory(state) {
    const newState = state.currentValue ? calculate({
        ...state, 
        values: [...state.values, state.currentValue]
    })
    : {...state};

    const newMemory = subCommand(parseFloat(state.memory || '0'), parseFloat(newState.values[0]))

    return {
        ...newState,
        memory: newMemory ? `${newMemory}` : '0'
    }
}

export function restoreMemory(state) {

    return {
        ...state,
        value: `${state.memory}`,
        values: [`${state.memory}`],
        currentValue: '',
    }
}

export function clearMemory(state) {
    return {
        ...state,
        memory: '',
    }
}


export function clearCurrent(state) {
    return {
        ...initialState,
        memory: state.memory,
    }
}