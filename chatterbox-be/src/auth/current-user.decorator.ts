import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

const getCurrentUserByContext = (context: ExecutionContext): User => {
  const request = context.switchToHttp().getRequest();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
