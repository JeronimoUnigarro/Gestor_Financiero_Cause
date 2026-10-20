import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from './auth';

describe('AuthGuard', () => {
  const jwt = new JwtService({ secret: 'guard-test-secret' });
  const guard = new AuthGuard(jwt);
  const context = (request:any) => ({ switchToHttp: () => ({ getRequest: () => request }) }) as any;

  it('attaches the verified identity from the session cookie', async () => {
    const token = await jwt.signAsync({ sub: '42' });
    const request:any = { cookies: { cauce_session: token } };
    expect(guard.canActivate(context(request))).toBe(true);
    expect(request.user.sub).toBe('42');
  });

  it('rejects missing and expired/invalid cookies', () => {
    expect(() => guard.canActivate(context({ cookies: {} }))).toThrow(UnauthorizedException);
    expect(() => guard.canActivate(context({ cookies: { cauce_session: 'invalid' } }))).toThrow(UnauthorizedException);
  });
});
