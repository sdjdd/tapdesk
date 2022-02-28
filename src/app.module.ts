import path from 'path';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantMiddleware } from './common';
import { TenantModule } from './modules/tenant';
import { UserModule } from './modules/user';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './modules/category';

const typeormModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'tapdesk_dev',
  autoLoadEntities: true,
  migrations: [path.join(__dirname, 'database/migrations/*.{js,ts}')],
  migrationsRun: true,
  logging: true,
});

@Module({
  imports: [
    typeormModule,
    TenantModule,
    UserModule,
    AuthModule,
    CategoryModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('clients/:tenantId');
  }
}
