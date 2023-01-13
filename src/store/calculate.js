import { addCommand, divideCommand, multiplyCommand, subCommand } from "./commands";
import { initialState } from "./rootReducer";

const MAX_HISTORY = 5;

export function calculate(state) {
    let firstValue = parseFloat(state.values[0]);
    const secondValue = state.values[1] !== '0' ? parseFloat(state.values[1])
    : parseFloat(state.secondValue_tmp);
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
            firstValue = divideCommand(firstValue, secondValue);
            break;
        default: 
            break;
    }

    const afterDot = `${firstValue}`.split('.');
    if(afterDot[1]?.length > 4) {
        firstValue = afterDot[0] + '.' + afterDot[1].slice(0, 3); 
    }

    const newHistory = [...state.history, state]

    if(newHistory.length > MAX_HISTORY) {
        newHistory.shift();
    }

    return {...state, 
        value: `${firstValue}`, 
        values: [firstValue],
        history: [...newHistory],
        operation: null,
        currentValue: '0',
    };
}