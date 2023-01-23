import { addCommand, clearInput, divideCommand,
    factorialCommand, multiplyCommand, percentCommand,
    powCommand, saveResult, subCommand } from "./commands";
import { initialState } from "./rootReducer";

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
            try {
                firstValue = powCommand(firstValue, secondValue);
            } catch(err) {
                return {
                    ...state,
                    isError: true,
                    value: `${err.name}: ${err.message}`
                }
            }
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

