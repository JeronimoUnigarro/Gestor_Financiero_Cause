import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './presentation/app.controller';
import { AuthGuard } from './presentation/auth';
import { AppService } from './application/app.service';
import { PrismaService } from './infrastructure/prisma.service';
import { ThrottlerGuard } from '@nestjs/throttler';
import { CAUCE_REPOSITORY } from './application/ports/cauce.repository';
@Module({imports:[JwtModule.registerAsync({useFactory:()=>{const secret=process.env.JWT_SECRET;if(!secret||secret.length<32)throw new Error('Configura JWT_SECRET con al menos 32 caracteres.');return{secret,signOptions:{expiresIn:'7d'}};}}),ThrottlerModule.forRoot([{ttl:60000,limit:120}])],controllers:[AppController],providers:[AppService,{provide:CAUCE_REPOSITORY,useClass:PrismaService},AuthGuard,{provide:APP_GUARD,useClass:ThrottlerGuard}]})
export class AppModule {}
