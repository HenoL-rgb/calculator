import { calculate } from './calculate';

const testState = {
  value: '5+6',
  currentValue: '6',
  lastOperation: null,
  secondValue_tmp: null,
  isError: false,
  memory: '',
  history: []
};
test('Тест суммы', () => {
  expect(calculate({ ...testState, values: ['5', '6'], operation: '+' }).values[0]).toBe('11');
  expect(calculate({ ...testState, values: ['-5', '6'], operation: '+' }).values[0]).toBe('1');
  expect(calculate({ ...testState, values: ['-5.5', '0'], operation: '+' }).values[0]).toBe('-5.5');
});

test('Тест разности', () => {
  expect(calculate({ ...testState, values: ['5', '6'], operation: '-' }).values[0]).toBe('-1');
  expect(calculate({ ...testState, values: ['-5', '-6'], operation: '-' }).values[0]).toBe('1');
  expect(calculate({ ...testState, values: ['-5.5', '0'], operation: '-' }).values[0]).toBe('-5.5');
});

test('Тест произведения', () => {
  expect(calculate({ ...testState, values: ['5', '6'], operation: '*' }).values[0]).toBe('30');
  expect(calculate({ ...testState, values: ['-5', '-6'], operation: '*' }).values[0]).toBe('30');
  expect(calculate({ ...testState, values: ['-5.5', '6'], operation: '*' }).values[0]).toBe('-33');
});

test('Тест корня', () => {
  expect(calculate({ ...testState, values: ['4', '0.5'], operation: '^' }).values[0]).toBe('2');
  expect(calculate({ ...testState, values: ['-5', '-0.5'], operation: '^' }).value).toBe(
    'Error: neg square'
  );
  expect(calculate({ ...testState, values: ['4', '-0.5'], operation: '^' }).values[0]).toBe('0.5');
});

test('Тест деления', () => {
  expect(calculate({ ...testState, values: ['4', '2'], operation: '/' }).values[0]).toBe('2');
  expect(calculate({ ...testState, values: ['-5', '0'], operation: '/' }).value).toBe(
    'Error: divide by zero'
  );
  expect(calculate({ ...testState, values: ['4', '-0.5'], operation: '/' }).values[0]).toBe('-8');
});

test('Тест степени', () => {
  expect(calculate({ ...testState, values: ['4', '2'], operation: '^' }).values[0]).toBe('16');
  expect(calculate({ ...testState, values: ['-5', '0'], operation: '^' }).values[0]).toBe('1');
  expect(calculate({ ...testState, values: ['-2', '-2'], operation: '^' }).values[0]).toBe('0.25');
});

test('Тест факториала', () => {
  expect(calculate({ ...testState, values: ['4'], operation: 'x!' }).values[0]).toBe('24');
  expect(calculate({ ...testState, values: ['0'], operation: 'x!' }).values[0]).toBe('1');
  expect(calculate({ ...testState, values: ['-2'], operation: 'x!' }).value).toBe(
    'Error: negative factorial'
  );
});

test('Тест 1/x', () => {
  expect(calculate({ ...testState, values: ['1', '4'], operation: '/' }).values[0]).toBe('0.25');
  expect(calculate({ ...testState, values: ['1', '0'], operation: '/' }).value).toBe(
    'Error: divide by zero'
  );
  expect(calculate({ ...testState, values: ['1', '-2'], operation: '/' }).value).toBe('-0.5');
});

test('Тест 10^x', () => {
  expect(calculate({ ...testState, values: ['1'], operation: '10^x' }).values[0]).toBe('10');
  expect(calculate({ ...testState, values: ['2'], operation: '10^x' }).values[0]).toBe('100');
  expect(calculate({ ...testState, values: ['-0.5'], operation: '10^x' }).values[0]).toBe('0.316');
});

test('Тест процента', () => {
  expect(
    calculate({ ...testState, values: ['5', '6'], operation: '%', lastOperation: '+' }).values[0]
  ).toBe('5.3');
  expect(
    calculate({ ...testState, values: ['5', '-6'], operation: '%', lastOperation: '*' }).values[0]
  ).toBe('-0.3');
  expect(
    calculate({ ...testState, values: ['5', '0.5'], operation: '%', lastOperation: '/' }).values[0]
  ).toBe('1000');
});
