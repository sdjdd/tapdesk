import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantEntity, TenantService } from '@/modules/tenant';

declare module 'express' {
  interface Request {
    tenant: TenantEntity;
  }
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private tenantService: TenantService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.params.tenantId) {
      throw new Error('No tenantId param, check your route path');
    }
    const tenantId = parseInt(req.params.tenantId);
    if (Number.isNaN(tenantId)) {
      throw new BadRequestException('Invalid tenant id');
    }

    const tenant = await this.tenantService.findOne(tenantId);
    if (!tenant) {
      throw new NotFoundException(`Client ${tenantId} does not exist`);
    }

    req.tenant = tenant;
    next();
  }
}
