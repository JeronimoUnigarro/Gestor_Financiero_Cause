import 'reflect-metadata';
import { config } from 'dotenv';
config({path:'../../.env'});
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import express = require('express');
import cookieParser = require('cookie-parser');
import helmet from 'helmet';
async function bootstrap() {
  const app=await NestFactory.create(AppModule,{bodyParser:false});
  app.use(express.json({limit:'1mb'}));
  app.getHttpAdapter().getInstance().set('json replacer',(_key:string,value:any)=>typeof value==='bigint'?value.toString():value);
  app.use(helmet()); app.use(cookieParser());
  const allowedOrigins=(process.env.WEB_ORIGIN||'http://localhost:3000').split(',').map(origin=>origin.trim()).filter(Boolean);
  app.enableCors({origin:allowedOrigins,credentials:true});
  app.useGlobalPipes(new ValidationPipe({whitelist:true,transform:true,forbidNonWhitelisted:true}));
  app.setGlobalPrefix('api');
  await app.listen(Number(process.env.API_PORT||3001));
}
bootstrap();
