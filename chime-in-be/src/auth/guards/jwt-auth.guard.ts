import { AuthGuard } from '@nestjs/passport';

// Default strategy name is 'jwt'. You can change it in jwt.strategy.ts
export class JwtAuthGuard extends AuthGuard('jwt') {}
