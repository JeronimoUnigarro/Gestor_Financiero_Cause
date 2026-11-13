import { Body, Controller, Get, Headers, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Throttle } from '@nestjs/throttler';
import { AppService } from '../application/app.service';
import { AuthGuard, CurrentUser } from './auth';
import { AnalyzeFinancesDto, BudgetDto, CategoryDto, CategoryUpdateDto, ChangePasswordDto, ContributionDto, GoalDto, LoginDto, MovementDto, ProfileDto, RegisterDto } from './dto';

@Controller()
export class AppController {
  constructor(private app: AppService) {}
  @Get('health') health() { return { status: 'ok' }; }
  @Post('auth/register') register(@Body() body:RegisterDto) { return this.app.register(body); }
  @Post('auth/login') async login(@Body() body:LoginDto,@Res({passthrough:true}) res:Response) {
    const result=await this.app.login(body.email,body.password);
    res.cookie('cauce_session',result.token,{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:process.env.NODE_ENV==='production'?'none':'lax',path:'/',maxAge:7*24*60*60*1000});
    return result.profile;
  }
  @UseGuards(AuthGuard) @Post('auth/logout') logout(@Res({passthrough:true}) res:Response) { res.clearCookie('cauce_session',{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:process.env.NODE_ENV==='production'?'none':'lax',path:'/'}); return {message:'Sesión cerrada.'}; }
  @UseGuards(AuthGuard) @Get('profile') profile(@CurrentUser() u:any) { return this.app.profile(u.sub); }
  @UseGuards(AuthGuard) @Patch('profile') updateProfile(@CurrentUser() u:any,@Body() b:ProfileDto) { return this.app.updateProfile(u.sub,b); }
  @UseGuards(AuthGuard) @Post('profile/password') changePassword(@CurrentUser() u:any,@Body() b:ChangePasswordDto) { return this.app.changePassword(u.sub,b.currentPassword,b.newPassword); }
  @UseGuards(AuthGuard) @Get('categories') categories(@CurrentUser() u:any) { return this.app.categories(u.sub); }
  @UseGuards(AuthGuard) @Post('categories') createCategory(@CurrentUser() u:any,@Body() b:CategoryDto) { return this.app.createCategory(u.sub,b); }
  @UseGuards(AuthGuard) @Patch('categories/:id') updateCategory(@CurrentUser() u:any,@Param('id') id:string,@Body() b:CategoryUpdateDto) { return this.app.updateCategory(u.sub,id,b); }
  @UseGuards(AuthGuard) @Post('movements/income') income(@CurrentUser() u:any,@Body() b:MovementDto) { return this.app.createMovement(u.sub,b,'INCOME'); }
  @UseGuards(AuthGuard) @Post('movements/expense') expense(@CurrentUser() u:any,@Body() b:MovementDto) { return this.app.createMovement(u.sub,b,'EXPENSE'); }
  @UseGuards(AuthGuard) @Get('movements') movements(@CurrentUser() u:any,@Query() q:any) { return this.app.movements(u.sub,q); }
  @UseGuards(AuthGuard) @Get('balance') balance(@CurrentUser() u:any) { return this.app.balance(u.sub); }
  @UseGuards(AuthGuard) @Get('analytics') analytics(@CurrentUser() u:any) { return this.app.analytics(u.sub); }
  @UseGuards(AuthGuard) @Throttle({default:{limit:5,ttl:60000}}) @Post('ai/analyze') analyzeFinances(@CurrentUser() u:any,@Body() b:AnalyzeFinancesDto) { return this.app.analyzeFinances(u.sub,b.consent); }
  @UseGuards(AuthGuard) @Post('budgets') createBudget(@CurrentUser() u:any,@Body() b:BudgetDto) { return this.app.createBudget(u.sub,b); }
  @UseGuards(AuthGuard) @Patch('budgets/:id') updateBudget(@CurrentUser() u:any,@Param('id') id:string,@Body() b:BudgetDto) { return this.app.updateBudget(u.sub,id,b); }
  @UseGuards(AuthGuard) @Get('budgets/:id/movements') budgetMovements(@CurrentUser() u:any,@Param('id') id:string) { return this.app.budgetMovements(u.sub,id); }
  @UseGuards(AuthGuard) @Get('budgets') budgets(@CurrentUser() u:any) { return this.app.budgets(u.sub); }
  @UseGuards(AuthGuard) @Post('goals') createGoal(@CurrentUser() u:any,@Body() b:GoalDto) { return this.app.createGoal(u.sub,b); }
  @UseGuards(AuthGuard) @Patch('goals/:id') updateGoal(@CurrentUser() u:any,@Param('id') id:string,@Body() b:GoalDto) { return this.app.updateGoal(u.sub,id,b); }
  @UseGuards(AuthGuard) @Get('goals') goals(@CurrentUser() u:any) { return this.app.goals(u.sub); }
  @UseGuards(AuthGuard) @Post('goals/:id/contributions') contribute(@CurrentUser() u:any,@Param('id') id:string,@Headers('idempotency-key') key:string,@Body() b:ContributionDto) { return this.app.contribute(u.sub,id,b,key); }
  @UseGuards(AuthGuard) @Get('alerts') alerts(@CurrentUser() u:any) { return this.app.alerts(u.sub); }
  @UseGuards(AuthGuard) @Patch('alerts/:id/read') readAlert(@CurrentUser() u:any,@Param('id') id:string) { return this.app.markAlertRead(u.sub,id); }
}
