import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TenantMiddleware } from './common';
import { TenantModule } from './modules/tenant';
import { UserModule } from './modules/user';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './modules/category';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TicketModule } from './modules/ticket';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    DatabaseModule,
    TenantModule,
    UserModule,
    AuthModule,
    CategoryModule,
    TicketModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('clients/:tenantId');
  }
}
