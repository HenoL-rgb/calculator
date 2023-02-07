import {
  addDigit,
  clearAllAndAddDigit,
  addOperationAndCalc,
  addOperation,
  undoOperation,
  changeSign,
  divideOneByX,
  factorial,
  tenPowX,
  percent,
  addToMemory,
  subFromMemory,
  restoreMemory,
  clearMemory,
  clearCurrent
} from './commands';
import { calculate } from './calculate';

export const initialState = {
  value: '0',
  currentValue: '',
  operation: null,
  lastOperation: null,
  secondValue_tmp: null,
  isError: false,
  values: [],
  memory: '',
  history: []
};

const rootReducer = (state = initialState, action) => {
  const currentState = !state.isError ? { ...state } : { ...initialState };

  switch (action.type) {
    case 'ADD_DOT':
      if (state.currentValue.includes('.')) return { ...currentState };

    // eslint-disable-next-line no-fallthrough
    case 'ADD_DIGIT':
      if (state.values != '' && state.operation === null) {
        return clearAllAndAddDigit(currentState, action.payload);
      }
      return addDigit(currentState, action.payload);

    case 'ADD_OPERATION':
      if (currentState.operation !== null) {
        if (currentState.currentValue != '') {
          return addOperationAndCalc(currentState, action.payload);
        }
        return addOperation(
          {
            ...currentState,
            value: currentState.value.slice(0, currentState.value.length - 1)
          },
          action.payload
        );
      }
      return addOperation(currentState, action.payload);

    case 'PERCENT_VALUE':
      return percent(currentState, action.payload);

    case 'CHANGE_SIGN':
      return changeSign(currentState);

    case 'MEMORY_PLUS':
      return addToMemory(currentState);

    case 'MEMORY_MINUS':
      return subFromMemory(currentState);

    case 'MEMORY_RESTORE':
      return restoreMemory(currentState);

    case 'MEMORY_CLEAR':
      return clearMemory(currentState);

    case 'UNDO':
      return undoOperation(currentState);

    case 'CLEAR_ALL':
      return { ...initialState };

    case 'CLEAR_CURRENT':
      return clearCurrent(currentState);

    case 'DIVIDE_ONE_BY_VALUE':
      return divideOneByX(currentState);

    case 'FACTORIAL_VALUE':
      return factorial(currentState, action.payload);

    case 'TEN_POW_X':
      return tenPowX(currentState, action.payload);

    case 'CALC_VALUE':
      // eslint-disable-next-line no-case-declarations
      const newSecondValueTmp =
        currentState.currentValue !== '' ? currentState.currentValue : currentState.secondValue_tmp;

      // eslint-disable-next-line no-case-declarations
      const newLastOperation = currentState.operation
        ? currentState.operation
        : currentState.lastOperation;

      return calculate({
        ...currentState,
        values: [...currentState.values, currentState.currentValue],
        secondValue_tmp: newSecondValueTmp,
        lastOperation: newLastOperation
      });

    default:
      return { ...currentState };
  }
};

export default rootReducer;
