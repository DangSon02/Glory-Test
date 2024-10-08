export class ResponseData<T> {
  readonly status: number;
  readonly message: string;
  readonly data?: T;

  constructor(status: number, message: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
