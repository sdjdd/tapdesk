import path from 'path';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

const getMigrationsPath = () => path.join(__dirname, 'migrations/*.{js,ts}');

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('TAPDESK_DB_HOST', 'localhost'),
          port: parseInt(configService.get('TAPDESK_DB_PORT', '3306')),
          username: configService.get('TAPDESK_DB_USERNAME'),
          password: configService.get('TAPDESK_DB_PASSWORD'),
          database: configService.get('TAPDESK_DB_DATABASE'),
          autoLoadEntities: true,
          migrations: [getMigrationsPath()],
          migrationsRun: true,
          logging: true,
        };
      },
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
