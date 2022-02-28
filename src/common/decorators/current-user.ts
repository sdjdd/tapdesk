import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const { user } = ctx.switchToHttp().getRequest();
  if (!user) {
    throw new Error(
      'Request instance has not "user" attributs, check guard config',
    );
  }
  return user;
});
