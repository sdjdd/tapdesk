import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { TenantService } from '../tenant.service';

@Injectable()
export class FindTenantPipe implements PipeTransform {
  constructor(private tenantService: TenantService) {}

  async transform(value: number) {
    const tenant = await this.tenantService.findOne(value);
    if (!tenant) {
      throw new NotFoundException(`Client ${value} dose not exist`);
    }
    return tenant;
  }
}
