import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

// AuthGuard for graphql
export class GqlAuthGuard extends AuthGuard('jwt') {
  // override getRequest method to get the request object from the graphql context
  getRequest(context: ExecutionContext) {
    // Get the request object from the graphql context
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
