import { makePercent } from './formHandler'

test('round to two decimals', () => {
    expect(makePercent(.123456)).toBe('12.35%');
});

test('works with no decimals', () => {
    expect(makePercent(1)).toBe('100.00%');
});
