import { AuthGuard } from '@nestjs/passport';

// Default strategy name is 'local'. You can change it in local.strategy.ts
export class LocalAuthGuard extends AuthGuard('local') {}
