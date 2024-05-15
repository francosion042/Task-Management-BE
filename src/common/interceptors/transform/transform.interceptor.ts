import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private readonly keyToRemove: string) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(context);
    return next.handle().pipe(
      map((data) => {
        if (data && typeof data === 'object') {
          return this.removeKey(data, this.keyToRemove);
        } else {
          return data;
        }
      }),
    );
  }

  private removeKey(obj: any, keyToRemove: string): any {
    if (Array.isArray(obj)) {
      // If it's an array, iterate over each element
      return obj.map((item) => this.removeKey(item, keyToRemove));
    } else if (typeof obj === 'object' && obj !== null) {
      // If it's an object, recursively call the function for each property
      return Object.entries(obj).reduce((acc, [key, value]) => {
        if (key === keyToRemove) {
          // If the key matches the one to remove, exclude it
          return acc;
        } else {
          // Otherwise, keep the key and its value
          return {
            ...acc,
            [key]: this.removeKey(value, keyToRemove),
          };
        }
      }, {});
    } else {
      // Base case: If it's neither an object nor an array, return the value unchanged
      return obj;
    }
  }
}
