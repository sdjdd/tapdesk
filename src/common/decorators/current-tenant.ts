import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentTenant = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const { tenant } = ctx.switchToHttp().getRequest();
    if (!tenant) {
      throw new Error(
        'Request instance has not "tenant" attributs, check middleware chain',
      );
    }
    return tenant;
  },
);
