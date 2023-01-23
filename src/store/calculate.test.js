import { calculate } from "./calculate";

test('Тест суммы', () => {
    const testState = {
        value: '5+6',
        currentValue: "6",
        lastOperation: null,
        secondValue_tmp: null,
        isError: false,
        memory: '',
        history: [],
    }
    
    expect(calculate({...testState, values: ['5','6'], operation: '+'}).values[0]).toBe('11');
    expect(calculate({...testState, values: ['-5','6'], operation: '+'}).values[0]).toBe('1');
    expect(calculate({...testState, values: ['-5.5','0'], operation: '+'}).values[0]).toBe('-5.5');

})

test('Тест разности', () => {
    const testState = {
        value: '5+6',
        currentValue: "6",
        lastOperation: null,
        secondValue_tmp: null,
        isError: false,
        memory: '',
        history: [],
    }
    
    expect(calculate({...testState, values: ['5','6'], operation: '-'}).values[0]).toBe('-1');
    expect(calculate({...testState, values: ['-5','-6'], operation: '-'}).values[0]).toBe('1');
    expect(calculate({...testState, values: ['-5.5','0'], operation: '+'}).values[0]).toBe('-5.5');

})