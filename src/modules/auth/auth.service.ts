import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(tenantId: number, username: string, password: string) {
    const user = await this.userService.findOneByUsernameAndSelectPassword(
      tenantId,
      username,
    );
    if (user && (await user.comparePassword(password))) {
      delete user.password;
      return user;
    }
  }
}
