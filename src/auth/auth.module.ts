import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/user';
import { HttpBasicStrategy } from './strategies/http-basic.strategy';

@Module({
  imports: [UserModule],
  providers: [HttpBasicStrategy],
})
export class AuthModule {}
