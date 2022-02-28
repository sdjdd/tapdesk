import { Module } from '@nestjs/common';
import { UserModule } from '@/modules/user';
import { HttpStrategy } from './strategies/http.strategy';

@Module({
  imports: [UserModule],
  providers: [HttpStrategy],
})
export class AuthModule {}
