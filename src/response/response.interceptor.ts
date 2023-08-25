import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Source } from 'src/models';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(
        ({
          message,
          translation,
          source,
        }: {
          message: string;
          translation: string;
          source: Source;
        }) => {
          if (source === 'earth') {
            return {
              'Response from Earth': message,
              'Nokia Translation': translation,
            };
          } else {
            return {
              'Response from Mars': message,
              'Nokia Translation': translation,
            };
          }
        },
      ),
    );
  }
}

