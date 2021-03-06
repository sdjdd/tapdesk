import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import _ from 'lodash';

function omitNull(data: any) {
  if (typeof data === 'object') {
    if (Array.isArray(data)) {
      return data.map(omitNull);
    }
    return _.omitBy(data, _.isNull);
  }
}

@Injectable()
export class ExcludeNullInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map(omitNull));
  }
}
