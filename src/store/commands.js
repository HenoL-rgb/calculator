import { calculate } from './calculate';
import { initialState } from './rootReducer';

const MAX_HISTORY = 5;

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
  if (secondValue === 0) throw new Error('divide by zero');

  return firstValue / secondValue;
}

export function factorialCommand(value) {
  if (value < 0) throw new Error('negative factorial');

  let newValue = 1;

  for (let i = 2; i <= value; i++) {
    newValue *= i;
  }

  return newValue;
}

export function powCommand(firstValue, secondValue) {
  if (firstValue < 0 && secondValue ** 2 < 1 && secondValue ** 2 > 0) {
    throw new Error('neg square');
  }
  return firstValue ** secondValue;
}

export function addDigit(state, newDigit) {
  if (state.currentValue === '0' && newDigit === '0') return { ...state };
  const newCurrentValue =
    state.currentValue === '' && newDigit === '.'
      ? '0' + state.currentValue + newDigit
      : state.currentValue + newDigit;

  const newValue = !state.values[0]
    ? newCurrentValue
    : !state.currentValue.includes('(')
    ? state.values[0] + state.operation + newCurrentValue
    : !state.currentValue.includes(')')
    ? state.values[0] + state.operation + newCurrentValue + ')'
    : state.value.slice(0, state.values[0].length) + state.operation + newCurrentValue;

  return { ...state, value: newValue, currentValue: newCurrentValue };
}

export function clearAllAndAddDigit(state, newDigit) {
  const newState = { ...initialState, memory: state.memory };
  return addDigit(newState, newDigit);
}

export function addOperation(state, payload) {
  const currentValue = state.value.at(-1) === '.' ? state.value.split('.')[0] : state.value;

  const newValue = !payload.includes('^')
    ? currentValue + payload
    : currentValue.includes('(', ')')
    ? currentValue + payload
    : `${currentValue}` + payload;

  const newOperation = !payload.includes('^') ? payload : '^';

  const newCurrentValue = !payload.includes('^')
    ? ''
    : payload.includes(')')
    ? removeOuterBraces(payload.split('^')[1])
    : payload.split('^')[1];

  return {
    ...state,
    value: newValue,
    currentValue: newCurrentValue,
    operation: newOperation,
    secondValue_tmp: null,
    values: state.currentValue
      ? [...state.values, state.currentValue]
      : !state.values[0]
      ? [...state.values, '0']
      : [...state.values]
  };
}

export function addOperationAndCalc(state, payload) {
  const newState = calculate({ ...state, values: [...state.values, state.currentValue] });

  return addOperation(newState, payload);
}

export function undoOperation(state) {
  if (!state.history.length) return { ...state };

  const prevState = state.history.at(-1);

  return { ...prevState, history: state.history.filter((item) => item != prevState) };
}

export function changeSign(state) {
  if (state.currentValue === '' || state.currentValue === '0') return { ...state };
  const valueToChange = removeOuterBraces(state.currentValue);
  const isSecondValue = state.values[0] ? true : false;
  const changedValue = valueToChange.includes('-')
    ? valueToChange.includes('/')
      ? `(${valueToChange.slice(1)})`
      : `${valueToChange.slice(1)}`
    : isSecondValue
    ? `(-${valueToChange})`
    : `-${valueToChange}`;

  const newCurrentValue = removeOuterBraces(changedValue);
  const newValue = isSecondValue
    ? state.value.slice(0, state.values[0].length) + state.operation + changedValue
    : state.operation
    ? changedValue + state.operation
    : changedValue;

  return {
    ...state,
    value: newValue,
    currentValue: newCurrentValue
  };
}

export function divideOneByX(state) {
  const newState = calculate({
    ...state,
    values: [...state.values, state.currentValue]
  });

  const calculatedState = calculate({
    ...newState,
    values: ['1', ...newState.values],
    operation: '/'
  });

  return {
    ...calculatedState,
    history: calculatedState.history.filter((item) => item != calculatedState.history.at(-1))
  };
}

export function factorial(state, payload) {
  const newState = calculate({
    ...state,
    values: [...state.values, state.currentValue]
  });

  console.log(newState);
  const calculatedState = calculate({
    ...newState,
    operation: payload
  });

  return {
    ...calculatedState,
    history: calculatedState.history.filter((item) => item.operation != 'x!')
  };
}

export function tenPowX(state, payload) {
  const newState = calculate({
    ...state,
    values: [...state.values, state.currentValue]
  });

  const calculatedState = calculate({
    ...newState,
    operation: payload
  });

  return {
    ...calculatedState,
    history: calculatedState.history.filter((item) => item.operation != '10^x')
  };
}

export function percent(state, payload) {
  const newState = calculate({
    ...state,
    values: [...state.values, state.currentValue],
    operation: payload,
    lastOperation: state.operation
  });

  return {
    ...newState,
    lastOperation: null,
    operation: null
  };
}

export function percentCommand(firstValue, secondValue, state) {
  if (secondValue === 0 || state.lastOperation === '^') return 0;

  const newSecondValue =
    state.lastOperation === '+' || state.lastOperation === '-'
      ? `${divideCommand(multiplyCommand(firstValue, secondValue), 100)}`
      : `${divideCommand(secondValue, 100)}`;

  const newFirstValue = calculate({
    ...state,
    values: [firstValue, newSecondValue],
    operation: state.lastOperation
  }).values[0];

  return newFirstValue;
}

export function addToMemory(state) {
  const newState = state.currentValue
    ? calculate({
        ...state,
        values: [...state.values, state.currentValue]
      })
    : { ...state };

  const newMemory = addCommand(parseFloat(state.memory || '0'), parseFloat(newState.values[0]));

  return {
    ...newState,
    memory: newMemory ? `${newMemory}` : '0'
  };
}

export function subFromMemory(state) {
  const newState = state.currentValue
    ? calculate({
        ...state,
        values: [...state.values, state.currentValue]
      })
    : { ...state };

  const newMemory = subCommand(parseFloat(state.memory || '0'), parseFloat(newState.values[0]));

  return {
    ...newState,
    memory: newMemory ? `${newMemory}` : '0'
  };
}

export function restoreMemory(state) {
  if (!state.memory) return { ...state };

  return {
    ...state,
    value: `${state.memory}`,
    values: [`${state.memory}`],
    currentValue: ''
  };
}

export function clearMemory(state) {
  return {
    ...state,
    memory: ''
  };
}

export function clearCurrent(state) {
  return {
    ...initialState,
    memory: state.memory
  };
}

export function clearInput(value) {
  let newValue = removeOuterBraces(value);
  if (newValue.includes('/')) {
    const splitValue = newValue.split('/');
    newValue = divideCommand(parseFloat(splitValue[0]), parseFloat(splitValue[1]));
  }
  return parseFloat(newValue);
}

export function removeOuterBraces(value) {
  return value
    .split('')
    .filter((item) => item != '(' && item != ')')
    .join('');
}

export function saveResult(state, firstValue) {
  const afterDot = `${firstValue}`.split('.');
  if (afterDot[1]?.length > 4) {
    firstValue = afterDot[0] + '.' + afterDot[1].slice(0, 3);
  }

  let newHistory = [...state.history.map((item) => ({ ...item, history: [] })), state];

  if (newHistory.length > MAX_HISTORY) {
    newHistory = newHistory.filter((item, index) => index != 0);
  }

  return {
    ...state,
    value: `${firstValue}`,
    values: [`${firstValue}`],
    operation: null,
    currentValue: '',
    history: [...newHistory]
  };
}
