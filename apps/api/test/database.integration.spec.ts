import { resolve } from 'node:path';
import { config } from 'dotenv';
config({ path: resolve(__dirname, '../../../.env') });

import { JwtService } from '@nestjs/jwt';
import { NotFoundException } from '@nestjs/common';
import { AppService } from '../src/application/app.service';
import { PrismaService } from '../src/infrastructure/prisma.service';

describe('CAUCE application + MySQL integration', () => {
  const db = new PrismaService();
  const app = new AppService(db, new JwtService({ secret: process.env.JWT_SECRET || 'test-secret' }));
  const tag = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const emailA = `cauce-test-a-${tag}@example.test`;
  const emailB = `cauce-test-b-${tag}@example.test`;
  let userA = '', userB = '', expenseCategory = '', incomeCategory = '', alertId = '';

  beforeAll(async () => {
    await db.$connect();
    const a = await app.register({ email: emailA, password: 'Integration-Password-123', name: 'Integration A' });
    const b = await app.register({ email: emailB, password: 'Integration-Password-123', name: 'Integration B' });
    userA = a.id; userB = b.id;
  });
  afterAll(async () => {
    for (const uid of [userA, userB].filter(Boolean).map(BigInt)) {
      await db.alert.deleteMany({ where: { userId: uid } });
      await db.contribution.deleteMany({ where: { userId: uid } });
      await db.goal.deleteMany({ where: { userId: uid } });
      await db.budget.deleteMany({ where: { userId: uid } });
      await db.movement.deleteMany({ where: { userId: uid } });
      await db.category.deleteMany({ where: { userId: uid } });
      await db.user.deleteMany({ where: { id: uid } });
    }
    await db.$disconnect();
  });

  it('registers and authenticates accounts with isolated profile access', async () => {
    const session = await app.login(emailA, 'Integration-Password-123');
    expect(session.profile.id).toBe(userA);
    expect((await app.profile(userA)).email).toBe(emailA);
    await app.updateProfile(userA, { name: 'Integration Updated' });
    expect((await app.profile(userA)).name).toBe('Integration Updated');
    await expect(app.login(emailA, 'incorrect')).rejects.toThrow();
    const foreignCategory = await app.createCategory(userA, { name: `Private ${tag}`, type: 'EXPENSE' });
    expect((await app.updateCategory(userA, foreignCategory.id.toString(), { name: `Renamed ${tag}` })).name).toBe(`Renamed ${tag}`);
    await expect(app.updateCategory(userB, foreignCategory.id.toString(), { name: 'Tampered' })).rejects.toBeInstanceOf(NotFoundException);
    const own = await app.categories(userA);
    expenseCategory = own.find((c:any) => c.userId === null && c.name === 'Alimentación')!.id.toString();
    incomeCategory = own.find((c:any) => c.userId === null && c.name === 'Salario')!.id.toString();
  });

  it('persists movements and computes balance, budgets, goal transfers and idempotent alerts', async () => {
    const date = new Date().toISOString().slice(0, 10);
    await app.createMovement(userA, { amount: '100.00', categoryId: incomeCategory, date }, 'INCOME');
    await app.createMovement(userA, { amount: '50.00', categoryId: expenseCategory, date }, 'EXPENSE');
    expect((await app.balance(userA)).available).toBe('50.00');
    expect(await app.movements(userA, { type: 'EXPENSE' })).toHaveLength(1);
    const budget = await app.createBudget(userA, { categoryId: expenseCategory, limitAmount: '40.00', startDate: date, endDate: date });
    const progress = (await app.budgets(userA)).find(b => b.id === budget.id)!;
    expect(progress.state).toBe('EXCEEDED');
    expect(progress.percentage).toBe(125);
    await expect(app.createMovement(userA, { amount: '5.00', categoryId: incomeCategory, date }, 'EXPENSE')).rejects.toThrow();
    const goal = await app.createGoal(userA, { name: 'Integration goal', targetAmount: '30.00', targetDate: date });
    const partial = await app.contribute(userA, goal.id.toString(), { amount: '20.00' }, `first-${tag}`);
    expect(partial.saved).toBe('20.00');
    const retry = await app.contribute(userA, goal.id.toString(), { amount: '20.00' }, `first-${tag}`);
    expect(retry.saved).toBe('20.00');
    const complete = await app.contribute(userA, goal.id.toString(), { amount: '10.00' }, `second-${tag}`);
    expect(complete.state).toBe('COMPLETED');
    expect((await app.balance(userA)).available).toBe('20.00');
    const alerts = await app.alerts(userA);
    expect(alerts.filter((a:any) => a.entityType === 'budget' && a.entityId === budget.id)).toHaveLength(1);
    expect(alerts.filter((a:any) => a.entityType === 'goal' && a.entityId === goal.id)).toHaveLength(1);
    alertId = alerts[0].id.toString();
    await expect(app.markAlertRead(userB, alertId)).rejects.toBeInstanceOf(NotFoundException);
    expect((await app.markAlertRead(userA, alertId)).isRead).toBe(true);
    const tooLarge = await app.createGoal(userA, { name: 'Insufficient balance case', targetAmount: '100.00', targetDate: date });
    await expect(app.contribute(userA, tooLarge.id.toString(), { amount: '21.00' }, `insufficient-${tag}`)).rejects.toThrow('No tienes saldo disponible suficiente.');
  });

  it('returns isolated monthly analytics and a 30-day projection', async () => {
    const own = await app.analytics(userA);
    const empty = await app.analytics(userB);
    expect(own.months).toHaveLength(6);
    expect(own.forecast).toHaveLength(31);
    expect(own.forecast[0].balance).toBe((await app.balance(userA)).available);
    expect(own.categoryExpenses.length).toBeGreaterThan(0);
    expect(empty.categoryExpenses).toHaveLength(0);
    expect(empty.recurringPayments).toBe(0);
  });
});
