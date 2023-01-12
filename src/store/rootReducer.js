import {addDigit, clearAllAndAddDigit, addOperationAndCalc, addOperation, addDegree, calcDegree, undoOperation} from './commands'
import {calculate} from './calculate'

const MAX_VALUES = 2;

export const initialState = {
    value: '0',
    currentValue: '',
    operation: null,
    values: [],
    history: [],
}

const rootReducer = (state = initialState, action) => {

    switch(action.type) {
        case "ADD_DOT":
            if(state.value.includes('.')) return state;

        case "ADD_DIGIT":
            if(state.values != '' && state.operation === null) {
                return clearAllAndAddDigit(state, action.payload);
            }
            return addDigit(state, action.payload);

        case "ADD_OPERATION": 
            if(state.operation !== null){
                if(state.currentValue) {
                    return addOperationAndCalc(
                        {...state,
                            values: [...state.values, state.currentValue]
                        }, action.payload
                        );
                } 
                return addOperation({...state, 
                    value: state.value.slice(0, state.value.length - 1)}, 
                    action.payload);
            }

            return addOperation(state, action.payload);

        case "X_POW_Y":
            return addDegree(state, action.payload);

        case "UNDO":
            return undoOperation(state);

        case "CLEAR_ALL":
            return {...initialState};

        case "CALC_VALUE":
            const newCurrentValue = calcDegree(state.currentValue);
            return calculate(
                {...state,
                values: [...state.values, newCurrentValue]
            });

        default:
            return state;
    }
}

export default rootReducer;