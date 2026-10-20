/** Persistence port consumed by application use cases. Infrastructure adapts Prisma to this contract. */
export const CAUCE_REPOSITORY = Symbol('CAUCE_REPOSITORY');
export type RepositoryDelegate = {
  findUnique: (...args:any[])=>Promise<any>;
  findFirst: (...args:any[])=>Promise<any>;
  findMany: (...args:any[])=>Promise<any>;
  create: (...args:any[])=>Promise<any>;
  update: (...args:any[])=>Promise<any>;
  upsert: (...args:any[])=>Promise<any>;
  aggregate: (...args:any[])=>Promise<any>;
  deleteMany: (...args:any[])=>Promise<any>;
};
export interface CauceRepositoryPort {
  user:RepositoryDelegate;
  category:RepositoryDelegate;
  movement:RepositoryDelegate;
  budget:RepositoryDelegate;
  goal:RepositoryDelegate;
  contribution:RepositoryDelegate;
  alert:RepositoryDelegate;
  recurringPayment:RepositoryDelegate;
  transaction<T>(work:(transaction:CauceRepositoryPort)=>Promise<T>):Promise<T>;
}
