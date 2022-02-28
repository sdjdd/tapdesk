import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CurrentTenant } from '@/common';
import { TenantEntity } from '@/modules/tenant';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('clients/:tenantId/users')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(
    @CurrentTenant() tenant: TenantEntity,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.create(tenant.id, createUserDto);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Req() req: Request) {
    return req.user;
  }
}
