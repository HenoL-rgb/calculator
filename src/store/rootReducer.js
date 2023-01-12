import {addDigit, clearAllAndAddDigit, addOperationAndCalc, addOperation, addDegree, calcDegree, undoOperation, changeSign, addSqrt} from './commands'
import {calculate} from './calculate'

const MAX_VALUES = 2;

export const initialState = {
    value: '0',
    currentValue: '',
    operation: null,
    lastOperation: null,
    secondValue_tmp: null,
    values: [],
    history: [],
}

const rootReducer = (state = initialState, action) => {

    switch(action.type) {
        case "ADD_DOT":
            if(state.value.includes('.')) 
                return {...state};

        case "ADD_DIGIT":
            if(state.values != '' && state.operation === null) {
                return clearAllAndAddDigit(state, action.payload);
            }
            return addDigit(state, action.payload);

        case "ADD_OPERATION": 
            if((state.value === '0') && (action.payload === '-')){
                return addDigit(state, action.payload)
            }

            if(state.operation !== null){
                if(state.currentValue) {
                    return addOperationAndCalc(
                        {...state,
                            values: [...state.values, state.currentValue],
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
        
        case "X_SQRT_Y":
            return addSqrt(state, action.payload);

        case "CHANGE_SIGN":
            return changeSign(state);

        case "UNDO":
            if(state.history == '') return {...state};
            return undoOperation(state);

        case "CLEAR_ALL":
            return {...initialState, history: [...state.history]};

        case "CALC_VALUE":
            const newCurrentValue = calcDegree(state.currentValue);

            const newSecondValueTmp = newCurrentValue ? newCurrentValue
            : state.secondValue_tmp;

            const newLastOperation = state.operation ? state.operation
            : state.lastOperation;

            return calculate(
                {...state,
                values: [...state.values, newCurrentValue],        
                secondValue_tmp: newSecondValueTmp,
                lastOperation: newLastOperation,
            });

        default:
            return {...state};
    }
}

export default rootReducer;