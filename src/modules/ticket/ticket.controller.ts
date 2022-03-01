import { CurrentTenant, CurrentUser } from '@/common';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TenantEntity } from '../tenant';
import { UserEntity } from '../user';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketService } from './ticket.service';

@Controller('clients/:tenantId/tickets')
@UseGuards(AuthGuard('basic'))
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @Post()
  create(
    @CurrentTenant() tenant: TenantEntity,
    @CurrentUser() user: UserEntity,
    @Body() data: CreateTicketDto,
  ) {
    return this.ticketService.create(tenant.id, {
      ...data,
      requester_id: data.requester_id ?? user.id,
    });
  }
}
