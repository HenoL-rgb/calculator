import { initialState } from "./rootReducer";


export function calculate(state) {
    let firstValue = parseFloat(state.values[0]);
    const secondValue = state.values[1] ? parseFloat(state.values[1])
    : firstValue;
    const operation = state.operation;
    
    switch(operation) {
        case "+":
            firstValue += secondValue;
            break;
        case "-":
            firstValue -= secondValue;
            break;
        case "*":
            firstValue *= secondValue;
            break;
        case "/":
            firstValue /= secondValue;
            break;
        default: 
            break;
    }

    const afterDot = `${firstValue}`.split('.');
    if(afterDot[1]?.length > 4) {
        firstValue = afterDot[0] + '.' + afterDot[1].slice(0, 3); 
    }

    console.log(state)
    return {...initialState, value: `${firstValue}`, values: [firstValue],
    history: [...state.history, state]};
}