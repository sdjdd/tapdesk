import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category';
import { UserService } from '../user';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketEntity } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  @InjectRepository(TicketEntity)
  private ticketRepository: Repository<TicketEntity>;

  constructor(
    private categoryService: CategoryService,
    private userService: UserService,
  ) {}

  async create(tenantId: number, data: CreateTicketDto): Promise<TicketEntity> {
    const category = await this.categoryService.findOneOrFail(
      tenantId,
      data.category_id,
    );
    const requester = await this.userService.findOneOrFail(
      tenantId,
      data.requester_id,
    );

    const ticket = new TicketEntity();
    ticket.tenant_id = tenantId;
    ticket.category_id = category.id;
    ticket.requester_id = requester.id;
    ticket.subject = data.subject;
    ticket.description = data.description;
    await this.ticketRepository.insert(ticket);

    return ticket;
  }
}
