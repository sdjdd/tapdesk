import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category';
import { UserModule } from '../user';
import { TicketEntity } from './entities/ticket.entity';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TicketEntity]),
    CategoryModule,
    UserModule,
  ],
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
