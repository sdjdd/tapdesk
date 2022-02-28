import { UserEntity } from '@/modules/user';

declare module 'express' {
  interface Request {
    user: UserEntity;
  }
}

export { CurrentTenant } from './current-tenant';
export { CurrentUser } from './current-user';
