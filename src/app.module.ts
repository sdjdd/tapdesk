import path from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from './modules/project';
import { UserModule } from './modules/user';

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
  imports: [typeormModule, ProjectModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
