import { addCommand, divideCommand, factorialCommand, multiplyCommand, percentCommand, subCommand } from "./commands";
import { initialState } from "./rootReducer";

const MAX_HISTORY = 1;

export function calculate(state) {
    let firstValue = state.values[0] ? parseFloat(state.values[0]) : 0;
    const secondValue = state.values[1] ? clearInput(state.values[1])
    : parseFloat(state.secondValue_tmp) ? parseFloat(state.secondValue_tmp) : 0;
    const operation = state.operation !== null ? state.operation : state.lastOperation;
    
    switch(operation) {
        case "+":
            firstValue = addCommand(firstValue, secondValue)
            break;
        case "-":
            firstValue = subCommand(firstValue, secondValue);
            break;
        case "*":
            firstValue = multiplyCommand(firstValue, secondValue);
            break;
        case "/":
            try {
                firstValue = divideCommand(firstValue, secondValue);
            } catch(err) {
                return {
                    ...state,
                    isError: true,
                    value: `${err.name}: ${err.message}`
                }
            }
            break;
        case "^":
            firstValue = firstValue ** secondValue;
            break;
        case "x!":
            try {
                firstValue = factorialCommand(parseInt(firstValue));
            } catch(err) {
                return {
                    ...state,
                    isError: true,
                    value: `${err.name}: ${err.message}`
                }
            }
            break;
        case "10^x":
            firstValue = 10 ** firstValue;
            break;
        case "%":
            firstValue = percentCommand(firstValue, secondValue, state)
        default: 
            break;
    }

    return saveResult(state, firstValue);
}

export function clearInput(value) {
    let newValue = removeOuterBraces(value)
    if(newValue.includes('/')) {
        const splitValue = newValue.split('/');
        newValue = divideCommand(parseFloat(splitValue[0]), parseFloat(splitValue[1]))
    }
    return parseFloat(newValue);
}

export function removeOuterBraces(value) {
    return value.split('').filter(item => (item != '(' && item != ')')).join('');
}

export function saveResult(state, firstValue) {
    const afterDot = `${firstValue}`.split('.');
    if(afterDot[1]?.length > 4) {
        firstValue = afterDot[0] + '.' + afterDot[1].slice(0, 3); 
    }

    const newHistory = [...state.history,
        {...state, operation: state.operation === '%' ? 
        null : state.operation
        }
    ]

    if(newHistory.length > MAX_HISTORY) {
        newHistory.shift();
    }

    return {...state, 
        value: `${firstValue}`, 
        values: [`${firstValue}`],
        history: [...newHistory],
        operation: null,
        currentValue: '',
    };
}