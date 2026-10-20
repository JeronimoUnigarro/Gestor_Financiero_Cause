import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, createParamDecorator } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const token = req.cookies?.cauce_session;
    if (!token) throw new UnauthorizedException('Inicia sesión para continuar.');
    try { req.user = this.jwt.verify(token); return true; }
    catch { throw new UnauthorizedException('La sesión expiró. Inicia sesión nuevamente.'); }
  }
}
export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().user);
