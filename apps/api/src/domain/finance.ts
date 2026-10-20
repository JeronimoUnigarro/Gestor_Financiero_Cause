/** Domain policies use decimal strings/BigInt cents; no binary float money math. */
export const toCents = (value: string | number): bigint => {
  const raw = String(value);
  if (!/^\d+(\.\d{1,2})?$/.test(raw)) throw new Error('El monto debe tener hasta dos decimales.');
  const [whole, fraction = ''] = raw.split('.');
  return BigInt(whole) * 100n + BigInt(fraction.padEnd(2, '0'));
};
export const fromCents = (cents: bigint): string => {
  const sign = cents < 0n ? '-' : '';
  const abs = cents < 0n ? -cents : cents;
  return `${sign}${abs / 100n}.${(abs % 100n).toString().padStart(2, '0')}`;
};
export const budgetState = (spent: bigint, limit: bigint, threshold: string | number = 80): 'NORMAL' | 'NEAR' | 'EXCEEDED' => {
  const thresholdBasisPoints = toCents(String(threshold));
  return spent > limit ? 'EXCEEDED' : spent * 10000n >= limit * thresholdBasisPoints ? 'NEAR' : 'NORMAL';
};
export const progressPercent = (saved: bigint, target: bigint): number => Number((saved * 10000n / target)) / 100;
export const availableBalance = (income: bigint, expenses: bigint, contributions: bigint): bigint => income - expenses - contributions;
