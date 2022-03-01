import { PassportStrategy } from '@nestjs/passport';
import { BasicStrategy } from 'passport-http';
import { UserService } from '@/modules/user';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class HttpBasicStrategy extends PassportStrategy(BasicStrategy) {
  constructor(private userService: UserService) {
    super({ passReqToCallback: true });
  }

  async validate(req: Request, username: string, password: string) {
    const user = await this.userService.findOneByUsernameAndSelectPassword(
      req.tenant.id,
      username,
    );
    if (user && (await user.comparePassword(password))) {
      delete user.password;
      req.user = user;
      return user;
    }
  }
}
