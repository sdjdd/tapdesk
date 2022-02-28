import { Body, Controller, Post, UseGuards } from '@nestjs/common';
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
  create(
    @CurrentTenant() tenant: TenantEntity,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.userService.create(tenant.id, createUserDto);
  }

  @Post('who-am-i')
  @UseGuards(AuthGuard('basic'))
  async login(@CurrentUser() user: UserEntity) {
    return user;
  }
}
