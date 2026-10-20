import { config } from 'dotenv';
config({path:'../../.env'});
import { PrismaClient } from '@prisma/client';
const prisma=new PrismaClient();
async function main(){
  const expenses=['Alimentación','Transporte','Vivienda','Salud','Entretenimiento','Otros'];
  const incomes=['Salario','Ventas','Inversiones','Otros'];
  for(const name of expenses) if(!await prisma.category.findFirst({where:{userId:null,name,type:'EXPENSE'}})) await prisma.category.create({data:{name,type:'EXPENSE',isActive:true}});
  for(const name of incomes) if(!await prisma.category.findFirst({where:{userId:null,name,type:'INCOME'}})) await prisma.category.create({data:{name,type:'INCOME',isActive:true}});
}
main().finally(()=>prisma.$disconnect());
