import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentTenant, CurrentUser } from '@/common';
import { TenantEntity } from '@/modules/tenant';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UserEntity } from '.';

@Controller('clients/:tenantId/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard('basic'))
  async create(
    @CurrentTenant() tenant: TenantEntity,
    @CurrentUser() user: UserEntity,
    @Body() data: CreateUserDto,
  ) {
    if (data.role && !user.isAdmin()) {
      throw new ForbiddenException('Only admin users can set user role');
    }
    return this.userService.create(tenant.id, data);
  }

  @Post('who-am-i')
  @UseGuards(AuthGuard('basic'))
  async login(@CurrentUser() user: UserEntity) {
    return user;
  }
}
