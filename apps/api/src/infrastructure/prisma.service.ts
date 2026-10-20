import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { CauceRepositoryPort } from '../application/ports/cauce.repository';
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy, CauceRepositoryPort {
  async onModuleInit() { await this.$connect(); }
  async onModuleDestroy() { await this.$disconnect(); }
  transaction<T>(work:(transaction:any)=>Promise<T>):Promise<T> {
    return this.$transaction(work,{isolationLevel:Prisma.TransactionIsolationLevel.Serializable});
  }
}
