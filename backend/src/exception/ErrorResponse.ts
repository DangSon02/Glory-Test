import { ResponseData } from './ResponseData';

export class ErrorResponse<T> extends ResponseData<T> {
  constructor(status: number, message: string) {
    super(status, message);
  }
}
