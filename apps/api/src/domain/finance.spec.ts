import { availableBalance, budgetState, fromCents, progressPercent, toCents } from './finance';
describe('financial domain policies', () => {
  it('parses and formats exact COP cents', () => expect(fromCents(toCents('123456.78'))).toBe('123456.78'));
  it('formats a negative available balance correctly', () => expect(fromCents(-250n)).toBe('-2.50'));
  it('rejects precision beyond cents', () => expect(() => toCents('1.001')).toThrow());
  it('classifies budget proximity and overspend without capping', () => {
    expect(budgetState(8000n, 10000n)).toBe('NEAR');
    expect(budgetState(12000n, 10000n)).toBe('EXCEEDED');
    expect(progressPercent(15n, 10n)).toBe(150);
  });
  it('accepts a configurable fractional proximity threshold', () => expect(budgetState(8050n, 10000n, '80.50')).toBe('NEAR'));
  it('subtracts goal transfers once from available balance', () => expect(availableBalance(10000n, 1000n, 2500n)).toBe(6500n));
});
